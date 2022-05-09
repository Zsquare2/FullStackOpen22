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
  
  //new array for counting votes and function to update values in it 
  const[votes, setVotes] = useState(new Array(arrLength).fill(0))

  // function gets random number 
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
  }

  //use the Math.max method to get the max value in the array.
  const max = Math.max.apply(null, votes);

  //get the index of the last value, by using the Array.indexOf method.
  const mostVotesIndex = votes.indexOf(max);
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Button handleClicsk={newAnecdote} text="Dipsplay next"/>
      <Button handleClicsk={handleVote} text="vote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotesIndex]}
    </div>
  )
}

export default App