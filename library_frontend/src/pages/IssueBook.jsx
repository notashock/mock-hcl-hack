import { useEffect, useState } from "react";
import API from "../api/axios";

function IssueBook() {

  const [members, setMembers] = useState([]);

  const [books, setBooks] = useState([]);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    memberId: "",
    bookId: "",
  });

  // Fetch Members
  const fetchMembers = async () => {

    try {

      const response = await API.get("/members");

      setMembers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // Fetch Available Books
  const fetchBooks = async () => {

    try {

      const response = await API.get(
        "/books/available"
      );

      setBooks(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchMembers();
  
    fetchBooks();

  }, []);

  // Handle Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Issue
  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(formData);
    try {

      const response = await API.post(
        "/issues/issue",
        formData
      );

      console.log(response.data);

      setMessage("Book Issued Successfully");

      // Refresh Books
      fetchBooks();

    } catch (error) {

      setMessage(
        error.response?.data?.error ||
        "Issue Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-3xl font-bold mb-6">
          Issue Book
        </h1>

        {message && (
          <p className="mb-4 text-sm text-red-500">
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Select Member */}
          <select
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          >

            <option value="">
              Select Member
            </option>

            {members.map((member) => (

              <option
                key={member.id}
                value={member.id}
              >
                {member.name}
              </option>

            ))}

          </select>

          {/* Select Book */}
          <select
            name="bookId"
            value={formData.bookId}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          >

            <option value="">
              Select Book
            </option>

            {books.map((book) => (

              <option
                key={book.id}
                value={book.id}
              >
                {book.title}
              </option>

            ))}

          </select>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Issue Book
          </button>

        </form>

      </div>

    </div>
  );
}

export default IssueBook;