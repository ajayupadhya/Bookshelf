import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    currentshelf: [],
    wantshelf: [],
    readshelf: []
  };

  select = (event, item) => {
    if (item.shelf === "currentlyReading") {
      let delet = this.state.currentshelf.filter(
        (book) => book.title !== item.title
      );
      this.setState({ currentshelf: delet });
    }
    if (item.shelf === "wantToRead") {
      let delet = this.state.wantshelf.filter(
        (book) => book.title !== item.title
      );
      this.setState({ wantshelf: delet });
    }
    if (item.shelf === "read") {
      let delet = this.state.readshelf.filter(
        (book) => book.title !== item.title
      );
      this.setState({ readshelf: delet });
    }
    
    let current = [];
    let want = [];
    let read = [];
    BooksAPI.update(item, event).then((json) => {
      current = json.currentlyReading;
      want = json.wantToRead;
      read = json.read;
      

      if (this.state.currentshelf.length < current.length) {
        BooksAPI.get(item.id).then((bookss) => {
          let add = this.state.currentshelf;
          add.push(bookss);
          this.setState({ currentshelf: add });
          
        });
      }

      if (this.state.wantshelf.length < want.length) {
        BooksAPI.get(item.id).then((bookss) => {
          let add = this.state.wantshelf;
          add.push(bookss);
          this.setState({ wantshelf: add });
          
        });
      }
      if (this.state.readshelf.length < read.length) {
        BooksAPI.get(item.id).then((bookss) => {
          let add = this.state.readshelf;
          add.push(bookss);
          this.setState({ readshelf: add });
          ;
        });
      }
    });
  };

 

  componentDidMount() {
    BooksAPI.getAll().then((book) => {
      this.setState({ books: book });

      let data = this.state.books.filter(
        (item) => item.shelf === "currentlyReading"
      );
      this.setState({ currentshelf: data });

      let data1 = this.state.books.filter(
        (item) => item.shelf === "wantToRead"
      );
      this.setState({ wantshelf: data1 });

      let data2 = this.state.books.filter((item) => item.shelf === "read");
      this.setState({ readshelf: data2 });
    });
  }

  render() {
    
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.currentshelf.map((item, i) => {
                      return (
                        <li key={i}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${
                                    item.imageLinks.thumbnail
                                  })`,
                                }}
                              />
                              <div className="book-shelf-changer">
                                <select
                                  value={item.shelf}
                                  onChange={(event) =>
                                    this.select(event.target.value, item)
                                  }
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">
                                    Want to Read
                                  </option>
                                  <option value="read"> Read </option>
                                  <option value="none"> None </option>
                                </select>
                              </div>
                            </div>

                            <div className="book-title"> {item.title} </div>
                            <div className="book-authors">{item.aurthors}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.wantshelf.map((item, i) => {
                      return (
                        <li key={i}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${
                                    item.imageLinks.thumbnail
                                  })`,
                                }}
                              />
                              <div className="book-shelf-changer">
                                <select
                                  value={item.shelf}
                                  onChange={(event) =>
                                    this.select(event.target.value, item)
                                  }
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">
                                    Want to Read
                                  </option>
                                  <option value="read"> Read </option>
                                  <option value="none"> None </option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title"> {item.title} </div>
                            <div className="book-authors">{item.aurthors}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.readshelf.map((item, i) => {
                      return (
                        <li key={i}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${
                                    item.imageLinks.thumbnail
                                  })`,
                                }}
                              />
                              <div className="book-shelf-changer">
                                <select
                                  value={item.shelf}
                                  onChange={(event) =>
                                    this.select(event.target.value, item)
                                  }
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">
                                    Want to Read
                                  </option>
                                  <option value="read"> Read </option>
                                  <option value="none"> None </option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title"> {item.title} </div>
                            <div className="book-authors">{item.aurthors}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
