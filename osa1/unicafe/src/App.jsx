import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h3>Statistics</h3>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.total}</p>
        <p>average {props.average}</p>
        <p>positive {props.percentage} %</p>
    </div>
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

  const getTotal = () => {
    return (
      good + neutral + bad
    )
  }

  const getAverage = () => {
    if (getTotal() == 0) {
      return 0
    }
    return (
      (good * 1 + bad * (-1)) / getTotal()
    )
  }

  const getPosPercentage = () => {
    if (getTotal() == 0) {
      return 0
    }
    return (
      (good / getTotal()) * 100
    )
  }

  return (
    <div>
      <h3>Give feedback</h3>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={getTotal()} average={getAverage()} percentage={getPosPercentage()}/>
    </div>
  )
}

export default App
