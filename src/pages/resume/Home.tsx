import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="home-headline">Build a Resume That Gets Read.</h1>
        <button className="home-cta" onClick={() => navigate('/builder')}>
          Start Building
        </button>
      </div>
    </div>
  )
}

export default Home
