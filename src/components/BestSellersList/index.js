import React from 'react'
import Book from '../Book'
import Toggle from 'material-ui/Toggle'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  bookTable: {
    maxWidth: '300px',
    margin: 'auto'
  },
  controlsDiv: {
    margin: '20px auto',
    display: 'flex',
    maxWidth:'350px',
    alignItems:'center',
    justifyContent:'space-around'
  },
  toggleStyle:{
    maxWidth:'175px'
  },
  buttonStyle: {
    //margin: '12px'
  }
};

const BestSellerList = ({ books, onToggleClick, showBooks, onButtonClick }) => {
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
      <div style={styles.controlsDiv}>
        <Toggle
          style={styles.toggleStyle}
          label="Show Books"
          labelPosition="right"
          defaultToggled={true}
          onToggle={() => onToggleClick()}
        />
        <RaisedButton
          label="Add Book"
          primary={true}
          style={styles.buttonStyle}
          onClick={() => onButtonClick()}
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
