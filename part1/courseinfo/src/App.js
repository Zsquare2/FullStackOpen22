const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return(

    <div>
      <Header title={course.name} />
      
      <Content parts={course.parts} />
      
      <Total parts={course.parts} />


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


const Content = (parts) => {
  return (
    <div>
      <Part name={parts.parts[0].name} exercise={parts.parts[0].exercises}/>
      <Part name={parts.parts[1].name} exercise={parts.parts[1].exercises}/>
      <Part name={parts.parts[2].name} exercise={parts.parts[2].exercises}/>

    </div>
  )
}


const Total = (add) => {
  return(
    <p>Number of exercises {add.parts[0].exercises + add.parts[1].exercises + add.parts[2].exercises}</p>
  )
}

export default App
