import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="text">
        Welcome to <span className="react">Heartflow</span>
      </div>
      <p className="tip">
        Empowering confidence and precision in pacemaker management.
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Log In Existing User
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Sign Up New User
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
