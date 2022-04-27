const App = () => {
  const course = "Half Stack application development"
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
 
  return(
    <div>
      <Header title={course} />
      <Content name1={part1} exercise1={exercises1} name2={part2} exercise2={exercises2} name3={part3} exercise3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>

    </div>
    )
  }

const Header = (course) => {

  return (
    <div>
      <h1>{course.title}</h1>  
    </div>
    
  )
}


const Content = (part) => {


  return(
    <div>
      { <p>
        {part.name1} {part.exercise1}
      </p> }
      <p>
        {part.name2} {part.exercises2}
      </p>
      <p>
        {part.name3} {part.exercises3}
      </p>

    </div>
  )
}


const Total = (add) => {
  return(
    <p>Number of exercises {add.exercises1 + add.exercises2 + add.exercises3}</p>
  )
}




export default App
