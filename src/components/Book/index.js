import React from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table';

const Book = ({title, author}) => (
  <TableRow hoverable={true}>
    <TableRowColumn>{title}</TableRowColumn>
    <TableRowColumn>{author}</TableRowColumn>
  </TableRow>
)

export default Book
