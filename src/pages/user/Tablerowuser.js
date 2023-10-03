import { MenuItem, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";
import Iconify from "../components/Iconify";

Tablerowuser.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function Tablerowuser({ row, index, onDeleteRow, onEditRow }) {
  const { name, phone, email } = row;

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell component="th" scope="row">
          {phone}
        </TableCell>
        <TableCell component="th" scope="row">
          {email}
        </TableCell>

        <TableCell align="left">
          <MenuItem
            onClick={() => {
              onDeleteRow();
            }}
            sx={{ color: "error.main" }}
          >
            <Iconify icon={"eva:trash-2-outline"} />
            Delete
          </MenuItem>
        </TableCell>

        <TableCell align="left">
          <MenuItem
            onClick={() => {
              onEditRow();
            }}
          >
            <Iconify icon={"eva:edit-fill"} />
            Edit
          </MenuItem>
        </TableCell>
      </TableRow>
    </>
  );
}
