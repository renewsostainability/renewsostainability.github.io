from flask import Flask, request, jsonify, render_template, send_from_directory, send_file
from flask_cors import CORS
from openai import OpenAI
import faiss
import numpy as np
import os
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from dotenv import load_dotenv
from datetime import datetime
from werkzeug.utils import secure_filename
import uuid

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)  # Add this right after imports, before folder definitions

# -------------------- LOAD ENVIRONMENT VARIABLES --------------------
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")

client = OpenAI(api_key=api_key)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
RESULTS_FOLDER = "results"
ALLOWED_EXTENSIONS = {"pdf"}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 32 * 1024 * 1024  # 32MB max

# -------------------- HELPERS --------------------
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def chunk_text(text, chunk_size=500, overlap=100):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks


def get_documents_meta():
    meta_file = os.path.join(UPLOAD_FOLDER, "meta.json")
    if os.path.exists(meta_file):
        with open(meta_file, "r") as f:
            return json.load(f)
    return []


def save_documents_meta(docs):
    meta_file = os.path.join(UPLOAD_FOLDER, "meta.json")
    with open(meta_file, "w") as f:
        json.dump(docs, f, indent=2)


def extract_pdf_text(file_path):
    import pdfplumber
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                text += t + "\n"
    return text


def generate_html_report(text, user_data):
    chunked_docs = chunk_text(text)
    if not chunked_docs:
        return None, "No content to process"

    embedding_response = client.embeddings.create(
        model="text-embedding-3-small",
        input=chunked_docs
    )
    embeddings = [item.embedding for item in embedding_response.data]
    dim = len(embeddings[0])
    index = faiss.IndexFlatL2(dim)
    index.add(np.array(embeddings).astype("float32"))

    query = "Extract only Product/Service items from the products and services document"
    query_embedding = client.embeddings.create(
        model="text-embedding-3-small",
        input=query
    ).data[0].embedding
    D, I = index.search(np.array([query_embedding]).astype("float32"), k=min(3, len(chunked_docs)))
    retrieved_chunks = [chunked_docs[i] for i in I[0]]
    context = "\n\n".join(retrieved_chunks)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant. Extract Product/Service items and return as HTML table rows only, no markdown."},
            {"role": "user", "content": f"Context:\n{context}\n\nInstruction: Only extract Product/Service items with optional category and URL in HTML <tr> rows format for a table with columns: #, Service, Category, Link."}
        ]
    )
    html_rows = response.choices[0].message.content

    suggested_services = [
        {"title": "Install photovoltaic panels", "category": "Renewable Energy", "description": "Generate your own electricity and reduce bills.", "url": "#"},
        {"title": "Insulation upgrade", "category": "Home Efficiency", "description": "Keep heat in and save energy.", "url": "#"}
    ]
    services_rows = "".join(f"""
    <tr>
      <td>{i+1}</td>
      <td>
        <div class="service-title">{s['title']}</div>
        {f"<div class='service-category'>{s['category']}</div>" if s.get('category') else ''}
      </td>
      <td>{s['description']}</td>
      <td>{f"<a href='{s['url']}' target='_blank'>Learn more</a>" if s.get('url') else ''}</td>
    </tr>""" for i, s in enumerate(suggested_services))

    html = f"""<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>Assessment Report</title>
        <style>
        body {{ font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f8; margin: 0; padding: 40px 0; color: #1f2937; }}
        .document {{ max-width: 960px; margin: 0 auto; background: #fff; box-shadow: 0 10px 28px rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden; }}
        .letterhead {{ display: flex; justify-content: space-between; align-items: center; padding: 30px 40px; border-bottom: 4px solid #10b981; background: #064e3b; }}
        .brand h1 {{ margin: 0; font-size: 1.8rem; color: #fff; }} .brand p {{ margin: 4px 0 0; font-size: 0.85rem; color: #6ee7b7; }}
        .meta {{ text-align: right; font-size: 0.85rem; color: #a7f3d0; line-height: 1.6; }}
        .content {{ padding: 40px; }}
        .status-box {{ padding: 25px; border-radius: 8px; margin-bottom: 30px; border-left: 6px solid #10b981; background: #ecfdf5; }}
        .status-title {{ font-size: 1.5rem; font-weight: 700; color: #065f46; margin-bottom: 6px; }}
        .status-sub {{ color: #374151; font-size: 0.95rem; }}
        .client-info table {{ width: 100%; border-collapse: collapse; margin-bottom: 30px; }}
        .client-info td {{ padding: 7px 0; font-size: 0.95rem; border-bottom: 1px solid #f3f4f6; }}
        h2 {{ margin: 35px 0 15px; font-size: 1.3rem; color: #065f46; border-bottom: 2px solid #d1fae5; padding-bottom: 8px; }}
        table.data-table {{ width: 100%; border-collapse: collapse; font-size: 0.93rem; margin-bottom: 25px; }}
        table.data-table th {{ background: #064e3b; color: #fff; padding: 12px 14px; text-align: left; }}
        table.data-table td {{ padding: 11px 14px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }}
        table.data-table tr:hover {{ background: #f9fafb; }}
        .service-title {{ font-weight: 600; }} .service-category {{ font-size: 0.82rem; color: #6b7280; margin-top: 2px; }}
        a {{ color: #10b981; text-decoration: none; }} a:hover {{ text-decoration: underline; }}
        .plan-step {{ display: flex; gap: 20px; padding: 18px 20px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px; }}
        .plan-step-number {{ width: 38px; height: 38px; border-radius: 50%; background: #065f46; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; flex-shrink: 0; }}
        .plan-step h3 {{ margin: 0 0 6px; font-size: 1.05rem; }} .plan-step p {{ margin: 0; color: #4b5563; font-size: 0.92rem; }}
        .footer {{ margin-top: 40px; padding: 20px 40px; background: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 0.82rem; color: #9ca3af; text-align: center; }}
        </style>
        </head>
        <body>
        <div class="document">
        <div class="letterhead">
            <div class="brand"><h1>Renew</h1><p>Energy Efficiency Assessment Platform</p></div>
            <div class="meta">Generated: {datetime.now().strftime('%d %b %Y, %H:%M')}<br/>Ref: RS-{datetime.now().strftime('%Y%m%d%H%M%S')}</div>
        </div>
        <div class="content">
            <div class="status-box">
            <div class="status-title">✅ Assessment Complete</div>
            <div class="status-sub">Products and services have been extracted from your document successfully.</div>
            </div>
            <div class="client-info">
            <table>
                <tr><td><strong>Applicant:</strong></td><td>{user_data.get('name', 'Customer')}</td></tr>
                <tr><td><strong>Email:</strong></td><td>{user_data.get('email', 'Not provided')}</td></tr>
                <tr><td><strong>Date:</strong></td><td>{datetime.now().strftime('%d %B %Y')}</td></tr>
            </table>
            </div>
            <h2>Extracted Products &amp; Services</h2>
            <table class="data-table">
            <thead><tr><th>#</th><th>Service</th><th>Category</th><th>Link</th></tr></thead>
            <tbody>{html_rows}</tbody>
            </table>
            <h2>Recommended Services</h2>
            <table class="data-table">
            <thead><tr><th>#</th><th>Service</th><th>Description</th><th>Action</th></tr></thead>
            <tbody>{services_rows}</tbody>
            </table>
            <h2>Recommended Action Plan</h2>
            <div class="plan-step"><div class="plan-step-number">1</div><div><h3>Initial Assessment</h3><p>Schedule a comprehensive energy assessment to identify the most impactful improvements.</p></div></div>
            <div class="plan-step"><div class="plan-step-number">2</div><div><h3>Implementation Strategy</h3><p>Work with certified installers to implement cost-effective energy efficiency measures.</p></div></div>
            <div class="plan-step"><div class="plan-step-number">3</div><div><h3>Reassessment &amp; Application</h3><p>Once improvements are complete, obtain a new EPC certificate and reapply for support.</p></div></div>
        </div>
        <div class="footer">This assessment is based on information provided and may be subject to verification. &copy; {datetime.now().year} Renew Sustainability.</div>
        </div>
        </body>
        </html>
    """
    return html, None


