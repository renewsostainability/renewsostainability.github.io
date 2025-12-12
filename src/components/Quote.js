// components/Quote.js
export const generateHTMLQuote = (userData, suggestedServices, totalEstimatedCost, allFieldsTrue) => {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const quoteNumber = `EEQ-${Date.now().toString().slice(-8)}`;
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Energy Efficiency Quote</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1000px;
            margin: 0 auto;
            background: #f9f9f9;
        }
        
        .quote-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 40px 50px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.8rem;
            font-weight: 300;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .content {
            padding: 50px;
        }
        
        .client-info {
            background: #f8fafc;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 40px;
            border-left: 4px solid #10b981;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }
        
        .info-item h3 {
            color: #64748b;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        
        .info-item p {
            color: #1e293b;
            font-size: 1.1rem;
            font-weight: 500;
        }
        
        .status-badge {
            display: inline-block;
            padding: 8px 20px;
            background: ${allFieldsTrue ? '#d1fae5' : '#fef3c7'};
            color: ${allFieldsTrue ? '#065f46' : '#92400e'};
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .section-title {
            color: #0f766e;
            font-size: 1.8rem;
            font-weight: 500;
            margin: 40px 0 25px 0;
            padding-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
        }
        
        /* Modern Table Styling */
        .services-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin: 30px 0;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .services-table thead {
            background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
        }
        
        .services-table th {
            color: white;
            font-weight: 600;
            text-align: left;
            padding: 18px 20px;
            font-size: 0.95rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .services-table th:first-child {
            width: 60px;
            text-align: center;
        }
        
        .services-table th:nth-child(2) {
            width: 30%;
        }
        
        .services-table th:nth-child(3) {
            width: 45%;
        }
        
        .services-table th:last-child {
            width: 15%;
        }
        
        .services-table tbody tr {
            transition: all 0.2s ease;
        }
        
        .services-table tbody tr:nth-child(even) {
            background: #f8fafc;
        }
        
        .services-table tbody tr:nth-child(odd) {
            background: white;
        }
        
        .services-table tbody tr:hover {
            background: #f0fdf4;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .services-table td {
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: top;
        }
        
        .services-table td:first-child {
            text-align: center;
            font-weight: 600;
            color: #0f766e;
            font-size: 1.1rem;
        }
        
        .service-title {
            color: #1e293b;
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 5px;
        }
        
        .service-description {
            color: #64748b;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        
        .service-price {
            color: #065f46;
            font-weight: 700;
            font-size: 1.1rem;
            background: #d1fae5;
            padding: 8px 15px;
            border-radius: 6px;
            display: inline-block;
            min-width: 120px;
            text-align: center;
        }
        
        .price-cell {
            text-align: center;
        }
        
        /* Total Summary */
        .total-summary {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 10px;
            padding: 30px;
            margin: 40px 0;
            border: 2px solid #0ea5e9;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .total-label {
            font-size: 1.2rem;
            color: #0369a1;
            font-weight: 500;
        }
        
        .total-amount {
            font-size: 2.2rem;
            color: #0c4a6e;
            font-weight: 700;
        }
        
        .savings-note {
            color: #64748b;
            font-style: italic;
            font-size: 0.95rem;
            text-align: center;
            margin-top: 10px;
        }
        
        /* Next Steps */
        .next-steps {
            background: #f8fafc;
            border-radius: 10px;
            padding: 30px;
            margin: 40px 0;
        }
        
        .steps-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }
        
        .step-item {
            background: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            text-align: center;
        }
        
        .step-number {
            display: inline-block;
            width: 36px;
            height: 36px;
            background: #10b981;
            color: white;
            border-radius: 50%;
            line-height: 36px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .step-title {
            color: #1e293b;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .step-description {
            color: #64748b;
            font-size: 0.9rem;
        }
        
        /* Contact Info */
        .contact-info {
            background: #0f766e;
            color: white;
            padding: 40px;
            border-radius: 10px;
            text-align: center;
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            margin-top: 25px;
        }
        
        .contact-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .contact-icon {
            font-size: 1.5rem;
            margin-bottom: 10px;
            opacity: 0.9;
        }
        
        .contact-text {
            font-size: 1.1rem;
            font-weight: 500;
        }
        
        .footer {
            text-align: center;
            color: #64748b;
            font-size: 0.9rem;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
        }
        
        @media print {
            body {
                background: white;
            }
            
            .quote-container {
                box-shadow: none;
                border-radius: 0;
            }
            
            .header {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .services-table {
                break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="quote-container">
        <div class="header">
            <h1>Energy Efficiency Quote</h1>
            <p>Personalized recommendations for ${userData.name || 'Valued Customer'}</p>
            <div style="margin-top: 20px;" class="status-badge">
                ${allFieldsTrue ? '🎯 Eligible for Support' : '💡 Recommended Upgrades'}
            </div>
        </div>
        
        <div class="content">
            <div class="client-info">
                <h2 style="color: #0f766e; margin-bottom: 15px;">Client Information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <h3>Client Name</h3>
                        <p>${userData.name || 'Valued Customer'}</p>
                    </div>
                    <div class="info-item">
                        <h3>Quote Date</h3>
                        <p>${today}</p>
                    </div>
                    <div class="info-item">
                        <h3>Quote Reference</h3>
                        <p>${quoteNumber}</p>
                    </div>
                    <div class="info-item">
                        <h3>Email Address</h3>
                        <p>${userData.email || 'Not provided'}</p>
                    </div>
                </div>
            </div>
            
            <h2 class="section-title">Recommended Solutions</h2>
            
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
                            ${service.category ? `<div style="color: #64748b; font-size: 0.85rem; margin-top: 5px;">${service.category}</div>` : ''}
                        </td>
                        <td>
                            <div class="service-description">
                                ${service.description}
                            </div>
                        </td>
                        <td class="price-cell">
                            <div class="service-price">${service.price || 'Contact for quote'}</div>
                        </td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="total-summary">
                <div class="total-row">
                    <div class="total-label">Total Estimated Investment</div>
                    <div class="total-amount">${totalEstimatedCost || 'Contact for quote'}</div>
                </div>
                <p class="savings-note">
                    *Estimated annual energy savings: £250 - £1,200 • Payback period: 3-8 years
                </p>
            </div>
            
            <h2 class="section-title">Next Steps</h2>
            <div class="next-steps">
                <div class="steps-grid">
                    <div class="step-item">
                        <div class="step-number">1</div>
                        <div class="step-title">Review Quote</div>
                        <div class="step-description">Go through each recommendation with our specialist</div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">2</div>
                        <div class="step-title">Home Assessment</div>
                        <div class="step-description">Schedule a free on-site energy assessment</div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-title">Grants & Financing</div>
                        <div class="step-description">Apply for available funding options</div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">4</div>
                        <div class="step-title">Installation</div>
                        <div class="step-description">Work with certified installers</div>
                    </div>
                </div>
            </div>
            
            <h2 class="section-title">Contact Information</h2>
            <div class="contact-info">
                <div class="contact-grid">
                    <div class="contact-item">
                        <div class="contact-icon">📞</div>
                        <div class="contact-text">0800 123 4567</div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">📧</div>
                        <div class="contact-text">info@energyefficiency.co.uk</div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">🌐</div>
                        <div class="contact-text">www.energyefficiency.co.uk</div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">📍</div>
                        <div class="contact-text">123 Green Street, London</div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>This quote is valid for 60 days from the date of issue. Prices are estimates and may vary based on final assessment.</p>
                <p style="margin-top: 10px;">Generated on ${new Date().toLocaleString('en-GB')}</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};