import { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { getMembers } from '../services/memberService'

function Members() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await getMembers()
      setMembers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Members</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Role</th>
          </tr>
          </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="text-center border-b">
              <td className="p-3">{member.name}</td>
              <td className="p-3">{member.email}</td>
              <td className="p-3">{member.phone}</td>
              <td className="p-3">{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  )
}

export default Members