import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import DropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';

const styles={
  button:{
    border:'1px solid #dcdcdc',
    borderRadius: '2px',
    backgroundColor: '#f5f5f5'
  },
  icon:{
    marginRight:3,
  }

}

const CategoryDropDown = ({category, onClick}) => {
  return (
    <span>
      <FlatButton
        onTouchTap={onClick}
        style={styles.button}
        label={category}
        labelPosition="before"
        primary={false}
        icon={<DropDownIcon style={styles.icon}/>}
      />
    </span>
  )
}



export default CategoryDropDown
