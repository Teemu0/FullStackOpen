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

export default Course