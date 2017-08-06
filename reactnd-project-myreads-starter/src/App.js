import React from 'react'
import './App.css'
import Search from './search/js/Search'
import Readings from './readings/js/Readings'
import {Link, Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     data:[]
  }


  render() {
    return (
      <div className="app" >
        <Route exact path="/" render ={() => (
          <div className="list-books">
          <div className="list-books-title">
              <h1 > Abhishek Reading History </h1>
          </div >
          <Readings/>
            <div className="open-search" >
               <Link to='/search' className='active'>Add a Book</Link>
            </div>
          </div>
        )}/>
      <Route path="/search" component={Search}/>
      </div>

    )
  }
}

export default BooksApp
