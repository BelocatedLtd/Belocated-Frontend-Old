import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../../redux/slices/userSlice';

const List = () => {
  const users = useSelector(selectUsers)
  return (
    <TableContainer component={Paper} className=''>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
            {/* <TableCell>SN</TableCell> */}
          <TableCell>Fullname</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Ads Created</TableCell>
          <TableCell>Ongoing Tasks</TableCell>
          <TableCell>Tasks Completed</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((row, index) => (
          <TableRow key={row._id}>
            <TableCell >{row.fullname}</TableCell>
            <TableCell>@{row.username}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>{row.gender}</TableCell>
            <TableCell>{row.location}</TableCell>
            <TableCell>{row.adsCreated}</TableCell>
            <TableCell>{row.taskOngoing}</TableCell>
            <TableCell>{row.taskCompleted}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default List