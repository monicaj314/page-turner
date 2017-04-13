import React from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table';

const Book = ({title, author, rank, category}) => (
  <TableRow hoverable={true}>
    <TableRowColumn style={{width:'50px'}}>{rank}</TableRowColumn>
    <TableRowColumn>{title}</TableRowColumn>
    <TableRowColumn>{author}</TableRowColumn>
    <TableRowColumn>{category}</TableRowColumn>
  </TableRow>
)

export default Book
