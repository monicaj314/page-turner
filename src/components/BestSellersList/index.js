import React from 'react'
import Book from '../Book'
import Toggle from 'material-ui/Toggle'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

const styles = {
  toggleDiv: {
    maxWidth:'175px',
    margin:'30px auto'
  },
  bookTable: {
    maxWidth: '300px',
    margin: 'auto'
  }
};

const BestSellerList = ({ books, onToggleClick, showBooks }) => {
  var booksTableBody = null;

  if (showBooks){
    booksTableBody  = (
          <TableBody showRowHover={true}>
            {
              books.map((book, i) =>
              <Book
                key={i}
                title={book.title}
                author={book.author} />)
            }
          </TableBody>
    )
  } else {
    booksTableBody = null
  }

  return (
  <div>
      <div style={styles.toggleDiv}>
          <Toggle
          label="Show Books"
          labelPosition="right"
          defaultToggled={true}
          onToggle={() => onToggleClick()}
        />
      </div>
      <Table selectable={false} style={styles.booksTable}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Book Title</TableHeaderColumn>
              <TableHeaderColumn>Author</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {booksTableBody}
      </Table>
  </div>
  )
}

export default BestSellerList
