import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../../../services/userServices';

const Users = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
   const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalTasksCompleted: 0,
    totalReferrals: 0,
  });

  const COLORS = ['#4bc0c0', '#ffce56', '#36a2eb'];

  const fetchUsers = async (page, limit,startDate, endDate) => {
    try {
      setIsLoading(true);
      const response = await getAllUser(page, limit, startDate, endDate);
      if (response) {
        setTotalRows(response.totalUsers);
        setUsers(response.users);
        setSummary({
          totalUsers: response.totalUsers,
          totalTasksCompleted: response.totalTasksCompleted,
          totalReferrals: response. totalReferralsByAllUsers,
		  usersWithCompletedTasks: response.usersWithCompletedTasks,
		  referralStats:response.referralStats,
		  usersWithOngoingTasks:response.usersWithOngoingTasks,
		  totalTasksOngoing:response.totalTasksOngoing
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const applyDateFilter = () => fetchTransactions(currentPage, rowsPerPage, startDate, endDate);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page, rowsPerPage, startDate, endDate);
  };

  const handleChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    fetchUsers(currentPage, rowsPerPage, startDate, endDate);
  };

  useEffect(() => {
    fetchUsers(currentPage, rowsPerPage, startDate, endDate);
  }, []);

  const columns = [
    { name: 'Fullname', selector: (row) => row.fullname },
    { name: 'Username', selector: (row) => row.username, sortable: true },
    { name: 'Email', selector: (row) => row.email },
    { name: 'Phone', selector: (row) => row.phone, sortable: true },
    { name: 'State', selector: (row) => row.location, sortable: true },
    { name: 'Gender', selector: (row) => row.gender, sortable: true },
    { name: 'Tasks Completed', selector: (row) => row.taskCompleted, sortable: true },
    { name: 'Referrals', selector: (row) => row.referrals?.length, sortable: true },
  ];

  const pieChartData = [
    { name: 'Tasks Completed', value: summary.totalTasksCompleted },
    { name: 'Ongoing Tasks', value: users.reduce((acc, user) => acc + user.taskOngoing, 0) },
    { name: 'Referrals', value: summary.totalReferrals },
  ];

  return (
    <div className="w-full mx-auto mt-6 p-4">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <MdOutlineKeyboardArrowLeft
          size={30}
          onClick={() => navigate(-1)}
          className="cursor-pointer mr-2"
        />
        <h1 className="text-xl font-bold text-gray-700">Users</h1>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <p className="text-xl font-semibold">{summary.totalUsers}</p>
        </div>
		
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Total Tasks Completed</h3>
          <p className="text-xl font-semibold">{summary.totalTasksCompleted}</p>
        </div>
		<div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Users With Completed Tasks</h3>
          <p className="text-xl font-semibold">{summary.usersWithCompletedTasks}</p>
        </div>
		<div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Total Tasks Ongoing</h3>
          <p className="text-xl font-semibold">{summary.totalTasksOngoing}</p>
        </div>
		<div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Users With Ongoing Tasks</h3>
          <p className="text-xl font-semibold">{summary.usersWithOngoingTasks}</p>
        </div>
		<div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Referral Stats</h3>
          <p className="text-xl font-semibold">{summary.referralStats}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Total Referrals</h3>
          <p className="text-xl font-semibold">{summary.totalReferrals}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="flex flex-wrap gap-4 mb-6">
	  <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="p-2 border rounded bg-white shadow"
          />
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="p-2 border rounded bg-white shadow"
          />
          <button
            onClick={applyDateFilter}
            className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
		<div className="w-full sm:w-auto mx-auto">
        <PieChart width={400} height={300}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
	  </div>

      {/* User Table */}
      <DataTable
        columns={columns}
        data={users}
        progressPending={isLoading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Users;
