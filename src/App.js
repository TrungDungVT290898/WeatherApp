import React, { useState, useEffect } from 'react'
const api = {
  key: '023df829becf4d98ab4cae7d92175afe',
  base: 'https://api.openweathermap.org/data/2.5/weather?'
}
function App () {
  const [searchInput, setsearchInput] = useState('')
  const [searchCity, setsearchCity] = useState('')
  const [loading, setloading] = useState(false)
  const [weatherInfo, setWeatherInfo] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    const fetchWeather = async () => {
      if (!searchCity) return
      setloading(true)
      try {
        const url = `${api.base}q=${searchCity}&appid=${api.key}&units=metric`
        const response = await fetch(url)
        const data = await response.json()
        if (response.ok) {
          setWeatherInfo(
            `${data.name} ${data.sys.country}, temp:${data.main.temp}, wind: ${data.wind.speed}, ${data.weather[0].description}`
          )
          setErrorMessage('')
        } else {
          setErrorMessage(data.message)
        }
      } catch (error) {
        setErrorMessage(error.message)
      }
      setloading(false)
    }
    fetchWeather()
  }, [searchCity])

  const handleSubmit = e => {
    e.preventDefault()
    setsearchCity(searchInput)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='City'
          value={searchInput}
          onChange={e => {
            setsearchInput(e.target.value)
          }}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!errorMessage ? (
            <>{weatherInfo}</>
          ) : (
            <div style={{ color: 'red' }}>{errorMessage}</div>
          )}
        </>
      )}
    </>
  )
}

export default App
