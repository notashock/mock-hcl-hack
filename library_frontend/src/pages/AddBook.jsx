import { useState } from "react";
import API from "../api/axios";

function AddBook() {

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({

    title: "",
    author: "",
    isbn: "",
    publisher: "",
    edition: "",
    publicationYear: "",
    price: ""

  });

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });
  };

  // Add Book
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/books",
        formData
      );

      console.log(response.data);

      setMessage("Book Added Successfully");

      // Clear Form
      setFormData({

        title: "",
        author: "",
        isbn: "",
        publisher: "",
        edition: "",
        publicationYear: "",
        price: ""

      });

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.error ||
        "Failed To Add Book"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-4xl font-bold mb-6">
          Add Book
        </h1>

        {message && (

          <p className="mb-4 text-lg text-green-600">
            {message}
          </p>

        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          {/* Author */}
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          {/* ISBN */}
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          {/* Publisher */}
          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Edition */}
          <input
            type="text"
            name="edition"
            placeholder="Edition"
            value={formData.edition}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Publication Year */}
          <input
            type="number"
            name="publicationYear"
            placeholder="Publication Year"
            value={formData.publicationYear}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Add Book
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddBook;