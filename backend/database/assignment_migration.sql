USE citizenvoice;

ALTER TABLE reports ADD COLUMN IF NOT EXISTS assigned_admin_id INT DEFAULT NULL;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS assigned_department VARCHAR(100) DEFAULT NULL;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS priority ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium';

CREATE INDEX IF NOT EXISTS idx_reports_assigned_admin ON reports(assigned_admin_id);
CREATE INDEX IF NOT EXISTS idx_reports_priority ON reports(priority);

-- If your MySQL version does not support IF NOT EXISTS for constraints,
-- run this once manually and ignore the duplicate-constraint error on later runs.
ALTER TABLE reports
  ADD CONSTRAINT fk_reports_assigned_admin
    FOREIGN KEY (assigned_admin_id) REFERENCES users(id) ON DELETE SET NULL;
