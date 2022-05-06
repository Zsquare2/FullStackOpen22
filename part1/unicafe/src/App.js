import { useState } from 'react'

const Statistiscs = (props) =>(
  <div>{props.text} {props.value} {props.units}
  </div>
)

const Display = props =>(
   <div>{props.text} {props.value}
   </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (good + bad * -1) / total
  const positive = (good * 100 / total)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h2>statistics</h2>
      <Statistiscs value={good} text="good"/>
      <Statistiscs value={neutral} text="neutral"/>
      <Statistiscs value={bad} text="bad"/>
      <Statistiscs value={total} text="all" />
      <Statistiscs value={average} text="average " />
      <Statistiscs value={positive} text="positive" units="%"/>
    </div>
  )
}

export default App