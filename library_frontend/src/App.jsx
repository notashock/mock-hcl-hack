import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import IssueBook from "./pages/IssueBook";
import ReturnBooks from "./pages/ReturnBook";
import Members from "./pages/Members";
import AddBook from "./pages/AddBook";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route
    path="/"
    element={<Navigate to="/login" />}
  />

        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/Members"
          element={<Members />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

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
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issue"
          element={
            <ProtectedRoute>
              <IssueBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/return"
          element={
            <ProtectedRoute>
              <ReturnBooks />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;