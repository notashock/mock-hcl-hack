import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Books from '../pages/Books'
import Members from '../pages/Members'
import Issues from '../pages/Issues'
import OverdueBooks from '../pages/OverdueBooks'
import AddBook from '../pages/AddBook'

import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Login />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books/add"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues"
          element={
            <ProtectedRoute>
              <Issues />
            </ProtectedRoute>
          }
        />

        <Route
          path="/overdue-books"
          element={
            <ProtectedRoute>
              <OverdueBooks />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes