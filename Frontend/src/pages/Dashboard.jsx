// frontend/src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, redirect to login
        navigate('/login');
        return;
      }

      try {
        const response = await API.get('/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        // If token is invalid or expired, redirect to login
        console.error('Failed to fetch dashboard data:', error);
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {dashboardData ? (
        <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
      ) : (
        <p>No data to display.</p>
      )}
    </div>
  );
}

export default Dashboard;