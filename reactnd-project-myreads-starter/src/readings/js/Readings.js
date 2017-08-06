import React from 'react'
import CurrentRead from './CurrentRead'
import WantToRead from './WantToRead'
import Read from './Read'
import '../../App.css'
import * as BooksAPI from '../../BooksAPI'
import {
  readMapper
} from '../../common/js/Mapper'

class Readings extends React.Component {

  state = {
    currentReadData:'',
    wantToReadData: '',
    readData:'',
    books:''
  }

  componentDidMount() {
  BooksAPI.getAll().then(response => {
    const currentRead = readMapper(response, 'currentlyReading');
    const wantToRead = readMapper(response, 'wantToRead');
    const read = readMapper(response, 'read');

    this.setState(
      {
       currentReadData : currentRead,
       wantToReadData: wantToRead,
       readData: read,
       books:response
     })
  })
}

handleChange = (state,event) => {
  let prevVal = state.book.shelf
  let newVal = event.target.value
  let bookDetails = state.book
  bookDetails.shelf = newVal
  let books = this.state.books
  const fnlBooks = books.map(function(book){
      if(book.id === bookDetails.id){
        return bookDetails
      }
      else{
        return book
      }
    })

  BooksAPI.update(bookDetails, newVal).then(response => {
    const currentRead = readMapper(fnlBooks, 'currentlyReading');
    const wantToRead = readMapper(fnlBooks, 'wantToRead');
    const read = readMapper(fnlBooks, 'read');
      this.setState({
        currentReadData : currentRead,
        wantToReadData: wantToRead,
        readData: read,
        books:fnlBooks
      })
  });
}

  render() {
    return (
      <div className = "list-books-content" >
      <div >
      <CurrentRead readingHandler = {this.handleChange} data = {
       this.state.currentReadData
      }/>
      <WantToRead readingHandler = {this.handleChange} data = {
        this.state.wantToReadData
      }/>
      <Read readingHandler = {this.handleChange} data = {
        this.state.readData
      }/>
      </div >
    </div>
    )
  }

}

export default Readings
