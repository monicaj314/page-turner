import React from 'react'
import Book from '../Book'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

//import RaisedButton from 'material-ui/RaisedButton';
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
    maxWidth:'400px',
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

class BestSellerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownValue : 1
    }
  }

  getCategory(key){
    const categories = [
      { key:1, name: 'Science' },
      { key:2, name: 'Combined Print and E-Book Fiction' },
      { key:3, name: 'Combined Print and E-Book Nonfiction' },
      { key:4, name: 'Hardcover Fiction' },
      { key:5, name: 'Hardcover Nonfiction' },
    ]
    var result = categories.filter(category => {
      return category.key === key;
    });

    return result;
  }

  handleChange = (event, index, value) => {
    let categoryName = this.getCategory(value)[0].name
    this.setState({dropDownValue: value})
    this.props.onDropdownChange(categoryName)
  }

  render() {
    console.log(this.props.bestSellers)
    var booksTableBody = null;

    if (this.props.isFetching){
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
                this.props.bestSellers.map((book, i) => (
                  <Book
                    key={i}
                    title={book.title}
                    author={book.author}
                    rank={book.rank}
                    category={book.category}
                    image={book.image}
                    description={book.description}
                    />
                ))
              }
            </TableBody>)
    }

    return (
    <div>
        <div style={styles.controlsDiv}>
        <DropDownMenu value={this.state.dropDownValue} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Science" />
          <MenuItem value={2} primaryText="Combined Print and E-Book Fiction" />
          <MenuItem value={3} primaryText="Combined Print and E-Book Nonfiction" />
          <MenuItem value={4} primaryText="Hardcover Fiction" />
          <MenuItem value={5} primaryText="Hardcover Nonfiction" />
        </DropDownMenu>
          {// <RaisedButton
          //   label="Add Book"
          //   primary={true}
          //   style={styles.buttonStyle}
          //   onClick={() => this.props.onButtonClick()}
          //   />
          }
        </div>

        <Table selectable={false} style={styles.booksTable}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{width:'50px'}}>Rank</TableHeaderColumn>
                <TableHeaderColumn>Image</TableHeaderColumn>
                <TableHeaderColumn>Book Title</TableHeaderColumn>
                <TableHeaderColumn>Author</TableHeaderColumn>
                <TableHeaderColumn>Category</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            {booksTableBody}
        </Table>
    </div>
    )
  }
}

export default BestSellerList
