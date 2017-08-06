import React from 'react'
import '../../App.css'

class ReadOptions extends React.Component {

  state = {
    book: this.props.book,
    oldValue:this.props.optionValue,
    cRflag:this.props.cRflag,
    wRflag: this.props.wRflag,
    rflag: this.props.rflag,
    noneFlag:this.props.noneFlag
  }


  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.optionValue !== nextState.oldValue
  }

  render() {
    let optionVal = this.props.optionValue
    let dropDownElement

    switch (optionVal) {
      case 'currentlyReading':
        dropDownElement =
        <select value={optionVal} onChange={e => this.props.typeReadingHandler(this.state,e) }>
        <option value='currentlyReading' disabled > Currently Reading </option>
        <option value='wantToRead'> Want to Read </option>
        <option value='read'> Read </option >
        <option value='none'> None </option >
          </select>
        break;
      case 'wantToRead':
        dropDownElement =
        <select value={optionVal} onChange={e => this.props.typeReadingHandler(this.state,e) }>
        <option value='currentlyReading' > Currently Reading </option>
        <option value='wantToRead' disabled> Want to Read </option>
        <option value='read'> Read </option >
        <option value='none'> None </option >
          </select>
        break;
      case 'read':
        dropDownElement =
        <select value={optionVal} onChange={e => this.props.typeReadingHandler(this.state,e) }>
        <option value='currentlyReading' > Currently Reading </option>
        <option value='wantToRead'> Want to Read </option>
        <option value='read' disabled> Read </option >
        <option value='none'> None </option >
        </select>
        break;
      case 'none':
        dropDownElement =
        <select value={optionVal} onChange={e => this.props.typeReadingHandler(this.state,e) }>
        <option value='currentlyReading' > Currently Reading </option>
        <option value='wantToRead'> Want to Read </option>
        <option value='read'> Read </option >
        <option value='none' disabled> None </option >
          </select>
        break;

    }
    return (
      <div className="book-shelf-changer" >
        {dropDownElement}
      </div>
    )
  }

}

export default ReadOptions
