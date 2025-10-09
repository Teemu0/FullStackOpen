import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    const oldGood = good
    console.log('increasing, good before', oldGood)
    setGood(oldGood + 1)
  }

  const increaseNeutral = () => {
    const oldNeutral = neutral
    console.log('increasing, neutral before', oldNeutral)
    setNeutral(oldNeutral + 1)
  }

  const increaseBad = () => {
    const oldBad = bad
    console.log('increasing, bad before', oldBad)
    setBad(oldBad + 1)
  }

  return (
    <div>
      <h3>Give feedback</h3>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      <h3>Statistics</h3>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App
