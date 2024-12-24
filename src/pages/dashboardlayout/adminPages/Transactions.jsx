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

  // Cache to store users by their _id
  const userCache = new Map();

  // Fetch users and populate the cache
  const fetchUsers = async (page, limit) => {
    try {
      const response = await getAllUser(page, limit);
      if (response && response.users) {
        response.users.forEach((user) => userCache.set(user._id, user)); // Populate the cache
        setUsers(Array.from(userCache.values())); // Update state with cached users
      } else {
        console.log('Error: Invalid user response', response);
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const fetchTransactions = async (page, limit) => {
    try {
      setIsLoading(true);
      const response = await getAllTransactions(page, limit);
      if (response) {
        setTotalRows(response.totalTransactions);
        setTransactions(response.transactions);
        console.log(response.transactions)
        console.log(response.totalTransactions)
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTransactions(page, rowsPerPage);
  };

  const handleChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    fetchTransactions(currentPage, rowsPerPage);
  };

  useEffect(() => {
    fetchTransactions(currentPage, rowsPerPage);
    fetchUsers(currentPage, rowsPerPage); // Fetch users when the component mounts
  }, []);

  const columns = [
    {
      name: 'Trx Id',
      selector: (row) => row.trxId,
    },
    {
      name: 'User',
      cell: (row) => {
        // Use the cache for lookups
        return <div className="font-bold text-[13px]">{row.username}</div>
      },
    },
    {
      name: 'Transaction Type',
      selector: (row) => row.trxType,
    },
    {
      name: 'Amount',
      cell: (row) => {
        return <div className="font-bold text-[13px]">₦{row.chargedAmount}</div>;
      },
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
