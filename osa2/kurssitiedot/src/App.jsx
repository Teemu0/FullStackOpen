const Header = (props) => {
  console.log('Header props', props)
  return (
    <h2>
      {props.courseName}
    </h2>
  )
}

const Content = (props) => {
  console.log('Content props', props)
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = (props) => {
  console.log('Part props', props)
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  console.log('Total props', parts)
  const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <b>
      Total of {totalAmount} exercises
    </b>
  )
}

const Course = (props) => {
  console.log("Course props", props)
  return (
    <div>
      <Header courseName={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
    
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  // Get each Course component
  const coursesOutput = courses.map((course) => <Course key={course.id} course={course} />)
  return (
    <div>
      <h1>Web development curriculum</h1>
      {coursesOutput}
    </div>
  )
}

export default App
