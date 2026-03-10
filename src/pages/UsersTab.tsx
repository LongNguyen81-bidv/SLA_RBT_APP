import React, {useState} from 'react';
import {
    useUsers,
    useAddUser,
    useDeleteUser,
    useResetPassword,
    useUpdateUser
} from '../hooks/useUsers';
import type {User, Role}
from '../types';

export const DEPARTMENTS = [
    {
        name: 'QLNB',
        label: 'Quản lý Nội bộ'
    },
    {
        name: 'QHKH',
        label: 'Quan hệ Khách hàng'
    },
    {
        name: 'Định giá TS',
        label: 'Định giá Tài sản'
    },
    {
        name: 'Thẩm định',
        label: 'Thẩm định Tín dụng'
    }, {
        name: 'Phê duyệt',
        label: 'Phê duyệt Tín dụng'
    }, {
        name: 'HTTD',
        label: 'Hỗ trợ Tín dụng'
    },
];

export default function UsersTab() {
    const {data: users, isLoading, isError} = useUsers();
    const addUserMut = useAddUser();
    const deleteUserMut = useDeleteUser();
    const resetPassMut = useResetPassword();
    const updateUserMut = useUpdateUser();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        name: '',
        role: 'USER' as Role,
        dept: DEPARTMENTS[1].name,
        deptCode: ''
    });
    const [editingUser, setEditingUser] = useState < User | null > (null);
    const [successMessage, setSuccessMessage] = useState('');

    if (isLoading) 
        return <div className="p-6">
            {'Đang tải danh sách người dùng...'}</div>;
    
    if (isError) 
        return <div className="p-6 text-red-500">
            {'Lỗi khi tải danh sách người dùng'}</div>;
    

    const handleAddUser = async (e : React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await addUserMut.mutateAsync(newUser);
            setSuccessMessage(`Đã tạo tài khoản thành công. Mật khẩu mới là: ${
                res.newPassword
            }`);
            setIsAddModalOpen(false);
            setNewUser({
                username: '',
                name: '',
                role: 'USER',
                dept: DEPARTMENTS[1].name,
                deptCode: ''
            });
        } catch (err : any) {
            alert(err ?. response ?. data ?. message || 'Lỗi khi tạo tài khoản');
        }
    };

    const handleEditUser = async (e : React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) 
            return;
        
        try {
            await updateUserMut.mutateAsync({id: editingUser.id, userData: editingUser});
            setSuccessMessage(`Đã cập nhật tài khoản ${
                editingUser.username
            } thành công.`);
            setIsEditModalOpen(false);
            setEditingUser(null);
        } catch (err : any) {
            alert(err ?. response ?. data ?. message || 'Lỗi khi cập nhật tài khoản');
        }
    };

    const handleDelete = async (id : string, username : string) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng ${username}?`)) {
            try {
                await deleteUserMut.mutateAsync(id);
                setSuccessMessage(`Đã xóa người dùng ${username}`);
            } catch (err : any) {
                alert(err ?. response ?. data ?. message || 'Lỗi khi xóa tài khoản');
            }
        }
    };

    const handleResetPassword = async (id : string, username : string) => {
        if (window.confirm(`Bạn có chắc chắn muốn reset mật khẩu cho ${username}?`)) {
            try {
                const res = await resetPassMut.mutateAsync(id);
                setSuccessMessage(`Đã đổi mật khẩu cho ${username}. Mật khẩu mới là: ${
                    res.newPassword
                }`);
            } catch (err : any) {
                alert(err ?. response ?. data ?. message || 'Lỗi khi reset mật khẩu');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-bidv-green">
                    {'Quản lý Người dùng'}</h2>
                <button onClick={
                        () => setIsAddModalOpen(true)
                    }
                    className="bg-bidv-green text-white px-4 py-2 rounded shadow hover:bg-bidv-green-mid">
                    {'+ Thêm người dùng'} </button>
            </div>

            {
            successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">
                        {successMessage}</span>
                    <button className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        onClick={
                            () => setSuccessMessage('')
                    }>
                        {'✖'}</button>
                </div>
            )
        }

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                {'Mã CB'}</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                {'Tên CB'}</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                {'Chức năng'}</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                {'Mã phòng'}</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                {'Vai trò'}</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                {'Hành động'}</th>
                        </tr>
                    </thead>
                    <tbody> {
                        users ?. map((user) => (
                            <tr key={
                                user.id
                            }>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm font-medium text-gray-900">
                                    {
                                    user.username
                                }</td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-gray-900">
                                    {
                                    user.name
                                }</td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-gray-900">
                                    {
                                    user.dept
                                }</td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-gray-900 font-mono">
                                    {
                                    (user as any).dept_code || user.deptCode || '—'
                                }</td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <span className={
                                        `relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${
                                            user.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-900' : 'bg-green-100 text-green-900'
                                        }`
                                    }>
                                        {
                                        user.role
                                    } </span>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                    <button onClick={
                                            () => {
                                                setEditingUser(user);
                                                setIsEditModalOpen(true);
                                            }
                                        }
                                        className="text-yellow-600 hover:text-yellow-900 mr-4 font-semibold">
                                        {'Sửa'}</button>
                                    <button onClick={
                                            () => handleResetPassword(user.id, user.username)
                                        }
                                        className="text-blue-600 hover:text-blue-900 mr-4 font-semibold">
                                        {'Reset Password'}</button>
                                    <button onClick={
                                            () => handleDelete(user.id, user.username)
                                        }
                                        className="text-red-600 hover:text-red-900 font-semibold disabled:text-gray-400"
                                        disabled={
                                            user.id === '1'
                                    }>
                                        {'Xóa'}</button>
                                </td>
                            </tr>
                        ))
                    } </tbody>
                </table>
            </div>

            {
            isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96 transform translate-y-[-10%]">
                        <h3 className="text-xl font-bold mb-4 text-bidv-green">
                            {'Thêm Người Dùng'}</h3>
                        <form onSubmit={handleAddUser}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {'Mã CB'}</label>
                                <input type="text" required pattern="\d{6}" title="Mã Cán bộ phải gồm 6 chữ số"
                                    maxLength={6}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-bidv-green"
                                    value={
                                        newUser.username
                                    }
                                    onChange={
                                        (e) => setNewUser({
                                            ...newUser,
                                            username: e.target.value
                                        })
                                    }/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {'Tên CB'}</label>
                                <input type="text" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-bidv-green"
                                    value={
                                        newUser.name
                                    }
                                    onChange={
                                        (e) => setNewUser({
                                            ...newUser,
                                            name: e.target.value
                                        })
                                    }/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {'Mã Phòng'}</label>
                                <input type="text" required pattern="\d{3}" title="Mã phòng phải gồm 3 chữ số"
                                    maxLength={3}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-bidv-green"
                                    value={
                                        newUser.deptCode
                                    }
                                    onChange={
                                        (e) => setNewUser({
                                            ...newUser,
                                            deptCode: e.target.value
                                        })
                                    }/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {'Chức năng (theo quy trình)'}</label>
                                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-bidv-green"
                                    value={
                                        newUser.dept
                                    }
                                    onChange={
                                        (e) => setNewUser({
                                            ...newUser,
                                            dept: e.target.value
                                        })
                                }>
                                    {
                                    DEPARTMENTS.map(dept => (
                                        <option key={
                                                dept.name
                                            }
                                            value={
                                                dept.name
                                        }>
                                            {
                                            dept.label
                                        }</option>
                                    ))
                                } </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {'Vai trò'}</label>
                                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-bidv-green"
                                    value={
                                        newUser.role
                                    }
                                    onChange={
                                        (e) => setNewUser({
                                            ...newUser,
                                            role: e.target.value as Role
                                        })
                                }>
                                    <option value="USER">
                                        {'USER'}</option>
                                    <option value="ADMIN">
                                        {'ADMIN'}</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <button type="button"
                                    onClick={
                                        () => setIsAddModalOpen(false)
                                    }
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                                    {'Hủy'}</button>
                                <button type="submit" className="bg-bidv-green hover:bg-bidv-green-mid text-white font-bold py-2 px-4 rounded"
                                    disabled={
                                        addUserMut.isPending
                                }>
                                    {
                                    addUserMut.isPending ? 'Đang tạo...' : 'Tạo'
                                }</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

            {
            isEditModalOpen && editingUser && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96 transform translate-y-[-10%]">
                        <h3 className="text-xl font-bold mb-4 text-bidv-green">Sửa Người Dùng - {
                            editingUser.username
                        }</h3>
                        <form onSubmit={handleEditUser}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {'Tên CB'}</label>
                                <input type="text" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-bidv-green"
                                    value={
                                        editingUser.name
                                    }
                                    onChange={
                                        (e) => setEditingUser({
                                            ...editingUser,
                                            name: e.target.value
                                        })
                                    }/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {'Mã Phòng'}</label>
                                <input type="text" required pattern="\d{3}" title="Mã phòng phải gồm 3 chữ số"
                                    maxLength={3}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-bidv-green"
                                    value={
                                        editingUser.deptCode
                                    }
                                    onChange={
                                        (e) => setEditingUser({
                                            ...editingUser,
                                            deptCode: e.target.value
                                        })
                                    }/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {'Chức năng (theo quy trình)'}</label>
                                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-bidv-green"
                                    value={
                                        editingUser.dept
                                    }
                                    onChange={
                                        (e) => setEditingUser({
                                            ...editingUser,
                                            dept: e.target.value
                                        })
                                }>
                                    {
                                    DEPARTMENTS.map(dept => (
                                        <option key={
                                                dept.name
                                            }
                                            value={
                                                dept.name
                                        }>
                                            {
                                            dept.label
                                        }</option>
                                    ))
                                } </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {'Vai trò'}</label>
                                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-bidv-green"
                                    value={
                                        editingUser.role
                                    }
                                    onChange={
                                        (e) => setEditingUser({
                                            ...editingUser,
                                            role: e.target.value as Role
                                        })
                                    }
                                    disabled={
                                        editingUser.id === '1'
                                }>
                                    <option value="USER">
                                        {'USER'}</option>
                                    <option value="ADMIN">
                                        {'ADMIN'}</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <button type="button"
                                    onClick={
                                        () => {
                                            setIsEditModalOpen(false);
                                            setEditingUser(null);
                                        }
                                    }
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                                    {'Hủy'}</button>
                                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                    disabled={
                                        updateUserMut.isPending
                                }>
                                    {
                                    updateUserMut.isPending ? 'Đang lưu...' : 'Lưu'
                                }</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } </div>
    );
}
