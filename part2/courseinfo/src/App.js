

const Header = ({ course }) => <h1>{course}</h1>
  
const Content =({ course }) =>{
  console.log("from conctent", course)
  return(
    
    <p>{course.name} {course.exercises} </p>
  )
}

const Total = ({parts}) =>{
  const totalExercises = parts.reduce((sum, part) =>
    sum + part.exercises, 0 )
    console.log("total amount: ", totalExercises)

  return(
    <b>total of {totalExercises} exercises</b>
  )
}

const Course = ({ course }) =>{
  console.log("From Coures: ",course)
  const parts = course.parts
  console.log("parts from course", parts)
  return(
   <div>
     <Header course={course.name} />
      {parts.map(parts => 
        <Content key={parts.id} course={parts} />
      )}
    <Total parts={parts} />

   </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}
export default App