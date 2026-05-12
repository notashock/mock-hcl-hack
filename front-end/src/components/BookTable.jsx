function BookTable({ books }) {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3">Title</th>
          <th className="p-3">Author</th>
          <th className="p-3">Price</th>
          <th className="p-3">Available</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book) => (
          <tr key={book.id} className="text-center border-b">
            <td className="p-3">{book.title}</td>
            <td className="p-3">{book.author}</td>
            <td className="p-3">₹{book.price}</td>
            <td className="p-3">
              {book.available ? 'Yes' : 'No'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    )
}

export default BookTable