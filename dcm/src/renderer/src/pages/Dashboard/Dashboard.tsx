import { useUser } from '../../context/UserContext'
import './Dashboard.css'

function Dashboard(): JSX.Element {
  const { user } = useUser()

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.username}!</p>}
      {user && <p>Your serial number is {user.serialNumber}</p>}
    </div>
  )
}

export default Dashboard
