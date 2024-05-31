import { useSelector } from "react-redux"

import "./BookList.css"

const BookList = () => {
  const books = useSelector((state) => state.books)
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.lenght === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <div className="book-info">
                {++index}. {book.title} by <strong>{book.author}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList
