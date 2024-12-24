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


   const fetchUsers = async (page, limit) => {
    try {
      const response = await getAllUser(page, limit);
      if (response && response.users) {
        setUsers(response.users); // Ensure users are set correctly
        console.log('Fetched Users:', response.users); // Log fetched users
      } else {
        console.error('Error: Invalid user response', response);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

   const fetchTransactions = async (page, limit) => {
    try {
      setIsLoading(true);
      const response = await getAllTransactions(page, limit);
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
  
  useEffect(() => {
  console.log('Users loaded:', users);
}, [users]);

  const columns = [
    {
      name: 'Trx Id',
      selector: (row) => row.trxId,
    },
  
    {
  name: 'User',
  cell: (row) => {
    console.log('Row:', row);
    const user = users.find((user) => {
      console.log('Comparing:', user._id, row?.userId);
      return user._id === row?.userId; // Exact match
    });
    console.log('Found User:', user);
    return (
      <div className="font-bold text-[13px]">
        {user ? user.fullname || user.username : 'Unknown User'}
      </div>
    );
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

  // Fetch transactions
 

  // Fetch users
  // const fetchUsers = async (page, limit) => {
  //   try {
  //     const response = await getAllUser(page, limit);
  //     setUsers(response?.users || []);
  //     console.log(response)
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };



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
