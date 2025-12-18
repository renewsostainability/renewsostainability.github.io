// components/EligibilityResult.js
export const generateHTMLEligibilityResult = ({
  userData,
  verificationConfig,
  suggestedServices,
  dataVerified,
  allFieldsTrue,
  primaryReason
}) => {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const reference = `ELG-${Date.now().toString().slice(-8)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Eligibility Assessment Result</title>

  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #f4f6f8;
      margin: 0;
      padding: 40px 0;
      color: #1f2937;
    }

    .document {
      max-width: 1000px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 0 10px 28px rgba(0,0,0,0.1);
      border-radius: 10px;
      overflow: hidden;
    }

    /* Letterhead */
    .letterhead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 40px;
      border-bottom: 4px solid #10b981;
    }

    .brand h1 {
      margin: 0;
      font-size: 1.9rem;
      color: #065f46;
    }

    .brand p {
      margin: 4px 0 0;
      font-size: 0.9rem;
      color: #6b7280;
    }

    .meta {
      text-align: right;
      font-size: 0.85rem;
      color: #374151;
      line-height: 1.5;
    }

    .content {
      padding: 40px;
    }

    .status-box {
      padding: 25px;
      border-radius: 8px;
      margin-bottom: 35px;
      border-left: 6px solid;
    }

    .status-box.eligible {
      background: #ecfdf5;
      border-color: #10b981;
    }

    .status-box.ineligible {
      background: #fef2f2;
      border-color: #ef4444;
    }

    table.criteria td:first-child {
      text-align: left;
      font-weight: 600;
      color: #047857;
    }

    .status-title {
      font-size: 1.6rem;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .status-sub {
      font-size: 1rem;
      color: #374151;
    }

    .client-info {
      margin-bottom: 30px;
    }

    .client-info table {
      width: 100%;
      border-collapse: collapse;
    }

    .client-info td {
      padding: 6px 0;
      font-size: 0.95rem;
    }

    h2 {
      margin-top: 40px;
      margin-bottom: 20px;
      font-size: 1.4rem;
      color: #065f46;
    }

    table.criteria, table.services-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
      margin-bottom: 30px;
    }

    table.criteria th, table.services-table th {
      background: #064e3b;
      color: #fff;
      padding: 12px;
      text-align: left;
    }

    table.criteria td, table.services-table td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
      vertical-align: top;
      text-align: left;
    }

    .pass {
      color: #065f46;
      font-weight: 600;
    }

    .fail {
      color: #b91c1c;
      font-weight: 600;
    }

    .status-icon {
      font-size: 1.4rem;
    }

    .reason {
      margin-top: 30px;
      padding: 20px;
      background: #fff7ed;
      border-left: 4px solid #f59e0b;
      border-radius: 6px;
    }

    .service-title {
      font-weight: 600;
    }

    .service-category {
      font-size: 0.85rem;
      color: #6b7280;
    }

    .price a {
      color: #10b981;
      text-decoration: none;
    }

    /* Action Plan */
    .action-plan {
      margin-top: 40px;
    }

    .plan-step {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      padding: 20px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .plan-step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #065f46;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .plan-step h3 {
      margin: 0 0 8px 0;
      font-size: 1.2rem;
    }

    .plan-step p {
      margin: 0 0 8px 0;
      color: #374151;
    }

    .plan-step button {
      padding: 6px 12px;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    /* Professional Support */
    .professional-support {
      margin-top: 40px;
      padding: 20px;
      background: linear-gradient(135deg, #e6f4ea 0%, #d1fae5 100%);
      border-radius: 8px;
      text-align: center;
    }

    .professional-support h3 {
      margin-top: 0;
      margin-bottom: 12px;
      font-size: 1.5rem;
      color: #065f46;
    }

    .professional-support p {
      margin: 0 0 20px 0;
      color: #374151;
    }

    .professional-support .support-buttons button {
      padding: 10px 20px;
      margin: 5px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-size: 0.95rem;
    }

    .btn-consultation {
      background: #10b981;
      color: white;
    }

    .btn-installers {
      background: #065f46;
      color: white;
    }

    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      font-size: 0.85rem;
      color: #6b7280;
      text-align: center;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }
      .document {
        box-shadow: none;
        border-radius: 0;
      }
    }
  </style>
</head>

<body>
  <div class="document">

    <!-- Letterhead -->
    <div class="letterhead">
      <div class="brand">
        <div class="logo">LOGO</div>
        <div class="brand-text">
          <h1>Energy Efficiency Ltd</h1>
          <p>Residential & Commercial Energy Solutions</p>
        </div>
      </div>
      <div class="meta">
        Reference: ${reference}<br />
        Date: ${today}
      </div>
    </div>

    <div class="content">

      <!-- Status -->
      <div class="status-box ${allFieldsTrue ? 'eligible' : 'ineligible'}">
        <div class="status-title">
          ${allFieldsTrue ? 'Eligibility Confirmed' : 'Eligibility Not Met'}
        </div>
        <div class="status-sub">
          ${allFieldsTrue
            ? 'You meet the criteria for energy efficiency support under this scheme.'
            : 'You do not currently meet the eligibility criteria for this scheme.'}
        </div>
      </div>

      <!-- Client -->
      <div class="client-info">
        <table>
          <tr>
            <td><strong>Applicant Name:</strong></td>
            <td>${userData.name || 'Customer'}</td>
          </tr>
          <tr>
            <td><strong>Email Address:</strong></td>
            <td>${userData.email || 'Not provided'}</td>
          </tr>
        </table>
      </div>

      <!-- Criteria -->
      <h2>Eligibility Criteria Assessment</h2>
      <table class="criteria">
        <thead>
          <tr>
            <th>#</th>
            <th>Criterion</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(dataVerified).map(([key, value], index) => {
            const config = verificationConfig[key];
            return `
              <tr>
                <td>${index + 1}</td>
                <td>
                  <strong>${config?.title || key}</strong><br />
                  <span style="color:#4b5563; font-size:0.9rem;">
                    ${value ? config?.description?.true : config?.description?.false}
                  </span>
                </td>
                <td class="${value ? 'pass' : 'fail'}" align="right">
                  <span class="status-icon" title="${value ? 'Met' : 'Not Met'}">
                    ${value ? '✔️' : '❌'}
                  </span>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      ${!allFieldsTrue ? `
        <div class="reason">
          <strong>Primary Reason:</strong><br />
          ${primaryReason}
        </div>
      ` : ''}

      <!-- Pathway -->
      <h2>Pathway to Eligibility</h2>
      <h5>Products and services that can help you pass the eligibility criteria:</h5>
      <table class="services-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Service</th>
            <th>Description</th>
            <th style="text-align: left;">Action</th>
          </tr>
        </thead>
        <tbody>
          ${suggestedServices.map((service, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>
                <div class="service-title">${service.title}</div>
                ${service.category ? `<div class="service-category">${service.category}</div>` : ''}
              </td>
              <td>${service.description}</td>
              <td class="price">
                ${ service.url ? `<a href="${service.url}" target="_blank">Learn more</a>` : '' }
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Action Plan -->
      <div class="action-plan">
        <h2>Recommended Action Plan</h2>

        <div class="plan-step">
          <div class="plan-step-number">1</div>
          <div>
            <h3>Initial Assessment</h3>
            <p>Schedule a comprehensive energy assessment to identify the most impactful improvements for your specific property.</p>
            <a href="#" style="color: #3b82f6;">Schedule Assessment</a>
          </div>
        </div>

        <div class="plan-step">
          <div class="plan-step-number">2</div>
          <div>
            <h3>Implementation Strategy</h3>
            <p>Work with certified installers to implement cost-effective energy efficiency measures that optimize your EPC rating.</p>
            <a href="#" style="color: #3b82f6;">Find Installers</a>
          </div>
        </div>

        <div class="plan-step">
          <div class="plan-step-number">3</div>
          <div>
            <h3>Reassessment & Application</h3>
            <p>Once improvements are complete, obtain a new EPC certificate and reapply for the energy support scheme.</p>
            <a href="#" style="color: #3b82f6;">Document Requirements</a>
          </div>
        </div>
      </div>

      <!-- Professional Support -->
      <div class="professional-support">
        <h3>Professional Guidance Available</h3>
        <p>Our energy specialists can provide personalized advice and connect you with certified professionals to help you achieve your energy efficiency goals.</p>
        <div class="support-buttons">
          <button class="btn-consultation">Schedule Consultation</button>
          <button class="btn-installers">Find Certified Installers</button>
        </div>
      </div>

      <div class="footer">
        This assessment is based on the information provided and may be subject to verification.<br />
        Generated on ${new Date().toLocaleString('en-GB')}
      </div>

    </div>
  </div>
</body>
</html>
`;
};
