import {createContext, useState} from "react";

export const BooksContext = createContext()

export const AppWrapper = ({ children }) => {
  const [books, setBooks] = useState([])

  return (
    <BooksContext.Provider value={{books, setBooks}}>
      {children}
    </BooksContext.Provider>
  )
}
