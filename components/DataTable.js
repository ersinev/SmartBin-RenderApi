import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FaPlay, FaChartPie } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import MonthlyChart from './Charts/MonthlyChart';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(62,167,148)',
    color: theme.palette.common.white,
    fontSize: 20,
    fontWeight: '800',
    
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CenteredTableCell = styled(TableCell)({
  textAlign: 'center',
  verticalAlign: 'middle', // Bu satır butonları dikey olarak hizalar
});

function DataTable({
  savedData,
  searchTerm,
  startFetching,
  renderCapacityInput,
  deleteSavedData,
  compareButton,
}) {
  const [showModal, setShowModal] = React.useState(false);
  const handleClose = () => setShowModal(false);
  const [selectedData, setSelectedData] = React.useState(null);

  return (
    <div className="data-table">
      <TableContainer component={Paper} style={{ maxHeight: '400px', overflowX:'auto' }} className="table-container">
        <Table aria-label="customized table">
          <TableHead className="sticky-header">
            <TableRow>
              <StyledTableCell>School Name</StyledTableCell>
              <StyledTableCell>Class Name</StyledTableCell>
              <StyledTableCell>Feed Key</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Capacity</StyledTableCell>
              <StyledTableCell className="actions">Actions</StyledTableCell>
              <StyledTableCell>{compareButton}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedData
              .filter(
                (data) =>
                  data.schoolName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  data.className
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((data, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{data.schoolName}</StyledTableCell>
                  <StyledTableCell>{data.className}</StyledTableCell>
                  <StyledTableCell>{data.feedKey}</StyledTableCell>
                  <StyledTableCell>{data.email}</StyledTableCell>
                  <StyledTableCell>{renderCapacityInput(data, index)}</StyledTableCell>
                  <CenteredTableCell className="actionsCell">
                    <Button className="btnStart tableBtns" onClick={() => startFetching(data)}>
                      <FaPlay fill='#54c8e8' />
                    </Button>
                    <Button className="btnData tableBtns" onClick={() => {
                      setSelectedData(data);
                      setShowModal(true);
                    }}>
                      <FaChartPie fill='#c6e802' />
                    </Button>
                    <Button className="btnDelete tableBtns" onClick={() => deleteSavedData(index)}>
                      <MdDelete fill='red' />
                    </Button>
                  </CenteredTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MonthlyChart
        data={selectedData}
        showModal={showModal}
        handleClose={handleClose}
      />
    </div>
  );
}

export default DataTable;
