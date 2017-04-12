export const TOGGLE_BOOKS = 'TOGGLE_BOOKS'
export const ADD_BOOK = 'ADD_BOOK'

export function toggleBooks() {
  return {
    type: TOGGLE_BOOKS
  }
}

export function addBook(){
  return {
    type: ADD_BOOK,
    book: {
      name: 'Rework',
      author: 'David Heinemeier Hansson'
    }
  }
}
