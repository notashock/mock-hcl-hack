import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">Library</h1>


      <ul className="space-y-4">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/books">Books</Link>
        </li>

        <li>
          <Link to="/members">Members</Link>
        </li>

        <li>
          <Link to="/issues">Issues</Link>
        </li>

        <li>
          <Link to="/overdue-books">Overdue Books</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar