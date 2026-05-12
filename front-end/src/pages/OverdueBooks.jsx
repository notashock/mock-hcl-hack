import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { getOverdueBooks } from '../services/issueService'

function OverdueBooks() {
  const [overdueBooks, setOverdueBooks] = useState([])

  useEffect(() => {
    fetchOverdueBooks()
  }, [])

  const fetchOverdueBooks = async () => {
    try {
      const response = await getOverdueBooks()
      setOverdueBooks(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Overdue Books
      </h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Book</th>
            <th className="p-3">Member</th>
            <th className="p-3">Issue Date</th>
            <th className="p-3">Due Date</th>
          </tr>
        </thead>

        <tbody>
          {overdueBooks.map((issue) => (
            <tr
              key={issue.id}
              className="text-center border-b"
            >
              <td className="p-3">
                {issue.book?.title}
              </td>

              <td className="p-3">
                {issue.member?.name}
              </td>

              <td className="p-3">
                {issue.issueDate}
              </td>

              <td className="p-3">
                {issue.dueDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  )
}

export default OverdueBooks