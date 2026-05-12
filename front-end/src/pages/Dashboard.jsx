import MainLayout from '../layouts/MainLayout'

function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Total Books</h2>
          <p className="text-3xl mt-3">120</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Members</h2>
          <p className="text-3xl mt-3">50</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Issued Books</h2>
          <p className="text-3xl mt-3">25</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard