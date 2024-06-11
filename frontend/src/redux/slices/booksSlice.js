import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import createBookWithID from "../../utils/createBookWithId"
import { setError } from "./errorSlice"

const initialState = {
  books: [],
  isLoadingViaAPI: false,
}

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      thunkAPI.dispatch(setError(error.message))
      // OPTION 1
      return thunkAPI.rejectWithValue(error)
      // OPTION 2
      // throw error
    }
  }
)

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload)
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      }
      //   const index = state.books.findIndex((book) => book.id === action.payload)
      //   if (index !== -1) {
      //     state.books.splice(index, 1)
      //   }
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite
        }
      })
      //   return state.map((book) =>
      //     book.id === action.payload
      //       ? { ...book, isFavorite: !book.isFavorite }
      //       : book
      //   )
    },
  },
  // 1 OPTION
  // extraReducers: {
  //   [fetchBook.pending]: (state) => {
  //     state.isLoadingViaAPI = true
  //   },
  //   [fetchBook.fulfilled]: (state, action) => {
  //     state.isLoadingViaAPI = false
  //     if (action.payload.title && action.payload.author) {
  //       state.books.push(createBookWithID(action.payload, "API"))
  //     }
  //   },
  //   [fetchBook.rejected]: (state) => {
  //     state.isLoadingViaAPI = false
  //   },
  // },

  // 2 OPTION

  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true
    })
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, "API"))
      }
    })
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false
    })
  },
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

// export const thunkFunction = async (dispatch, getState) => {
//   try {
//     const res = await axios.get("http://localhost:4000/random-book")
//     if (res?.data?.title && res?.data?.author) {
//       dispatch(addBook(createBookWithID(res.data, "API")))
//     }
//   } catch (error) {
//     console.log("Error fetching random book", error)
//   }
// }

export const selectBooks = (state) => state.books.books
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI

export default booksSlice.reducer
