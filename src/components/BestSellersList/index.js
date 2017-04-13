import React from 'react'
import Book from '../Book'
import Toggle from 'material-ui/Toggle'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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

// <TableRow key={i}>
//   <TableRowColumn>{book.title}</TableRowColumn>
//   <TableRowColumn>{book.author}</TableRowColumn>
// </TableRow>)


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
      return category.key == key;
    });

    return result;
  }

  handleChange = (event, index, value) => {
    let categoryName = this.getCategory(value)[0].name
    this.setState({dropDownValue: value})
    this.props.onDropdownChange(categoryName)
  }

  render() {
    var booksTableBody = null;

    if (this.props.showBooks){
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
          {// <Toggle
          //   style={styles.toggleStyle}
          //   label="Show Books"
          //   labelPosition="right"
          //   defaultToggled={true}
          //   onToggle={() => this.props.onToggleClick()}
          // />
        }
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




// const BestSellerList = ({ bestSellers, onToggleClick, showBooks, onButtonClick, isFetching, category }) => {
//   var booksTableBody = null;
//
//   if (showBooks){
//     if (isFetching){
//       booksTableBody =
//       <TableBody showRowHover={false} displayRowCheckbox={false}>
//         <TableRow>
//           <TableRowColumn colSpan="2" style={{textAlign: 'center'}}>
//             <CircularProgress style={{marginTop:'150px'}} />
//           </TableRowColumn>
//         </TableRow>
//       </TableBody>
//     } else {
//       booksTableBody  = (
//             <TableBody showRowHover={true} displayRowCheckbox={false}>
//               {
//                 bestSellers.map((book, i) => (
//                   <Book
//                     key={i}
//                     title={book.title}
//                     author={book.author}
//                     />
//                 ))
//               }
//             </TableBody>)
//     }
//   } else {
//     booksTableBody = null
//   }
//
//   return (
//   <div>
//       <div style={styles.controlsDiv}>
//         <Toggle
//           style={styles.toggleStyle}
//           label="Show Books"
//           labelPosition="right"
//           defaultToggled={true}
//           onToggle={() => onToggleClick()}
//         />
//         <DropDownMenu value={1} onChange={() => { alert('changed!') }}>
//           <MenuItem value={1} primaryText="Science" />
//           <MenuItem value={2} primaryText="Combined Print and E-Book Fiction" />
//           <MenuItem value={3} primaryText="Combined Print and E-Book Nonfiction" />
//           <MenuItem value={3} primaryText="Hardcover Fiction" />
//           <MenuItem value={3} primaryText="Hardcover Nonfiction" />
//         </DropDownMenu>
//         <RaisedButton
//           label="Add Book"
//           primary={true}
//           style={styles.buttonStyle}
//           onClick={() => onButtonClick()}
//           />
//       </div>
//
//       <Table selectable={false} style={styles.booksTable}>
//           <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
//             <TableRow>
//               <TableHeaderColumn>Book Title</TableHeaderColumn>
//               <TableHeaderColumn>Author</TableHeaderColumn>
//             </TableRow>
//           </TableHeader>
//           {booksTableBody}
//       </Table>
//   </div>
//   )
// }

export default BestSellerList
