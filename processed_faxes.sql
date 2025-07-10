CREATE TABLE IF NOT EXISTS processed_faxes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fax_id VARCHAR(255) NOT NULL,
  from_number VARCHAR(50),
  to_number VARCHAR(50),
  status VARCHAR(50),
  pages INT,
  received_at DATETIME,
  ocr_text TEXT,
  classification VARCHAR(100),
  action VARCHAR(100)
);

-- Sample queries to manage fax records

-- Insert a new processed fax record
INSERT INTO processed_faxes (
  fax_id,
  from_number,
  to_number,
  status,
  pages,
  received_at,
  ocr_text,
  classification,
  action
) VALUES (
  'FAX001',
  '+15551234567',
  '+15557654321',
  'received',
  3,
  NOW(),
  'Sample OCR text',
  'referral',
  'route_to_department'
);

-- Retrieve all fax records
SELECT * FROM processed_faxes ORDER BY received_at DESC;

-- Fetch a single fax by its fax_id
SELECT * FROM processed_faxes WHERE fax_id = 'FAX001';

-- Update classification and routing action for a fax
UPDATE processed_faxes
SET classification = 'compliance',
    action = 'notify_staff'
WHERE fax_id = 'FAX001';

-- Delete a fax record
DELETE FROM processed_faxes WHERE fax_id = 'FAX001';
