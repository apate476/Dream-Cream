import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios"
function SingleIceCream() {

  const params = useParams()
  const icecreamName = params.icecream

  const [icecream, setIceCream] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchSingleIceCream() {
      try {
        const { data } = await axios.get(`/api/icecream/${icecreamName}`)

        setIceCream(data)
      } catch (err) {
        setError('No icecream found with that name, ' + icecreamName)

      }
    }

    fetchSingleIceCream()
  }, [])


  console.log('Single IceCream:', icecream)

  if (error) {
    return <>{error}</>
  }


  return <div className="single-icecream-container">
    <h1>{icecream.flavor}</h1>
    <h3>{icecream.description}</h3>
    <img src={icecream.imageUrl} />
    <p>$ {icecream.price}</p>
  </div>
}

export default SingleIceCream