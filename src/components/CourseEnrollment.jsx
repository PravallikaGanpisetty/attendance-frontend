import React, { useState } from 'react';
import { 
    MOCK_STUDENTS, 
    MOCK_COURSES, 
    getFormattedDate, 
    getCurrentTime,
    COLORS
} from '../data';

// --- Faculty/Admin: Course Enrollment Component ---
const CourseEnrollment = ({ records, markAttendance }) => {
    const [selectedCourseId, setSelectedCourseId] = useState(MOCK_COURSES[0].id);
    const today = getFormattedDate();

    const course = MOCK_COURSES.find(c => c.id === selectedCourseId);
    if (!course) return <div>Course not found.</div>;
    
    const enrolledStudents = MOCK_STUDENTS.filter(s => course.students.includes(s.id));

    const handleMarkChange = (studentId, status) => {
        const checkInTime = status === 'P' || status === 'L' ? getCurrentTime() : undefined;
        markAttendance(studentId, selectedCourseId, today, status, checkInTime);
    };

    return (
        <div style={{ padding: '20px', border: `2px solid ${COLORS.primary}`, borderRadius: '8px', backgroundColor: COLORS.secondary }}>
            <h3 style={{ color: COLORS.primary }}>Faculty Session Enrollment</h3>
            
            <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Select Course:</label>
                <select 
                    value={selectedCourseId} 
                    onChange={e => setSelectedCourseId(e.target.value)}
                    style={{ padding: '8px', border: `1px solid ${COLORS.border}`, borderRadius: '4px' }}
                >
                    {MOCK_COURSES.map(c => (
                        <option key={c.id} value={c.id}>{c.id} - {c.name}</option>
                    ))}
                </select>
                <span style={{ marginLeft: '20px' }}>Instructor: {course.instructor}</span>
            </div>

             <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                <thead>
                    <tr style={{ background: COLORS.primary, color: 'white' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Student ID</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Mark Status</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledStudents.map(student => {
                        const currentRecord = records.find(r => 
                            r.studentId === student.id && r.courseId === selectedCourseId && r.date === today
                        );
                        // Default to 'A' (Absent) if no record exists for the current session/date
                        const initialStatus = currentRecord ? currentRecord.status : 'A';

                        return (
                            <tr key={student.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                                <td style={{ padding: '10px' }}>{student.studentID}</td>
                                <td style={{ padding: '10px' }}>{student.name}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>
                                    <select
                                        defaultValue={initialStatus}
                                        onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                        style={{ padding: '5px', border: `1px solid ${COLORS.border}`, borderRadius: '4px' }}
                                    >
                                        <option value="P">Present (P)</option>
                                        <option value="A">Absent (A)</option>
                                        <option value="L">Late (L)</option>
                                    </select>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CourseEnrollment;