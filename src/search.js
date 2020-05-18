import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

export default class Search extends Component {
  state = {
    books: [],
    query: ""
  };

  searchbook = (query) => {
    let q = query;
    this.setState({
      query: q,
    });
    if (q.length > 0) {
      
      let newbook = [];
      BooksAPI.search(q).then((books) => {
        if (books.length > 0) {
          books.map((book) => {
            return BooksAPI.get(book.id).then((b) => {
              newbook.push(b);
              this.setState({ books: newbook });
            });
          });
        } else this.setState({ books: [] });
      });
    }
    else 
    {this.setState({ books : []})}
    }


  select = (event, item) => {
    BooksAPI.update(item, event).then((json) => {
      console.log(json);
    });
  };

  

  render() {
    const showresult =
    this.state.query === ""
      ? this.state.books 
      : this.state.books.filter((e) => {
          return e.title
            .toLowerCase()
            .includes(this.state.query.toLowerCase());
        });
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search"> Close </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => {
                this.searchbook(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.books.length === 0 ? <div> Search Books to read</div> :
              showresult.map((item, i) => {
                return (
                  <div className="book" key={i}>
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            item.imageLinks.smallThumbnail
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
                          <option value="wantToRead"> Want to Read </option>
                          <option value="read"> Read </option>
                          <option value="none"> None </option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title"> {item.title} </div>
                    <div className="book-authors"> {item.authors} </div>
                  </div>
                );
              })
            }
          </ol>
        </div>
      </div>
    );
  }
}
