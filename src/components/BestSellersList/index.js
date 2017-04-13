import React from 'react'
import Book from '../Book'
import Toggle from 'material-ui/Toggle'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


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

// <TableRow key={i}>
//   <TableRowColumn>{book.title}</TableRowColumn>
//   <TableRowColumn>{book.author}</TableRowColumn>
// </TableRow>)

const BestSellerList = ({ bestSellers, onToggleClick, showBooks, onButtonClick, isFetching }) => {
  var booksTableBody = null;

  if (showBooks){
    if (isFetching){
      booksTableBody =
      <TableBody showRowHover={false} displayRowCheckbox={false}>
        <TableRow>
          <TableRowColumn colSpan="2" style={{textAlign: 'center'}}>
            <CircularProgress style={{marginTop:'150px'}} />
          </TableRowColumn>
        </TableRow>
      </TableBody>
    } else {
      booksTableBody  = (
            <TableBody showRowHover={true} displayRowCheckbox={false}>
              {
                bestSellers.map((book, i) => (
                  <Book
                    key={i}
                    title={book.title}
                    author={book.author}
                    />
                ))
              }
            </TableBody>)
    }
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
