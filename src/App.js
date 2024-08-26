import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
      <Router basename="infriendtory-dashboard">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/inventory" element={<PrivateRoute element={<Inventory />} />} />
          <Route path="/purchase" element={<PrivateRoute element={<Purchase />} />} />
          <Route path="/items" element={<PrivateRoute element={<Items />} />} />
          <Route path="/categories" element={<PrivateRoute element={<Categories />} />} />
          <Route path="/suppliers" element={<PrivateRoute element={<Suppliers />} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
  )
}

export default App