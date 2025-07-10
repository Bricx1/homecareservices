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
