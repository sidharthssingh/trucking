//React imports
import React from "react";
//Router imports
// import { Link } from "@reach/router";
//Material UI imports
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

export const TruckTable = props => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Truck Name</StyledTableCell>
            <StyledTableCell>From</StyledTableCell>
            <StyledTableCell>To</StyledTableCell>
            <StyledTableCell>Current State</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => (
            <StyledTableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.from}</TableCell>
              <TableCell>{row.to}</TableCell>
              <TableCell>{row.currentState}</TableCell>
              <TableCell>
                <Button
                  onClick={() => props.openDetailsDialog(row)}
                  size="small"
                  color="secondary"
                >
                  View
                </Button>
                {row.currentState === "Available" && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => props.changeTruckStatus(row)}
                  >
                    Book
                  </Button>
                )}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
