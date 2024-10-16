import LogoutButton from '../../components/LogOut/LogOut'
import { useUser } from '../../context/UserContext'
import './Dashboard.css'

function Dashboard(): JSX.Element {
  const { user } = useUser()

  return (
    <div className="dashboard-container">
      <LogoutButton />
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.username}!</p>}
      {user && <p>Your serial number is {user.serialNumber}</p>}
      {user && <p>Your last used mode is {user.lastUsedMode}</p>}
    </div>
  )
}

export default Dashboard
