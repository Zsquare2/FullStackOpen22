import { useState } from 'react'

const Statistiscs = ({good, neutral, bad, total, average, positive}) =>{
  if (total === 0)
    return(
      <div>
        No feedback given
      </div>
    )
  return(
    <div>
      <p>
        good {good}<br />
        neutral {neutral} <br />
        bad {bad} <br />
        all {total} <br />
        average {average} <br />
        positive {positive} <br />
      </p>
    </div>
  ) 
}

// const Display = props =>(
//    <div>{props.text} {props.value}
//    </div>
// )

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
      <Statistiscs good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App