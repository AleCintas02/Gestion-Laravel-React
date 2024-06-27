import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface UserTableProps {
    currentUserId: number;
}

const UserTable: React.FC<UserTableProps> = ({ currentUserId }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<number | null>(null);
    const [newRole, setNewRole] = useState<string>('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEditClick = (user: User) => {
        setEditingUser(user.id);
        setNewRole(user.role);
    };

    const handleSaveClick = async (userId: number) => {
        try {
            await axios.put(`/api/users/${userId}`, { role: newRole });
            fetchUsers(); // Refresh the user list
            setEditingUser(null);
            setNewRole('');
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingUser(null);
        setNewRole('');
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Lista de Usuarios</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Nombre</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Rol</th>
                            <th className="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border-b">{user.id}</td>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">
                                    {editingUser === user.id ? (
                                        <input
                                            type="text"
                                            value={newRole}
                                            onChange={(e) => setNewRole(e.target.value)}
                                            className="border rounded p-1"
                                        />
                                    ) : (
                                        user.role
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {user.id !== currentUserId && (
                                        editingUser === user.id ? (
                                            <>
                                                <button
                                                    onClick={() => handleSaveClick(user.id)}
                                                    className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    onClick={handleCancelClick}
                                                    className="bg-gray-500 text-white py-1 px-3 rounded"
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className="bg-blue-500 text-white py-1 px-3 rounded"
                                            >
                                                Editar
                                            </button>
                                        )
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
