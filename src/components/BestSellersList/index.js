import React from 'react'
import BookCard from '../BookCard'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  listWrapper:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    marginLeft:'150px'
  },
}


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

  render(){
    if (this.props.isFetching){
      return <p>Loading..</p>
    } else {
      var cards = this.props.bestSellers.map((book, i) => (
        <BookCard key={i} {...book} />)
        )

      return <div style={styles.listWrapper}>{cards}</div>
    }
  }
}

export default BestSellerList
