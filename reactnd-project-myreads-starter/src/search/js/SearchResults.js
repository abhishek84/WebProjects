import React from 'react'
import '../../App.css'
import ReadOptions from '../../common/js/ReadOptions'
import * as BooksAPI from '../../BooksAPI'


class SearchResults extends React.Component {
    state = {
      data: '',
      query: this.props.query,
      action:'init'
    }

    updateHandler = (state,event) => {
      let newVal = event.target.value
      let bookDetails = state.book

      BooksAPI.update(bookDetails, newVal).then(response => {
        console.log('Book Shelf for Book ' + bookDetails.title + ' Updated to ' + newVal)
        bookDetails.shelf = newVal
        const fnlBooks = this.state.data.map(function(book){
            if(book.id === bookDetails.id){
              return bookDetails
            }
            else{
              return book
            }
          })
        this.setState({
                  data:fnlBooks,
                  action:'update'
          })
      });
    }

    shouldComponentUpdate = (nextProps, nextState) => {
      // return a boolean value
      if(nextState.action === 'update'){
            return true
      }
      else {
        return this.state.query !== nextProps.query
      }
    }

    componentWillUpdate = (nextProps, nextState) => {
      // perform any preparations for an upcoming update
      let searchResponse;
      let fnlResponse;
      let getAllResponse;
      const newQuery = nextProps.query
      if (nextProps.query !== nextState.query) {
        BooksAPI.search(newQuery, 20).then(response => {
          searchResponse = response!==undefined?response.error === 'empty query' ? [] : response:[]
          BooksAPI.getAll().then(response => {
            getAllResponse = response !== undefined ? response : [];
            fnlResponse = searchResponse.length === 0? []:searchResponse.map(function(e) {
              for (let i = 0; i < getAllResponse.length; i++) {
                if (e.id === getAllResponse[i].id) {
                  return getAllResponse[i]
                }
              }
              e.shelf='none'
              return e
            })
            this.setState({
              data: fnlResponse,
              query: newQuery,
              action:'repeat'
            })
          })
        },function(data,error){
          console.log('Entering Search Error')
        })
      }
    }



    render() {
      return ( <div className="search-books-results" >
        <ol className="books-grid" > {
          this.state.data.length !== 0 ?
          this.state.data.map((book) =>
          (<li key={book.id} >
            <div className="book" >
            <div className="book-top" >
            <div className="book-cover"
            style={
              {
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }
            } > </div> <ReadOptions book={book}
            cRflag={
              book.shelf === 'currentlyReading' ? true : false
            }
            wRflag={
              book.shelf === 'wantToRead' ? true : false
            }
            rflag={
              book.shelf === 'read' ? true : false
            }
            noneFlag={
              book.shelf === 'none' ? true : false
            }
            optionValue={book.shelf}
            typeReadingHandler={this.updateHandler} params='search'/>
            </div> <div className="book-title" > {book.title} </div></div></li>
          )) : <div> No data matches your criteria </div>} </ol> </div>
        )
      }


    }

    export default SearchResults;
