import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 overflow-y-auto bg-gray-100 flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout