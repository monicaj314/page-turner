import React from 'react'
import './CategoryMenuItem.css'

const styles = {
  category:{
    fontSize:'13px',
    padding: '2px 0px 2px 10px',
  },
}


class CategoryMenuItem extends React.Component {
  handleCategoryClick = (e) => {
    e.preventDefault()
    this.props.handleCategoryChange(this.props.id)
  }

  render() {
    return (
      <div key={this.props.id} style={styles.category}>
        <a className={this.props.selectedCategoryId === this.props.id ? 'category-link-current' : 'category-link'}
          onClick={this.handleCategoryClick}
          href="#">{ this.props.name }
        </a>
      </div>
    )
  }
}

export default CategoryMenuItem
