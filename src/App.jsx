import { useEffect, useState } from 'react'
import './App.css'

// Read the API base URL from the environment (set per environment, never hard-coded)
const API = import.meta.env.VITE_API_URL

const SAMPLE_MENU = [
  { id: 1, name: 'Chicken Rice', price: 450 },
  { id: 2, name: 'Veggie Wrap', price: 350 },
  { id: 3, name: 'Iced Coffee', price: 200 },
]

function App() {
  const [menu, setMenu] = useState([])
  const [source, setSource] = useState('loading...')

  useEffect(() => {
    if (!API) {
      setMenu(SAMPLE_MENU)
      setSource('sample data (VITE_API_URL not set)')
      return
    }
    fetch(`${API}/api/menu`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data)
        setSource(`live API: ${API}`)
      })
      .catch(() => {
        setMenu(SAMPLE_MENU)
        setSource('sample data (API unreachable)')
      })
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>CampusEats</h1>
      <p><small>Data source: {source}</small></p>
      <ul>
        {menu.map((item) => (
          <li key={item.id}>{item.name}: Rs. {item.price}</li>
        ))}
      </ul>
    </div>
  )
}

export default App