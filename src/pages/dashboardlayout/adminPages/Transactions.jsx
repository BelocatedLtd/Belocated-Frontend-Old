import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../../../services/userServices';
import { getAllTransactions } from '../../../services/transactionService';

const Transactions = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all'); // Default filter is 'all'

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

  const fetchTransactions = async (page, limit, filter = 'all') => {
    try {
      setIsLoading(true);
      const dateFilter = getDateFilter(filter);
      const response = await getAllTransactions(page, limit, dateFilter);
      if (response) {
        setTotalRows(response.totalTransactions);
        setTransactions(response.transactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDateFilter = (filter) => {
    const timeFilters = {
      all: {}, 
      hour: { createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } },
      day: { createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      month: { createdAt: { $gte: new Date(new Date().setDate(1)) } },
      year: { createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) } },
    };

    return timeFilters[filter] || {};
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTransactions(page, rowsPerPage, timeFilter);
  };

  const handleChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    fetchTransactions(currentPage, rowsPerPage, timeFilter);
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setTimeFilter(selectedFilter);
    fetchTransactions(currentPage, rowsPerPage, selectedFilter);
  };

  useEffect(() => {
    fetchTransactions(currentPage, rowsPerPage, timeFilter);
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

  return (
    <div className="w-full mx-auto mt-[2rem]">
      <div className="flex items-center justify-between mb-[2rem]">
        <div className="flex items-center">
          <MdOutlineKeyboardArrowLeft
            size={30}
            onClick={() => navigate(-1)}
            className="mr-1"
          />
          <p className="font-semibold text-xl text-gray-700">Transactions</p>
        </div>
        <div>
          <select
            value={timeFilter}
            onChange={handleFilterChange}
            className="p-2 border rounded-md bg-white shadow-md"
          >
            <option value="all">All</option>
            <option value="hour">Last Hour</option>
            <option value="day">Today</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
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
    </div>
  );
};

export default Transactions;
