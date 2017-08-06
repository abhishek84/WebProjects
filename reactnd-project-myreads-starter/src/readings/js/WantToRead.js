import React from 'react'
import ReadOptions from '../../common/js/ReadOptions'
import '../../App.css'
import '../../common/css/Loading.css'


class WantToRead extends React.Component {
  state = {
    currReadState: false,
    wantToReadState: true,
    readState: false,
    noneState: false,
    value: 'wantToRead'
  }
  render() {
    return (

        <div className="bookshelf">
                    <h2 className="bookshelf-title">Want To Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.props.data.length !== 0  ?
                          this.props.data.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                                <ReadOptions typeReadingHandler = {this.props.readingHandler} book={book} cRflag={this.state.currReadState}
                                  wRflag={this.state.wantToReadState}
                                  rflag={this.state.readState} noneFlag={this.state.noneState} optionValue={this.state.value} params = 'home'/>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">
                                {book.authors}
                              </div>
                            </div>
                          </li>
                        )) : <div className="ld ld-ring ld-spin-fast huge"></div>}
                      </ol>
                  </div>
        </div>
    )
  }
}

export default WantToRead;
