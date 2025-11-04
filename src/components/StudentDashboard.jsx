import React, { useMemo } from 'react';
import { 
    MOCK_STUDENTS, 
    MOCK_COURSES, 
    ATTENDANCE_POLICIES,
    COLORS
} from '../data';

// --- Student: Student Dashboard Component ---
const StudentDashboard = ({ records, currentStudentId = 101 }) => { 
    const student = MOCK_STUDENTS.find(s => s.id === currentStudentId);
    if (!student) return <div>Student data not available.</div>;

    const studentRecords = records.filter(r => r.studentId === currentStudentId);

    // Calculate Summary and Compliance
    const summary = useMemo(() => {
        // Count Present or Late (P or L) as an attended session
        const totalPresent = studentRecords.filter(r => r.status === 'P' || r.status === 'L').length;
        const totalPossible = ATTENDANCE_POLICIES.totalWorkingSessions; 
        const percentage = totalPossible > 0 ? ((totalPresent / totalPossible) * 100).toFixed(1) : 0;
        return { totalPresent, percentage: parseFloat(percentage) };
    }, [studentRecords]);

    const complianceStatus = summary.percentage < ATTENDANCE_POLICIES.minAttendancePercent;

    return (
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
            <h3 style={{ color: COLORS.primary, borderBottom: `2px solid ${COLORS.border}`, paddingBottom: '10px' }}>
                Welcome, {student.name} ({student.studentID})
            </h3>

             <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0', backgroundColor: COLORS.secondary, padding: '15px', borderRadius: '5px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: complianceStatus ? COLORS.danger : COLORS.success }}>{summary.percentage}%</div>
                    <div style={{ fontSize: '1em', color: COLORS.text }}>Overall Attendance</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: complianceStatus ? COLORS.danger : COLORS.success }}>
                        {complianceStatus ? '⚠️ AT RISK (Action Required)' : '✅ Compliant'}
                    </div>
                    <div style={{ fontSize: '1em', color: COLORS.text }}>Compliance Status (Min: {ATTENDANCE_POLICIES.minAttendancePercent}%)</div>
                </div>
            </div>

            <h4>Session Attendance Details</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                <thead>
                    <tr style={{ background: COLORS.border }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Course</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '8px', textAlign: 'center' }}>Status</th>
                        <th style={{ padding: '8px', textAlign: 'center' }}>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {studentRecords.map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px dotted ${COLORS.secondary}` }}>
                            <td style={{ padding: '8px' }}>{MOCK_COURSES.find(c => c.id === r.courseId)?.name}</td>
                            <td style={{ padding: '8px' }}>{r.date}</td>
                            <td style={{ padding: '8px', textAlign: 'center', color: r.status === 'A' ? COLORS.danger : r.status === 'L' ? COLORS.warning : COLORS.success }}>{r.status}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>{r.checkIn || '--'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentDashboard;