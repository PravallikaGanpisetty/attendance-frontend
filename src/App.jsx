import React, { useState } from 'react';

// Import Components
import Navigation from './components/Navigation';
import CourseEnrollment from './components/CourseEnrollment';
import StudentDashboard from './components/StudentDashboard';
import ComplianceReports from './components/ComplianceReports';

// Import Data/Styles
import { 
    INITIAL_RECORDS, 
    INITIAL_LEAVES, 
    MOCK_STUDENTS,
    getFormattedDate, 
    getCurrentTime,
    COLORS
} from './data';

const AttendanceSystemApp = () => {
    // Global State 
    const [attendanceRecords, setAttendanceRecords] = useState(INITIAL_RECORDS);
    const [leaveRecords, setLeaveRecords] = useState(INITIAL_LEAVES);
    
    // State for navigation/role
    const [view, setView] = useState('enrollment'); // default view
    const [userRole, setUserRole] = useState('admin'); // 'admin' or 'student'
    
    const todayDate = getFormattedDate();

    // Central function for Attendance tracking logic
    const markAttendance = (studentId, courseId, date, status, checkInTime = getCurrentTime()) => {
        setAttendanceRecords(prevRecords => {
            const existingIndex = prevRecords.findIndex(r => r.studentId === studentId && r.courseId === courseId && r.date === date);

            if (existingIndex > -1) {
                // Update existing record (e.g., if faculty changes A to P)
                const newRecords = [...prevRecords];
                newRecords[existingIndex].status = status;
                newRecords[existingIndex].checkIn = checkInTime;
                return newRecords;
            } else {
                // Add new course session record
                return [...prevRecords, { studentId, courseId, date, status, checkIn: checkInTime }];
            }
        });
    };

    const handleRoleChange = (role) => {
        setUserRole(role);
        // Reset view based on the new role
        setView(role === 'admin' ? 'enrollment' : 'dashboard');
    };

    const adminViews = { 'enrollment': 'Course Enrollment', 'reports': 'Compliance & Leave' };
    const currentStudentId = MOCK_STUDENTS[0].id; // Alice Johnson is used for the student view

    return (
        <div style={{ fontFamily: 'Roboto, Arial, sans-serif', maxWidth: '1200px', margin: '20px auto', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', borderRadius: '10px', backgroundColor: COLORS.secondary }}>
            <header style={{ borderBottom: `3px solid ${COLORS.primary}`, marginBottom: '15px', paddingBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: COLORS.primary, margin: '0', fontSize: '2em' }}>Academic Attendance Portal</h1>
                <div style={{ fontSize: '1em', fontWeight: 'bold', color: COLORS.text, display: 'flex', alignItems: 'center' }}>
                    Today: {todayDate} | Role: 
                    <button onClick={() => handleRoleChange('admin')} style={{ marginLeft: '10px', padding: '8px 15px', background: userRole === 'admin' ? COLORS.primary : 'transparent', color: userRole === 'admin' ? 'white' : COLORS.text, border: `1px solid ${COLORS.primary}`, borderRadius: '4px', cursor: 'pointer' }}>Faculty/Admin</button>
                    <button onClick={() => handleRoleChange('student')} style={{ marginLeft: '5px', padding: '8px 15px', background: userRole === 'student' ? COLORS.primary : 'transparent', color: userRole === 'student' ? 'white' : COLORS.text, border: `1px solid ${COLORS.primary}`, borderRadius: '4px', cursor: 'pointer' }}>Student</button>
                </div>
            </header>
            
            <div style={{ minHeight: '400px', padding: '10px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                
                {userRole === 'admin' ? (
                    <>
                        <Navigation currentView={view} setView={setView} views={adminViews} />
                        {view === 'enrollment' && <CourseEnrollment records={attendanceRecords} markAttendance={markAttendance} />}
                        {view === 'reports' && <ComplianceReports records={attendanceRecords} leaves={leaveRecords} setLeaves={setLeaveRecords} students={MOCK_STUDENTS} />}
                    </>
                ) : (
                    // Student view only shows the student dashboard
                    <StudentDashboard records={attendanceRecords} currentStudentId={currentStudentId} />
                )}
            </div>

            <footer style={{ marginTop: '30px', borderTop: `1px solid ${COLORS.border}`, paddingTop: '15px', textAlign: 'center', fontSize: '0.85em', color: '#666' }}>
                *Front-End Prototype. Data is stored in memory and resets on refresh.
            </footer>
        </div>
    );
};

export default AttendanceSystemApp;