// ====================================================================
// --- MOCK DATA, POLICIES, AND UTILS ---
// ====================================================================

export const MOCK_STUDENTS = [
    { id: 101, name: "Alice Johnson", studentID: 'S2024101', email: 'alice.j@college.edu' },
    { id: 102, name: "Bob Smith", studentID: 'S2024102', email: 'bob.s@college.edu' },
    { id: 103, name: "Charlie Brown", studentID: 'S2024103', email: 'charlie.b@college.edu' },
    { id: 104, name: "Diana Prince", studentID: 'S2024104', email: 'diana.p@college.edu' },
];

export const MOCK_COURSES = [
    { id: 'CS101', name: 'Intro to Programming', instructor: 'Dr. Smith', students: [101, 103] },
    { id: 'MTH202', name: 'Calculus II', instructor: 'Prof. Lee', students: [102, 104] },
];

// Initial mock records for demonstration
export const INITIAL_RECORDS = [
    { studentId: 101, courseId: 'CS101', date: "2025-10-09", status: "P", checkIn: "08:55" },
    { studentId: 103, courseId: 'CS101', date: "2025-10-09", status: "L", checkIn: "09:15" },
    { studentId: 102, courseId: 'MTH202', date: "2025-10-09", status: "A", reason: "Sick Leave" },
    { studentId: 101, courseId: 'CS101', date: "2025-10-08", status: "P", checkIn: "09:00" },
    { studentId: 101, courseId: 'CS101', date: "2025-10-07", status: "P", checkIn: "08:58" },
    { studentId: 104, courseId: 'MTH202', date: "2025-10-08", status: "A" },
    { studentId: 104, courseId: 'MTH202', date: "2025-10-07", status: "A" },
    { studentId: 104, courseId: 'MTH202', date: "2025-10-06", status: "P" },
];

export const INITIAL_LEAVES = [
    { id: 1, studentId: 102, date: "2025-10-09", status: 'Approved' },
    { id: 2, studentId: 104, date: "2025-10-10", status: 'Pending' },
];

export const ATTENDANCE_POLICIES = {
    minAttendancePercent: 75,
    // Total sessions to calculate compliance against
    totalWorkingSessions: 5, 
};

// Utility Functions
export const getFormattedDate = (date = new Date()) => date.toISOString().slice(0, 10);
export const getCurrentTime = (date = new Date()) => date.toTimeString().slice(0, 5);


// ====================================================================
// --- STYLING CONSTANTS (For simple, uniform styling) ---
// ====================================================================
export const COLORS = {
    primary: '#004a99', // Dark College Blue
    secondary: '#f0f4f8', // Light Gray Background
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
    text: '#333',
    border: '#ced4da',
};

export const BUTTON_STYLE = {
    padding: '10px 18px',
    margin: '0 5px',
    borderRadius: '4px',
    border: '1px solid',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background 0.3s, color 0.3s',
};