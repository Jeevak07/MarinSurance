import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import api from '../../services/api';
import { getToken } from '../../utils/authUtils';
import './adminStyle/manageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit=5;

  const  fetchUsers = async () => {
    try {
      const res = await api.get(`/allUsers?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const newUsers = res.data.users;
      setUsers(prev => [...prev, ...newUsers]);

      if(users.length + newUsers.length >= res.data.total){
        setHasMore(false);
      }else {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/delete-user/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        alert('User deleted successfully');
        // fetchUsers();
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>

      <InfiniteScroll dataLength={users.length}
      next={fetchUsers}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
        scrollThreshold={0.9}
      >
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
              <td>
                {u.role !== 'Admin' && (
                  <button className="delete-btn" onClick={() => handleDelete(u._id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </InfiniteScroll>
    </div>
  );
};

export default ManageUsers;
