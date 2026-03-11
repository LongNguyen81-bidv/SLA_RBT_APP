/**
 * Migration: Add created_by to loans + loan_documents table
 */
const db = require('./config/db');

async function migrate() {
    try {
        console.log('Running migration: add created_by + loan_documents...');

        // 1. Add created_by column to loans (if not exists)
        const [cols] = await db.query(`
            SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'loans' AND COLUMN_NAME = 'created_by'
        `);
        if (cols.length === 0) {
            await db.query('ALTER TABLE loans ADD COLUMN created_by VARCHAR(50) DEFAULT NULL');
            console.log('  ✅ Added created_by column to loans');
        } else {
            console.log('  ⏭️  created_by column already exists');
        }

        // 2. Create loan_documents table
        await db.query(`
            CREATE TABLE IF NOT EXISTS loan_documents (
                id INT AUTO_INCREMENT PRIMARY KEY,
                loan_id VARCHAR(50) NOT NULL,
                file_name VARCHAR(255) NOT NULL,
                file_path VARCHAR(500) NOT NULL,
                file_size INT DEFAULT 0,
                uploaded_at BIGINT NOT NULL,
                uploaded_by VARCHAR(50),
                CONSTRAINT fk_doc_loan FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE
            )
        `);
        console.log('  ✅ loan_documents table ready');

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err.message);
        process.exit(1);
    }
}

migrate();
