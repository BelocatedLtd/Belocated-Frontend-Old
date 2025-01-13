import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../../../services/userServices';
import { getAllTransactions } from '../../../services/transactionService';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const Transactions = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState({
    successfulTransactionCount: 0,
    successfulTransactionAmount: 0,
    pendingTransactionCount: 0,
    pendingTransactionAmount: 0,
    totalUsers: 0,
  });

  const fetchTransactions = async (page, limit, startDate, endDate) => {
    try {
      setIsLoading(true);
      const response = await getAllTransactions(page, limit, startDate, endDate);
      if (response) {
        setTotalRows(response.totalTransactions);
        setTransactions(response.transactions);
        setSummary({
          successfulTransactionCount: response.successfulTransactionCount,
          successfulTransactionAmount: response.successfulTransactionAmount,
          pendingTransactionCount: response.pendingTransactionCount,
          pendingTransactionAmount: response.pendingTransactionAmount,
          totalUsers: response.totalUsers,
        });
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const applyDateFilter = () => fetchTransactions(currentPage, rowsPerPage, startDate, endDate);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTransactions(page, rowsPerPage, startDate, endDate);
  };

  const handleChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    fetchTransactions(currentPage, rowsPerPage, startDate, endDate);
  };

  useEffect(() => {
    fetchTransactions(currentPage, rowsPerPage, startDate, endDate);
  }, []);

  const columns = [
    { name: 'Trx Id', selector: (row) => row.trxId },
    { name: 'User', selector: (row) => row.username },
    { name: 'Transaction Type', selector: (row) => row.trxType },
    { name: 'Amount', selector: (row) => `₦${row.chargedAmount}` },
    { name: 'Date', selector: (row) => new Date(parseInt(row.date)).toLocaleString() },
    { name: 'Status', selector: (row) => row.status },
  ];

  const pieChartData = [
    { name: 'Successful', value: summary.successfulTransactionCount },
    { name: 'Pending', value: summary.pendingTransactionCount },
  ];

  const COLORS = ['#4bc0c0', '#ffce56'];

  return (
    <div className="w-full mx-auto mt-6 p-4">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <MdOutlineKeyboardArrowLeft
          size={30}
          onClick={() => navigate(-1)}
          className="cursor-pointer mr-2"
        />
        <h1 className="text-xl font-bold text-gray-700">Transactions</h1>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <p className="text-xl font-semibold">{summary.totalUsers}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Successful Transactions</h3>
          <p className="text-xl font-semibold">{summary.successfulTransactionCount}</p>
          <p className="text-green-500 font-bold">₦{summary.successfulTransactionAmount}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm text-gray-500">Pending Transactions</h3>
          <p className="text-xl font-semibold">{summary.pendingTransactionCount}</p>
          <p className="text-yellow-500 font-bold">₦{summary.pendingTransactionAmount}</p>
        </div>
      </div>

      {/* Filters and Pie Chart */}
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
          <PieChart width={300} height={200}>
            <Pie
              data={pieChartData}
              dataKey="value"
              outerRadius={80}
              label
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

      {/* Transactions Table */}
      <DataTable
        columns={columns}
        data={transactions}
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

export default Transactions;
