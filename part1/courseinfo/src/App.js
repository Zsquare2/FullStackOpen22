const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return(
    <div>
      <Header title={course} />
      <Content name1={part1.name} exercise1={part1.exercises}
                name2={part2.name} exercise2={part2.exercises}
                name3={part3.name} exercise3={part3.exercises}/>
      <Total exercises1={part1.exercises} 
              exercises2={part2.exercises} 
              exercises3={part3.exercises}/>


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


const Part = (props) =>{
  return(
    <p>
      {props.name} {props.exercise}
    </p>
  )
}


const Content = (props) => {
  return (
    <div>
      <Part name={props.name1} exercise={props.exercise1}/>
      <Part name={props.name2} exercise={props.exercise2}/>
      <Part name={props.name3} exercise={props.exercise3}/>

    </div>
  )
}


const Total = (add) => {
  return(
    <p>Number of exercises {add.exercises1 + add.exercises2 + add.exercises3}</p>
  )
}

export default App
