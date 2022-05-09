import { useState } from 'react'

const Button = ({handleClicsk, text}) =>(
  <p>
  <button onClick={handleClicsk}>
    {text}
  </button>
  </p>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  
  // arrays lenggt bcs used not once
  const arrLength = anecdotes.length
  
  //new array for counting vots 
  const[votes, setVotes] = useState(new Array(arrLength).fill(0))

  // finction gets random number 
  let getRandomInt = (max) =>(
    Math.floor(Math.random() * max)
  )

  //gets random number to pick anecdote
  const newAnecdote = () => {
    setSelected(getRandomInt(arrLength))
  }

  

  //handle votes
  const handleVote = () =>{
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log(copy)
  }

  

  return (
    <div>
      {anecdotes[selected]}
      <Button handleClicsk={newAnecdote} text="Dipsplay next"/>
      <Button handleClicsk={handleVote} text="vote" />

    </div>
  )
}

export default App