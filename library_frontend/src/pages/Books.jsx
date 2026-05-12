import { useEffect, useState } from "react";
import API from "../api/axios";

function Books() {

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Books
  const fetchBooks = async () => {

    try {

      const response = await API.get("/books");

      setBooks(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-6">
        Books
      </h1>

      {loading ? (

        <p>Loading...</p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {books.map((book) => (

            <div
              key={book.id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >

              <h2 className="text-xl font-bold mb-2">
                {book.title}
              </h2>

              <p className="text-gray-700">
                Author: {book.author}
              </p>

              <p className="text-gray-700">
                ISBN: {book.isbn}
              </p>

              <p className="text-gray-700">
                Publisher: {book.publisher}
              </p>

              <p className="text-gray-700">
                Edition: {book.edition}
              </p>

              <p className="text-gray-700">
                Price: ₹{book.price}
              </p>

              <div className="mt-4">

                {book.available ? (

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Available
                  </span>

                ) : (

                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Issued
                  </span>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Books;