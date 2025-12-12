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

    table.criteria {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }

    table.criteria th {
      background: #064e3b;
      color: #fff;
      padding: 12px;
      text-align: left;
    }

    table.criteria td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    .pass {
      color: #065f46;
      font-weight: 600;
    }

    .fail {
      color: #b91c1c;
      font-weight: 600;
    }

    .reason {
      margin-top: 30px;
      padding: 20px;
      background: #fff7ed;
      border-left: 4px solid #f59e0b;
      border-radius: 6px;
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
        <h1>Energy Efficiency Ltd</h1>
        <p>Eligibility & Assessment Services</p>
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
            <th>Criterion</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            ${Object.entries(dataVerified).map(([key, value]) => {
                const config = verificationConfig[key];

                return `
                <tr>
                    <td>
                    <strong>${config?.title || key}</strong><br />
                    <span style="color:#4b5563; font-size:0.9rem;">
                        ${value
                        ? config?.description?.true
                        : config?.description?.false}
                    </span>
                    </td>

                    <td class="status-cell ${value ? 'pass' : 'fail'}" align="center">
                    <span 
                        class="status-icon" 
                        title="${value ? 'Met' : 'Not Met'}"
                        aria-label="${value ? 'Met' : 'Not Met'}"
                    >
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

      <h2>Pathway to Eligibility</h2>
      <h5>Products and services that can help you pass the eligibility criteria:</h5>

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
              ${ service.url ? `<td class="price"><a href="${service.url}">Learn more</a></td>` : '' }
            </tr>
          `).join('')}
        </tbody>
      </table>

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
