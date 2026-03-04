export function getSLAStatus(actualHours, slaHours) {
    if (actualHours === null) {
        return 'pending';
    }
    const ratio = actualHours / slaHours;
    if (ratio > 1) {
        return 'exceeded';
    }
    if (ratio >= 0.8) {
        return 'warning';
    }
    return 'ok';
}

export function formatHours(h) {
    if (h === null || h === undefined) {
        return '—';
    }
    if (h < 1) {
        return `${
            Math.round(h * 60)
        }p`;
    }
    return `${
        h.toFixed(1)
    }h`;
}

export function getElapsedHours(startTime) {
    if (! startTime) 
        return 0;
    

    // Read admin-configured business hours from localStorage
    let config = {};
    try {
        const raw = localStorage.getItem('businessConfig');
        if (raw) {
            const cfg = JSON.parse(raw);
            config = {
                workDays: cfg.workDays,
                startHour: cfg.startHour,
                endHour: cfg.endHour,
                lunchBreak: cfg.lunchBreakEnabled ? cfg.lunchBreak : null,
                holidays: (cfg.holidays || []).map((h) => h.date)
            };
        }
    } catch { // fallback to defaults
    }
    return calculateBusinessHours(startTime, Date.now(), config);
}/**
 * Calculates actual business hours between two timestamps based on a configuration.
 * @param {Date|string|number} startTime 
 * @param {Date|string|number} endTime 
 * @param {Object} config Business hours configuration
 * @returns {number} The actual business hours elapsed (can be fractional)
 */export function calculateBusinessHours(startTime, endTime, config = {}) {
if (!startTime || !endTime) 
    return 0;



const start = new Date(startTime);
const end = new Date(endTime);
if (start >= end) 
    return 0;



const {
    workDays = [
        1,
        2,
        3,
        4,
        5
    ], // 1: Monday, ..., 5: Friday
    startHour = 8, // 08:00
    endHour = 17, // 17:00
    lunchBreak = {
        start: 12,
        end: 13
    }, // Set to null to disable lunch break subtraction
    holidays = [] // Array of 'YYYY-MM-DD' strings
} = config;

let totalMilliseconds = 0;
const current = new Date(start);

while (current < end) {
    const dayOfWeek = current.getDay();
    // Get local date string YYYY-MM-DD
    const dateString = current.getFullYear() + '-' + String(current.getMonth() + 1).padStart(2, '0') + '-' + String(current.getDate()).padStart(2, '0');

    // Check if the current day is a working day and not a holiday
    if (workDays.includes(dayOfWeek) && !holidays.includes(dateString)) {
        const startOfDay = new Date(current);
        startOfDay.setHours(Math.floor(startHour), (startHour % 1) * 60, 0, 0);

        const endOfDay = new Date(current);
        endOfDay.setHours(Math.floor(endHour), (endHour % 1) * 60, 0, 0);

        // Determine actual start and end considering business hours for this day
        const todayStart = new Date(Math.max(current.getTime(), startOfDay.getTime()));
        const todayEnd = new Date(Math.min(end.getTime(), endOfDay.getTime()));

        if (todayStart < todayEnd) {
            let dayMs = todayEnd.getTime() - todayStart.getTime();

            // Subtract lunch break if it falls within the worked period today
            if (lunchBreak) {
                const lunchStart = new Date(current);
                lunchStart.setHours(Math.floor(lunchBreak.start), (lunchBreak.start % 1) * 60, 0, 0);

                const lunchEnd = new Date(current);
                lunchEnd.setHours(Math.floor(lunchBreak.end), (lunchBreak.end % 1) * 60, 0, 0);

                const lunchOverlapStart = new Date(Math.max(todayStart.getTime(), lunchStart.getTime()));
                const lunchOverlapEnd = new Date(Math.min(todayEnd.getTime(), lunchEnd.getTime()));

                // If the work period overlaps with the lunch break, subtract that overlap
                if (lunchOverlapStart < lunchOverlapEnd) {
                    dayMs -= (lunchOverlapEnd.getTime() - lunchOverlapStart.getTime());
                }
            }

            totalMilliseconds += dayMs;
        }
    }

    // Move to the next day at exactly 00:00:00
    current.setDate(current.getDate() + 1);
    current.setHours(0, 0, 0, 0);
}

// Convert milliseconds to hours
return totalMilliseconds / (1000 * 60 * 60);}
