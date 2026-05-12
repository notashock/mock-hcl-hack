import { useEffect, useState } from "react";
import API from "../api/axios";

function ReturnBook() {

  const [issues, setIssues] = useState([]);

  const [message, setMessage] = useState("");

  // Fetch Active Issues
  const fetchIssues = async () => {

    try {

      const response = await API.get("/issues");

      // Active issued books only
      const activeIssues = response.data.filter(
        (issue) => issue.returnDate === null
      );

      setIssues(activeIssues);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Handle Return
  const handleReturn = async (issueId) => {

    try {

      await API.put(
        `/issues/return/${issueId}`
      );

      setMessage("Book Returned Successfully");

      // Refresh List
      fetchIssues();

    } catch (error) {

      setMessage(
        error.response?.data?.error ||
        "Return Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-6">
        Return Books
      </h1>

      {message && (
        <p className="mb-4 text-red-500">
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {issues.map((issue) => (

          <div
            key={issue.issueId}
            className="bg-white p-6 rounded-2xl shadow-md"
          >

            <h2 className="text-xl font-bold mb-2">
              {issue.book.title}
            </h2>

            <p>
              Member: {issue.member.name}
            </p>

            <p>
              Issue Date: {issue.issueDate}
            </p>

            <p>
              Due Date: {issue.dueDate}
            </p>

            <button
              onClick={() =>
                handleReturn(issue.issueId)
              }
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
            >
              Return Book
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ReturnBook;