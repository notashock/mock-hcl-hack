import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { getIssues, returnBook } from '../services/issueService'

function Issues() {
  const [issues, setIssues] = useState([])

  useEffect(() => {
    fetchIssues()
  }, [])

  const fetchIssues = async () => {
    try {
      const response = await getIssues()
      setIssues(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleReturnBook = async (issueId) => {
    try {
      await returnBook(issueId)
      fetchIssues()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Issues</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Issue ID</th>
            <th className="p-3">Book</th>
            <th className="p-3">Member</th>
            <th className="p-3">Issue Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id} className="text-center border-b">
              <td className="p-3">{issue.id}</td>
              <td className="p-3">{issue.book?.title}</td>
              <td className="p-3">{issue.member?.name}</td>
              <td className="p-3">{issue.issueDate}</td>
              <td className="p-3">{issue.status}</td>

              <td className="p-3">
                {issue.status === 'ISSUED' && (
                  <button onClick={() => handleReturnBook(issue.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  )
}

export default Issues