import { useState, useEffect } from "react"
import axios from 'axios'
import './allIceCream.css'
import { Link } from 'react-router-dom'

function AllIceCream() {

  const [IceCream, setIceCream] = useState([])

  useEffect(() => {
    async function fetchIceCream() {
      const { data } = await axios.get('/api/IceCream')

      setIceCream(data)
    }

    fetchIceCream()

  }, [])


  console.log( IceCream )

  return <div className="IceCream-container">
    <h1>IceCream:</h1>
    {IceCream.map(c => <div key={c.id} className="IceCream">
      <Link to={`/${c.name}`}><h1>{c.name}</h1></Link>
    </div>)}
  </div>
}
 
export default AllIceCream