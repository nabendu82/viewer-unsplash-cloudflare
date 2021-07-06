import { useState, useEffect } from 'react'
import './App.css';

const getImages = async query => {
  const url = "https://unsplash-worker.theweb-dev.workers.dev"

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { 'Content-type': 'application/json'}
  })
  return resp.json()
}

function App() {
  const [query, setQuery] = useState("")
  const [images, setImages] = useState([])

  useEffect(() => {
    const initialSearch = async () => {
      const results = await getImages('Coding')
      setImages(results)
    }
    initialSearch()
  },[])

  const search = async event => {
    event.preventDefault();
    const results = await getImages(query)
    setImages(results)
  }

  const updateQuery = event => setQuery(event.target.value)

  return (
    <>
      <form className="flexContainer" onSubmit={search}>
        <label htmlFor="query"><h2>Image Search: </h2></label>
        <input id="query" type="text" className="inputStyle" value={query} onChange={updateQuery} placeholder="Search Image" />
        <button type="submit">Search</button>
      </form>
      <div className="imgContainer">
        {images.map(image => <a key={image.id} href={image.link} target="_blank">
          <img src={image.image} />
        </a>)}
      </div>
    </>
  );
}

export default App;
