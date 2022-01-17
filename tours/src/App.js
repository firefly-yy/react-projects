import React,{useState,useEffect} from "react"
import './App.css';
import Tours from "./Tours"
import Loading from './Loading'

const url = 'https://course-api.com/react-tours-project'

function App() {
  const [isLoading,setIsLoading] = useState(true);
  const [tours, setTours] = useState([])
  
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }
  
  const fetchTours = async () => {
    setIsLoading(true);
    try{
      const response = await fetch(url)
      const tours = await response.json()
      setIsLoading(false)
      setTours(tours)
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTours();
  },[])

  if(isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if(tours.length === 0) {
    return (
      <main>
        <div className="second-title">
          <h2>no tours left</h2>
          <button className="refresh-btn" onClick={() => fetchTours()}>refresh</button>
        </div>
      </main>
    )
  }
  return (
    <div className='app'>
      <div className='title'>
        <h2>Our Tours</h2>
        <div className="underline"></div>
      </div>
      <Tours tours={tours} removeTour={removeTour} />
    </div>
  )
}

export default App;
