import MainLayout from '../layouts/MainLayout'

function AddBook() {
  return (
    <MainLayout>
      <div className="bg-white p-6 rounded shadow max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add Book</h1>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Book Title"
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Author"
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="ISBN"
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Publisher"
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Publication Year"
            className="border p-3 rounded"
          />
        </div>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded">
          Add Book
        </button>
      </div>
    </MainLayout>
  )
}

export default AddBook