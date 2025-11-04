import React, { useMemo } from 'react';
import { 
    MOCK_STUDENTS, 
    ATTENDANCE_POLICIES, 
    COLORS, 
    BUTTON_STYLE 
} from '../data';

// --- Faculty/Admin: Compliance & Reports Component ---
const ComplianceReports = ({ records, leaves, setLeaves, students = MOCK_STUDENTS }) => {
    
    // 1. Compliance Check: Identify students below minimum required attendance
    const complianceAlerts = useMemo(() => {
        const totalWorkingDates = ATTENDANCE_POLICIES.totalWorkingSessions;
        return students.filter(student => {
            // Count Present or Late (P or L) as attended
            const presentCount = records.filter(r => r.studentId === student.id && (r.status === 'P' || r.status === 'L')).length;
            const attendancePercent = totalWorkingDates > 0 ? Math.round((presentCount / totalWorkingDates) * 100) : 0;
            return attendancePercent < ATTENDANCE_POLICIES.minAttendancePercent;
        });
    }, [records, students]);

    // 2. Leave Management Logic
    const handleApprove = (id) => {
        setLeaves(prev => prev.map(l => l.id === id ? {...l, status: 'Approved'} : l));
    };
    
    // 3. Simple Mock Analytics
    const totalSessions = records.length;
    const totalPresent = records.filter(r => r.status === 'P').length;
    const totalAbsent = records.filter(r => r.status === 'A').length;

    return (
        <div style={{ padding: '20px', border: `1px solid ${COLORS.border}`, borderRadius: '8px', backgroundColor: 'white' }}>
            <h3 style={{ color: COLORS.primary, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '10px' }}>Compliance, Analytics & Leave Management</h3>
            
            {/* Analytics Summary */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ flex: 1, padding: '10px', background: COLORS.secondary, borderRadius: '4px', borderLeft: `5px solid ${COLORS.primary}` }}>
                    <strong>Total Sessions Logged:</strong> {totalSessions}
                </div>
                <div style={{ flex: 1, padding: '10px', background: COLORS.secondary, borderRadius: '4px', borderLeft: `5px solid ${COLORS.success}` }}>
                    <strong>Total Present:</strong> {totalPresent}
                </div>
                <div style={{ flex: 1, padding: '10px', background: COLORS.secondary, borderRadius: '4px', borderLeft: `5px solid ${COLORS.danger}` }}>
                    <strong>Total Absent:</strong> {totalAbsent}
                </div>
            </div>

            {/* Leave Requests */}
            <h4>Leave Requests</h4>
            <div style={{ border: `1px solid ${COLORS.border}`, padding: '10px', marginBottom: '20px', borderRadius: '4px' }}>
                {leaves.map(l => (
                    <div key={l.id} style={{ padding: '5px 0', borderBottom: `1px dotted ${COLORS.secondary}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            {students.find(s => s.id === l.studentId)?.name} ({l.date}) - 
                            <span style={{ color: l.status === 'Pending' ? COLORS.warning : COLORS.success, marginLeft: '5px', fontWeight: 'bold' }}>{l.status}</span>
                        </div>
                        {l.status === 'Pending' && (
                            <button onClick={() => handleApprove(l.id)} style={{ ...BUTTON_STYLE, padding: '5px 10px', fontSize: '0.8em', background: COLORS.warning, borderColor: COLORS.warning, color: COLORS.text }}>Approve</button>
                        )}
                    </div>
                ))}
            </div>

            {/* Compliance Alerts */}
            <h4>Compliance Alerts (Below {ATTENDANCE_POLICIES.minAttendancePercent}%)</h4>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {complianceAlerts.length > 0 ? complianceAlerts.map(student => (
                    <li key={student.id} style={{ color: COLORS.danger, padding: '8px 0', borderLeft: `5px solid ${COLORS.danger}`, paddingLeft: '10px', marginBottom: '5px', background: COLORS.secondary }}>
                        ⚠ **{student.name} ({student.studentID})** is below the minimum required attendance!
                    </li>
                )) : (
                    <li style={{ color: COLORS.success, padding: '8px 0' }}>✅ No current compliance issues requiring immediate action.</li>
                )}
            </ul>
        </div>
    );
};

export default ComplianceReports;