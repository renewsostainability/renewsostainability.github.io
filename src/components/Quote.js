// components/Quote.js
export const generateHTMLQuote = (
  userData,
  suggestedServices,
  allFieldsTrue
) => {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const quoteNumber = `EEQ-${Date.now().toString().slice(-8)}`;
  const formattedPrice = (price) =>
    price
      ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price)
      : '-';

    let total = 0;

    suggestedServices.forEach(service => {
      const price = service.price;
      if (price) {
        total += Number(price); // ensure numeric addition
      }
    });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Estimated Cost Quote</title>

  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #f4f6f8;
      margin: 0;
      padding: 40px 0;
      color: #1f2937;
    }

    .quote-container {
      max-width: 1000px;
      margin: 0 auto;
      background: #ffffff;
      padding: 0;
      border-radius: 10px;
      box-shadow: 0 10px 28px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    /* ================= LETTERHEAD ================= */
    .letterhead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 40px;
      border-bottom: 4px solid #10b981;
      background: #ffffff;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .logo {
      width: 70px;
      height: 70px;
      border: 2px solid #10b981;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #065f46;
      font-size: 0.9rem;
    }

    .brand-text h1 {
      font-size: 1.9rem;
      margin: 0;
      color: #065f46;
      font-weight: 600;
    }

    .brand-text p {
      margin: 2px 0 0;
      font-size: 0.9rem;
      color: #6b7280;
    }

    .company-meta {
      text-align: right;
      font-size: 0.85rem;
      color: #374151;
      line-height: 1.5;
    }

    /* ================= CONTENT ================= */
    .content {
      padding: 40px;
    }

    .quote-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 35px;
      font-size: 0.95rem;
    }

    .quote-meta strong {
      color: #065f46;
    }

    /* Client Info */
    .client-info {
      background: #f9fafb;
      border-left: 4px solid #10b981;
      padding: 20px 25px;
      border-radius: 6px;
      margin-bottom: 40px;
    }

    .client-grid td {
      padding: 6px 0;
      font-size: 0.95rem;
    }

    /* ================= TABLE ================= */
    table.services-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 25px;
      font-size: 0.95rem;
    }

    .services-table thead {
      background: #064e3b;
      color: #ffffff;
    }

    .services-table th {
      padding: 14px 12px;
      text-align: left;
      font-weight: 600;
    }

    .services-table th:last-child,
    .services-table td:last-child {
      text-align: center;
    }

    .services-table tbody tr {
      border-bottom: 1px solid #e5e7eb;
    }

    .services-table tbody tr:nth-child(even) {
      background: #f9fafb;
    }

    .services-table td {
      padding: 14px 12px;
      vertical-align: top;
    }

    .services-table td:first-child {
      text-align: center;
      font-weight: 600;
      color: #047857;
    }

    .service-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .service-category {
      font-size: 0.8rem;
      color: #6b7280;
    }

    .price {
      font-weight: 700;
      color: #065f46;
      white-space: nowrap;
    }

    tfoot td {
      padding: 16px 12px;
      background: #ecfdf5;
      font-size: 1rem;
      border-top: 2px solid #10b981;
    }

    /* ================= FOOTER ================= */
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
      .quote-container {
        box-shadow: none;
        border-radius: 0;
      }
    }
  </style>
</head>

<body>
  <div class="quote-container">

    <!-- Letterhead -->
    <div class="letterhead">
      <div class="brand">
        <div class="logo">LOGO</div>
        <div class="brand-text">
          <h1>Energy Efficiency Ltd</h1>
          <p>Residential & Commercial Energy Solutions</p>
        </div>
      </div>

      <div class="company-meta">
        Company No: 12345678<br />
        VAT No: GB123456789<br />
        Registered in England & Wales
      </div>
    </div>

    <div class="content">

      <div class="quote-meta">
        <div>
          <strong>Quote Reference:</strong> ${quoteNumber}<br />
          <strong>Quote Date:</strong> ${today}
        </div>
        <div>
          <strong>Status:</strong>
          ${allFieldsTrue ? 'Information Complete' : 'Pending Information'}
        </div>
      </div>

      <div class="client-info">
        <table class="client-grid">
          <tr>
            <td><strong>Client Name:</strong></td>
            <td>${userData.name || 'Valued Customer'}</td>
          </tr>
          <tr>
            <td><strong>Email Address:</strong></td>
            <td>${userData.email || 'Not provided'}</td>
          </tr>
        </table>
      </div>

      <h2>Estimated Cost Breakdown</h2>

      <table class="services-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Service</th>
            <th>Description</th>
            <th>Estimated Cost</th>
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
              <td class="price">${formattedPrice(service.price) || 'Contact for quote'}</td>
            </tr>
          `).join('')}
        </tbody>

        <tfoot>
          <tr>
            <td colspan="3" align="right">
              <strong>Total Estimated Investment</strong>
            </td>
            <td class="price">
              ${formattedPrice(total) || 'Contact for quote'}
            </td>
          </tr>
        </tfoot>
      </table>

      <div class="footer">
        This estimate is valid for 60 days and is subject to site survey and final specification.<br />
        Generated on ${new Date().toLocaleString('en-GB')}
      </div>

    </div>
  </div>
</body>
</html>
`;
};
