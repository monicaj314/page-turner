import React from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table';

const Book = ({title, author}) => (
  <TableRow>
    <TableRowColumn>{title}</TableRowColumn>
    <TableRowColumn>{author}</TableRowColumn>
  </TableRow>
)

export default Book
