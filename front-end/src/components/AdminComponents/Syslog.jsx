import React, { useState, useEffect } from 'react';

export default function SyslogList() {
    const [syslogs, setSyslogs] = useState([]);
    const [filteredSyslogs, setFilteredSyslogs] = useState([]);
    const [userFilter, setUserFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const fetchSyslogs = async () => {
        try {
            const response = await fetch('http://localhost:5050/syslogs/get/');
            const data = await response.json();
            if (Array.isArray(data)) {
                setSyslogs(data);
                setFilteredSyslogs(data);
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching syslogs:', error);
        }
    };

    useEffect(() => {
        fetchSyslogs();
    }, []);

    // Filter syslogs in real-time based on user name and date
    useEffect(() => {
        let filtered = syslogs;

        if (userFilter) {
            filtered = filtered.filter(log =>
                log.fullName.toLowerCase().includes(userFilter.toLowerCase())
            );
        }

        if (dateFilter) {
            filtered = filtered.filter(log => {
                const logDate = new Date(log.time).toISOString().split('T')[0];
                return logDate === dateFilter;
            });
        }

        setFilteredSyslogs(filtered);
    }, [userFilter, dateFilter, syslogs]);

    return (
        <div>
            <div className='title'>
                <h2>Syslog List</h2>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Filter by User Name"
                    value={userFilter}
                    onChange={e => setUserFilter(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Filter by Date"
                    value={dateFilter}
                    onChange={e => setDateFilter(e.target.value)}
                />
            </div>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Controller</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSyslogs.slice().reverse().map(log => (
                        <tr key={log._id}>
                            <td>{log.userId}</td>
                            <td>{log.fullName}</td>
                            <td>{log.controllerName}</td>
                            <td>{new Date(log.time).toISOString()}</td>
                            <td>{log.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
