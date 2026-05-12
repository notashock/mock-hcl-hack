import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'MEMBER',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
 const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerUser(formData)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        >
          <option value="MEMBER">Member</option>
          <option value="LIBRARIAN">Librarian</option>
        </select>
                <button className="w-full bg-blue-600 text-white py-3 rounded">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register