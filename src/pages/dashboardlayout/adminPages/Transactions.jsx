import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../../../services/userServices';
import { getAllTransactions } from '../../../services/transactionService';
import { PieChart, Pie, Cell, Tooltip } from 'recharts'; // Import from Recharts

const Transactions = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
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

  const userCache = new Map();

  const fetchUsers = async (page, limit) => {
    try {
      const response = await getAllUser(page, limit);
      if (response && response.users) {
        response.users.forEach((user) => userCache.set(user._id, user));
        setUsers(Array.from(userCache.values()));
      } else {
        console.log('Error: Invalid user response', response);
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

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

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const applyDateFilter = () => {
    fetchTransactions(currentPage, rowsPerPage, startDate, endDate);
  };

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
    fetchUsers(currentPage, rowsPerPage);
  }, []);

  const columns = [
    {
      name: 'Trx Id',
      selector: (row) => row.trxId,
    },
    {
      name: 'User',
      cell: (row) => <div className="font-bold text-[13px]">{row.username}</div>,
    },
    {
      name: 'Transaction Type',
      selector: (row) => row.trxType,
    },
    {
      name: 'Amount',
      cell: (row) => <div className="font-bold text-[13px]">₦{row.chargedAmount}</div>,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => (row.date ? new Date(parseInt(row.date)).toLocaleString() : 'N/A'),
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#18141E',
        color: '#f4f4f4',
        fontSize: '15px',
      },
    },
  };

  const pieChartData = [
    { name: 'Successful', value: summary.successfulTransactionCount },
    { name: 'Pending', value: summary.pendingTransactionCount },
  ];

  const COLORS = ['#4bc0c0', '#ffce56'];

  return (
    <div className="w-full mx-auto mt-[2rem]">
      <div className="flex items-center justify-between mb-[2rem] flex-wrap">
        <div className="flex items-center mb-4 w-full sm:w-auto">
          <MdOutlineKeyboardArrowLeft
            size={30}
            onClick={() => navigate(-1)}
            className="mr-1"
          />
          <p className="font-semibold text-xl text-gray-700">Transactions</p>
        </div>
        <div className="flex space-x-4 mb-4 w-full sm:w-auto">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="p-2 border rounded-md bg-white shadow-md w-full sm:w-40"
          />
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="p-2 border rounded-md bg-white shadow-md w-full sm:w-40"
          />
          <button
            onClick={applyDateFilter}
            className="p-2 border rounded-md bg-blue-500 text-white shadow-md hover:bg-blue-600 w-full sm:w-auto"
          >
            Apply
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={transactions}
        progressPending={isLoading}
        pagination
        selectableRows
        paginationServer
        fixedHeader
        customStyles={customStyles}
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
            Wallet Funding
            {!isLoading ? (
              <PieChart width={400} height={250}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
     <p> Successful: summary.successfulTransactionCount</p>
     <p> Pending: summary.pendingTransactionCount</p>
          <p> ₦${successfulTransactionAmount}</p>
          <p> ₦${pendingTransactionAmount}</p>
            ) : (
              <div className="h-[200px] flex items-center justify-center">
                <p>Loading...</p>
              </div>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            {/* ... summary box */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
