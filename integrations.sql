CREATE TABLE IF NOT EXISTS integrations (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  enabled TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO integrations (id, name, description, enabled) VALUES
('supabase', 'Supabase', 'Database and authentication', 1),
('sendgrid', 'SendGrid', 'Email notifications and templates', 1),
('twilio', 'Twilio', 'SMS notifications and alerts', 1),
('docusign', 'DocuSign', 'Digital signature management', 1),
('axxess', 'Axxess', 'EMR & Home Health Software', 0),
('availity', 'Availity', 'Real-time Eligibility & Claims Portal', 0),
('extendedcare', 'ExtendedCare', 'Eligibility, Prior Auth & Billing', 0)
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description);
