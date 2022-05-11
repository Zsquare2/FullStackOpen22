import React from "react"


const Header = ({ course }) =>{
    console.log("Header course", course)
    return(
        <div>
        <h2>{course.name}</h2>
        
        {course.parts.map(part => 
            <Content key={part.id} content={part} />
        )}
        
        <Total parts={course.parts} />

        </div>

    )
}

const Total = ({ parts }) =>{
    const totalExercises = parts.reduce((sum, part) =>
      sum + part.exercises, 0 )
    return(
    <b>total of {totalExercises} exercises</b>
        )
    }


const Content =({ content }) => <p>{content.name} {content.exercises}</p>



const Course= ({ courses }) => {
    console.log(courses);
    return(  
        <div>
        <h1>Web development curiculum</h1>
        {courses.map((course) =>
        <Header key={course.id} course={course} />

        )}
        </div>


    )
}


// const Total = ({parts}) =>{
//     const totalExercises = parts.reduce((sum, part) =>
//       sum + part.exercises, 0 )
//       console.log("total amount: ", totalExercises)


export default Course