import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getAllTransactions } from '../../../services/transactionService';

const Transactions = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dayCount, setDayCount] = useState(1); // Number of days for filtering

  const fetchTransactions = async (page, limit, dayCount) => {
    try {
      setIsLoading(true);
      const response = await getAllTransactions(page, limit, 'day', dayCount);
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

  const handleDayCountChange = (e) => {
    setDayCount(e.target.value);
    fetchTransactions(currentPage, rowsPerPage, e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTransactions(page, rowsPerPage, dayCount);
  };

  const handleChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    fetchTransactions(currentPage, rowsPerPage, dayCount);
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
          <input
            type="number"
            value={dayCount}
            onChange={handleDayCountChange}
            min="1"
            className="p-2 border rounded-md bg-white shadow-md"
          />
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
