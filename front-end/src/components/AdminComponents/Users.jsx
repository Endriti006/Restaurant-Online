import React, { useState, useEffect } from 'react';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [showClients, setShowClients] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5050/users/all/');
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await fetch('http://localhost:5050/users/getclients/');
            const data = await response.json();
            setUsers(data.clients);  // Update users state with clients only
            setShowClients(true);    // Set flag to show only clients
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const fetchAdmins = async () => {
        try {
            const response = await fetch('http://localhost:5050/users/getadmins/');
            const data = await response.json();
            setUsers(data.admins);  // Update users state with clients only
            setShowClients(true);    // Set flag to show only clients
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e, userId, field) => {
        const updatedUsers = users.map(user => {
            if (user._id === userId) {
                return { ...user, [field]: e.target.innerText };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleEdit = async (userId) => {
        if (window.confirm("Are you sure you want to edit this user?")) {
            const user = users.find(user => user._id === userId);
            try {
                const response = await fetch(`http://localhost:5050/users/edit/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullName: user.fullName,
                        email: user.email,
                        role: user.role,
                        phone: user.phone
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to edit user');
                }
                console.log('User edited successfully');
                fetchUsers();  // Refresh the user list after editing
            } catch (error) {
                console.error('Error editing user:', error);
            }
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`http://localhost:5050/users/delete/${userId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    const errorData = await response.json();  // Capture the error message from the server
                    throw new Error(errorData.message || 'Failed to delete user');
                }

                console.log('User deleted successfully');
                fetchUsers();  // Refresh the user list after deletion
            } catch (error) {
                console.error('Error deleting user:', error);
                alert(`Failed to delete user: ${error.message}`);
            }
        }
    };

    return (
        <div>

            <div className='title'>
                <h2>User List</h2>

                <div className='buttons-container'>
                    <button onClick={fetchUsers} disabled={!showClients}>Show All Users</button>
                    <button onClick={fetchClients}>Show Only Clients</button>
                    <button onClick={fetchAdmins} disabled={!showClients}>Show All Admins</button>
                </div>
            </div>
            
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, user._id, 'fullName')}>{user.fullName}</td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, user._id, 'email')}>{user.email}</td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, user._id, 'role')}>{user.role}</td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, user._id, 'phone')}>{user.phone}</td>
                            <td>
                                <button onClick={() => handleEdit(user._id)}>Edit</button>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
