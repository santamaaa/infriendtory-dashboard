import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.js'
import Dashboard from './pages/Dashboard.js'
import Inventory from './pages/Inventory.js'
import Purchase from './pages/Purchase.js'
import Items from './pages/Items.js'
import Categories from './pages/Categories.js'
import Suppliers from './pages/Suppliers.js'

function App() {
  const PrivateRoute = ({ element }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    return isLoggedIn ? element : <Navigate to="/" />
  }

  return (
    <div className="grid place-items-center">
      <div className="w-full">
        <Router>
          <Routes>
            <Route path="/infriendtory-dashboard/" element={<Login />} />
            <Route path="/infriendtory-dashboard/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/infriendtory-dashboard/inventory" element={<PrivateRoute element={<Inventory />} />} />
            <Route path="/infriendtory-dashboard/purchase" element={<PrivateRoute element={<Purchase />} />} />
            <Route path="/infriendtory-dashboard/items" element={<PrivateRoute element={<Items />} />} />
            <Route path="/infriendtory-dashboard/categories" element={<PrivateRoute element={<Categories />} />} />
            <Route path="/infriendtory-dashboard/suppliers" element={<PrivateRoute element={<Suppliers />} />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App