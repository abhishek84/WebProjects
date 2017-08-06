import React from 'react'
import * as BooksAPI from '../../BooksAPI'

class Facade extends React.Component {

  fetchAllBooks = function() {
    return BooksAPI.getAll().then(response => {
      return response;
    })

  }

}

export default Facade;
