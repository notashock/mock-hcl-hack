import { Link, useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const email =
    localStorage.getItem("email");

  const role =
    localStorage.getItem("role");

  // Logout
  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Top Section */}
      <div className="bg-white p-8 rounded-2xl shadow-md mb-8">

        <h1 className="text-4xl font-bold mb-4">
          Welcome
        </h1>

        <p className="text-2xl text-gray-700">
          Email: {email}
        </p>

        <p className="text-2xl text-gray-700 mt-2">
          Role: {role}
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Books */}
        <Link to="/books">

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">

            <h2 className="text-3xl font-bold mb-4">
              Books
            </h2>

            <p className="text-gray-600 text-xl">
              View and manage books
            </p>

          </div>

        </Link>

        {/* ADMIN ONLY */}
        {role === "ADMIN" && (

          <>
          {/* Add Book */}
<Link to="/add-book">

  <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">

    <h2 className="text-3xl font-bold mb-4">
      Add Book
    </h2>

    <p className="text-gray-600 text-xl">
      Add new books
    </p>

  </div>

</Link>
            {/* Members */}
            <Link to="/members">

              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">

                <h2 className="text-3xl font-bold mb-4">
                  Members
                </h2>

                <p className="text-gray-600 text-xl">
                  View all members
                </p>

              </div>

            </Link>

            {/* Issue Book */}
            <Link to="/issue">

              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">

                <h2 className="text-3xl font-bold mb-4">
                  Issue Book
                </h2>

                <p className="text-gray-600 text-xl">
                  Issue books to members
                </p>

              </div>

            </Link>
          </>

        )}

        {/* USER + ADMIN */}
        <Link to="/return">

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">

            <h2 className="text-3xl font-bold mb-4">
              Return Book
            </h2>

            <p className="text-gray-600 text-xl">
              Return issued books
            </p>

          </div>

        </Link>

      </div>

    </div>
  );
}

export default Dashboard;