def send_email(to_email, to_name, html_content):
    if not SMTP_USER or not SMTP_PASS:
        return False, "Email credentials not configured in .env"
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "Your Renew Sustainability Assessment Report"
        msg["From"] = f"Renew Assessment <{SMTP_USER}>"
        msg["To"] = to_email

        # Plain text fallback (important for email clients)
        body_text = f"""Dear {to_name},

        Your sustainability assessment report is ready.

        If you cannot view this email properly, please contact support.

        Best regards,
        Renew Team
        """

        # 👇 THIS is the key change
        body_html = html_content

        msg.attach(MIMEText(body_text, "plain"))
        msg.attach(MIMEText(body_html, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to_email, msg.as_string())

        return True, "Email sent successfully"
    except Exception as e:
        return False, str(e)

# -------------------- ROUTES --------------------
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/documents", methods=["GET"])
def list_documents():
    docs = get_documents_meta()
    return jsonify({"documents": docs})


@app.route("/api/documents/upload", methods=["POST"])
def upload_document():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400
    if not allowed_file(file.filename):
        return jsonify({"error": "Only PDF files are accepted"}), 400

    filename = secure_filename(file.filename)
    file_id = str(uuid.uuid4())
    stored_name = f"{file_id}.pdf"
    file_path = os.path.join(UPLOAD_FOLDER, stored_name)
    file.save(file_path)

    size = os.path.getsize(file_path)
    docs = get_documents_meta()
    doc_entry = {
        "id": file_id,
        "original_name": filename,
        "stored_name": stored_name,
        "size": size,
        "uploaded_at": datetime.now().isoformat(),
        "ext": "pdf"
    }
    docs.append(doc_entry)
    save_documents_meta(docs)

    return jsonify({"message": "Uploaded successfully", "document": doc_entry})


@app.route("/api/documents/<doc_id>", methods=["DELETE"])
def delete_document(doc_id):
    docs = get_documents_meta()
    doc = next((d for d in docs if d["id"] == doc_id), None)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    file_path = os.path.join(UPLOAD_FOLDER, doc["stored_name"])
    if os.path.exists(file_path):
        os.remove(file_path)

    docs = [d for d in docs if d["id"] != doc_id]
    save_documents_meta(docs)
    return jsonify({"message": "Deleted successfully"})


@app.route("/api/documents/<doc_id>/preview-pdf")
def preview_pdf(doc_id):
    """Serve the PDF directly for in-browser viewing."""
    docs = get_documents_meta()
    doc = next((d for d in docs if d["id"] == doc_id), None)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    file_path = os.path.join(UPLOAD_FOLDER, doc["stored_name"])
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found on disk"}), 404

    return send_file(
        file_path,
        mimetype="application/pdf",
        as_attachment=False,
        download_name=doc["original_name"]
    )


@app.route("/api/process", methods=["POST"])
def process_and_email():
    data = request.json
    doc_id = data.get("document_id")
    user_name = data.get("name", "Customer")
    user_email = data.get("email")

    if not doc_id or not user_email:
        return jsonify({"error": "document_id and email are required"}), 400

    docs = get_documents_meta()
    doc = next((d for d in docs if d["id"] == doc_id), None)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    file_path = os.path.join(UPLOAD_FOLDER, doc["stored_name"])
    try:
        text = extract_pdf_text(file_path)
        if not text.strip():
            return jsonify({"error": "Could not extract text from PDF. It may be scanned or image-based."}), 400

        html_report, err = generate_html_report(text, {"name": user_name, "email": user_email})
        if err:
            return jsonify({"error": err}), 500

        report_file = f"report_{datetime.now().strftime('%Y%m%d%H%M%S')}.html"
        report_path = os.path.join(RESULTS_FOLDER, report_file)
        with open(report_path, "w", encoding="utf-8") as f:
            f.write(html_report)

        sent, msg = send_email(user_email, user_name, html_report)

        return jsonify({
            "success": True,
            "email_sent": sent,
            "message": msg,
            "report_file": report_file,
            "preview_url": f"/results/{report_file}"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/results/<filename>")
def serve_result(filename):
    return send_from_directory(RESULTS_FOLDER, filename)


if __name__ == "__main__":
    app.run(debug=True, port=5000)