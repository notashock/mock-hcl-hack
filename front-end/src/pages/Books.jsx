import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import BookTable from '../components/BookTable'

import { getBooks } from '../services/bookService'

function Books() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await getBooks()

      setBooks(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Books
        </h1>
      </div>

      <BookTable books={books} />
    </MainLayout>
  )
}

export default Books