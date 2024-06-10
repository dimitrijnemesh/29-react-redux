import { useSelector, useDispatch } from "react-redux"
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs"

import "./BookList.css"
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators"
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice"

const BookList = () => {
  const books = useSelector((state) => state.books)
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handeToggleBook = (id) => {
    dispatch(toggleFavorite(id))
  }

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase())

    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase())

    const matchesOnlyFavorite = onlyFavoriteFilter ? book.isFavorite : true
    return matchesTitle && matchesAuthor && matchesOnlyFavorite
  })

  const highlightMatch = (text, filter) => {
    if (!filter) return text

    const regex = new RegExp(`(${filter})`, "gi")
    return text.split(regex).map((substring, index) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={index} className="highlight">
            {substring}
          </span>
        )
      }
      return substring
    })
  }

  console.log("dimasik")

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {filteredBooks.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, index) => (
            <li key={index}>
              <div className="book-info">
                {++index}. {highlightMatch(book.title, titleFilter)} by{" "}
                <strong>{highlightMatch(book.author, authorFilter)}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => handeToggleBook(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>

                <button type="button" onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList
