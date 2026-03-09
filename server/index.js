const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Auth Endpoint
app.post('/api/auth/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        if (rows.length > 0) {
            res.json({user: rows[0]});
        } else {
            res.status(401).json({message: 'Sai tên đăng nhập hoặc mật khẩu'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// 2. Config Endpoint
app.get('/api/config', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM config');

        let businessHours = {};
        let holidays = [];

        rows.forEach(r => {
            if (r.config_key === 'business_hours') 
                businessHours = r.config_value;
            


            if (r.config_key === 'holidays') 
                holidays = r.config_value;
            


        });

        res.json({
            ... businessHours,
            holidays
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// 2.5 SLA Steps Config Endpoint
app.get('/api/sla-steps', async (req, res) => {
    try {
        const [steps] = await db.query('SELECT * FROM sla_steps ORDER BY id ASC');
        const formattedSteps = steps.map(s => ({
            id: s.id,
            name: s.name,
            slaHours: Number(s.sla_hours),
            owner: s.owner,
            code: s.code,
            internal: !!s.internal,
            system: s.system
        }));
        res.json(formattedSteps);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

// 3. Loans API
app.get('/api/loans', async (req, res) => {
    try {
        const [loans] = await db.query('SELECT * FROM loans');
        const [progress] = await db.query('SELECT * FROM loan_progress');
        const [steps] = await db.query('SELECT * FROM sla_steps');

        // Map DB names to Frontend expect names (camelCase)
        const formattedLoans = loans.map(l => ({
            id: l.id,
            customer: l.customer,
            branch: l.branch,
            type: l.type,
            amount: l.amount.toString(),
            startTime: Number(l.start_time),
            officer: l.officer,
            currentStepId: l.current_step_id,
            assignedDept: l.assigned_dept
        }));

        const formattedSteps = steps.map(s => ({
            id: s.id,
            name: s.name,
            slaHours: Number(s.sla_hours),
            owner: s.owner,
            code: s.code,
            internal: !!s.internal,
            system: s.system
        }));

        // Convert progress list into grouped 2D array: [ [{step1},{step2}], [{step1},{step2}] ]
        const allProgress = formattedLoans.map(loan => {
            const loanProg = progress.filter(p => p.loan_id === loan.id).map(p => ({
                stepId: p.step_id,
                completed: !!p.completed,
                actualHours: Number(p.actual_hours),
                startedAt: Number(p.started_at),
                completedAt: p.completed_at ? Number(p.completed_at) : undefined,
                executedBy: p.executed_by || undefined
            }));

            // Ensure progress array has exactly same length as SLA_STEPS (10 steps)
            return formattedSteps.map(step => {
                const existing = loanProg.find(p => p.stepId === step.id);
                if (existing) 
                    return existing;
                


                return {stepId: step.id, completed: false, actualHours: null, startedAt: null};
            });
        });

        res.json({loans: formattedLoans, allProgress: allProgress, steps: formattedSteps});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

// 3.5 Complete Step
app.post('/api/loans/:loanId/steps/:stepId', async (req, res) => {
    const {loanId, stepId} = req.params;
    const {actionType} = req.body;
    const stepIdInt = parseInt(stepId);

    try {
        if (actionType === 'FORWARD') {
            const now = Date.now();

            // Calculate actual hours from started_at
            const [progRows] = await db.query('SELECT started_at FROM loan_progress WHERE loan_id = ? AND step_id = ?', [loanId, stepIdInt]);
            const startedAt = progRows[0] ?. started_at ? Number(progRows[0].started_at) : now - 3600000;
            const actualHours = Math.round(((now - startedAt) / 3600000) * 100) / 100;

            await db.query('UPDATE loan_progress SET completed = true, completed_at = ?, actual_hours = ? WHERE loan_id = ? AND step_id = ?', [now, actualHours, loanId, stepIdInt]);

            // Get max step id dynamically
            const [maxStepRows] = await db.query('SELECT MAX(id) as maxId FROM sla_steps');
            const maxStepId = maxStepRows[0] ?. maxId || 10;

            const nextStepId = stepIdInt + 1;
            if (nextStepId <= maxStepId) {
                const [steps] = await db.query('SELECT owner FROM sla_steps WHERE id = ?', [nextStepId]);
                const nextOwner = steps[0] ?. owner || 'System';

                await db.query('UPDATE loans SET current_step_id = ?, assigned_dept = ? WHERE id = ?', [nextStepId, nextOwner, loanId]);

                // Insert new progress for next step
                await db.query('INSERT INTO loan_progress (loan_id, step_id, started_at, completed) VALUES (?, ?, ?, false) ON DUPLICATE KEY UPDATE started_at = ?, completed = false', [loanId, nextStepId, now, now]);
            } else { // Last step completed - mark loan as finished
                await db.query('UPDATE loans SET current_step_id = ?, assigned_dept = ? WHERE id = ?', [maxStepId, 'Hoàn thành', loanId]);
            }
        } else if (actionType === 'BACKWARD') {
            if (stepIdInt > 1) {
                const now = Date.now();
                const prevStepId = stepIdInt - 1;

                const [steps] = await db.query('SELECT owner FROM sla_steps WHERE id = ?', [prevStepId]);
                const prevOwner = steps[0] ?. owner || 'System';

                // Reset current step
                await db.query('UPDATE loan_progress SET started_at = NULL, completed = false, actual_hours = 0 WHERE loan_id = ? AND step_id = ?', [loanId, stepIdInt]);

                // Reset previous step for rework
                await db.query('UPDATE loan_progress SET completed = false, actual_hours = 0, completed_at = NULL, started_at = ? WHERE loan_id = ? AND step_id = ?', [now, loanId, prevStepId]);

                // Update loan to previous step
                await db.query('UPDATE loans SET current_step_id = ?, assigned_dept = ? WHERE id = ?', [prevStepId, prevOwner, loanId]);
            }
        }
        res.json({success: true});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

// 4. Mock Seed Route (For creating fresh sample data in Sprint 7 Testing)
app.post('/api/test/seed', async (req, res) => {
    try { // Xoá dữ liệu cũ
        await db.query('DELETE FROM loan_progress');
        await db.query('DELETE FROM loans');

        // Tạo 3 hồ sơ mẫu
        const now = Date.now();
        const loansData = [
            [
                'HS-DB-001',
                'Nguyễn Thị A',
                'CN Hà Nội',
                'Cho vay mua nhà',
                2500000000,
                now - 50000000,
                'Nguyễn Văn Quan Hệ',
                3,
                'Định giá TS'
            ],
            [
                'HS-DB-002',
                'Cty TNHH B',
                'CN HCM',
                'Cấp tín dụng DN',
                50000000000,
                now - 150000000,
                'Nguyễn Văn C',
                5,
                'Thẩm định'
            ],
            [
                'HS-DB-003',
                'Trần Văn C',
                'CN Đà Nẵng',
                'Vay tiêu dùng',
                50000000,
                now - 10000000,
                'Lê Thị D',
                1,
                'QHKH'
            ]
        ];

        for (const loan of loansData) {
            await db.query('INSERT INTO loans (id, customer, branch, type, amount, start_time, officer, current_step_id, assigned_dept) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', loan);
        }

        // Tạo progress cho HS-DB-001 (đã xong bước 1, 2, đang ở bước 3)
        await db.query('INSERT INTO loan_progress (loan_id, step_id, completed, actual_hours, started_at, completed_at, executed_by) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            'HS-DB-001',
            1,
            true,
            3.5,
            now - 50000000,
            now - 35000000,
            'Nguyễn Văn Quan Hệ'
        ]);
        await db.query('INSERT INTO loan_progress (loan_id, step_id, completed, actual_hours, started_at, completed_at, executed_by) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            'HS-DB-001',
            2,
            true,
            1.5,
            now - 35000000,
            now - 25000000,
            'Nguyễn Văn Quan Hệ'
        ]);
        await db.query('INSERT INTO loan_progress (loan_id, step_id, completed, actual_hours, started_at) VALUES (?, ?, ?, ?, ?)', [
            'HS-DB-001',
            3,
            false,
            0,
            now - 25000000
        ]);

        // Tạo progress cho HS-DB-002
        await db.query('INSERT INTO loan_progress (loan_id, step_id, completed, actual_hours, started_at, completed_at, executed_by) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            'HS-DB-002',
            1,
            true,
            4,
            now - 150000000,
            now - 130000000,
            'Nguyễn Văn C'
        ]);
        await db.query('INSERT INTO loan_progress (loan_id, step_id, completed, actual_hours, started_at, completed_at, executed_by) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            'HS-DB-002',
            2,
            true,
            2,
            now - 130000000,
            now - 110000000,
            'Nguyễn Văn C'
        ]);
        await db.query('INSERT INTO loan_progress (loan_id, step_id, completed, actual_hours, started_at, completed_at, executed_by) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            'HS-DB-002',
            3,
            true,
            10,
            now - 110000000,
            now - 5000000,
            'Lê Thị Định Giá'
        ]); // Vượt SLA 8h
        await db.query('INSERT INTO loan_progress (loan_id, step_id, completed, actual_hours, started_at, completed_at, executed_by) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            'HS-DB-002',
            4,
            true,
            2,
            now - 5000000,
            now - 2000000,
            'Nguyễn Văn C'
        ]);
        await db.query('INSERT INTO loan_progress (loan_id, step_id, completed, actual_hours, started_at) VALUES (?, ?, ?, ?, ?)', [
            'HS-DB-002',
            5,
            false,
            0,
            now - 2000000
        ]);

        // Tạo progress cho HS-DB-003
        await db.query('INSERT INTO loan_progress (loan_id, step_id, completed, actual_hours, started_at) VALUES (?, ?, ?, ?, ?)', [
            'HS-DB-003',
            1,
            false,
            0,
            now - 10000000
        ]);

        res.json({message: 'Đã tạo xong dữ liệu mẫu trên MySQL!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

// 5. User Management Routes
// GET all users
app.get('/api/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, username, role, dept, dept_code, name FROM users');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

// POST create a new user
app.post('/api/users', async (req, res) => {
    const {
        username,
        name,
        role,
        dept,
        dept_code
    } = req.body;

    try { // Kiểm tra username đã tồn tại chưa
        const [existing] = await db.query('SELECT username FROM users WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.status(400).json({message: 'Tên đăng nhập đã tồn tại'});
        }

        // Tạo password random 6 số
        const password = Math.floor(100000 + Math.random() * 900000).toString();
        // Generate random ID (for mock simplicity, in real app use UUID)
        const id = 'U' + Date.now();

        await db.query('INSERT INTO users (id, username, password, role, dept, dept_code, name) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            id,
            username,
            password,
            role,
            dept,
            dept_code || null,
            name
        ]);

        res.status(201).json({
            message: 'Tạo người dùng thành công',
            user: {
                id,
                username,
                role,
                dept,
                dept_code: dept_code || null,
                name
            },
            newPassword: password
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

// DELETE a user
app.delete('/api/users/:id', async (req, res) => {
    const {id} = req.params;
    try { // Prevent deleting the main admin for safety in this mock
        if (id === '1') {
            return res.status(403).json({message: 'Không thể xóa tài khoản Admin gốc'});
        }
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({message: 'Xóa người dùng thành công'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

// POST reset password
app.post('/api/users/:id/reset-password', async (req, res) => {
    const {id} = req.params;
    try { // Tạo password random 6 số
        const newPassword = Math.floor(100000 + Math.random() * 900000).toString();

        const [result] = await db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Không tìm thấy người dùng'});
        }

        res.json({message: 'Khôi phục mật khẩu thành công', newPassword: newPassword});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend Server running on port ${PORT}`);
});
