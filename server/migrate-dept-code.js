const db = require('./config/db');

async function migrate() {
    try { // Add dept_code column if not exists
        await db.query(`
            ALTER TABLE users ADD COLUMN IF NOT EXISTS dept_code VARCHAR(20) DEFAULT NULL AFTER dept
        `).catch(() => { // MySQL < 8.0.19 doesn't support IF NOT EXISTS for columns, try alternative
            return db.query(`ALTER TABLE users ADD COLUMN dept_code VARCHAR(20) DEFAULT NULL AFTER dept`).catch(() => {
                console.log('Column dept_code already exists, skipping ALTER TABLE');
            });
        });

        // Update existing users with dept_code
        const updates = [
            [
                'PB00', '1'
            ],
            [
                'PB01', '2'
            ],
            [
                'PB02', '3'
            ],
            [
                'PB03', '4'
            ],
            [
                'PB04', '5'
            ],
            [
                'PB05', '6'
            ],
        ];

        for (const [code, id] of updates) {
            await db.query('UPDATE users SET dept_code = ? WHERE id = ? AND (dept_code IS NULL OR dept_code = "")', [code, id]);
        }

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err.message);
        process.exit(1);
    }
}

migrate();
