import { useState } from 'react'

const Button = ({item, funcToUpdate, text}) => {
  return (<button onClick={() => funcToUpdate(item + 1)}> {text} </button>)
}

const StatisticsLine = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>)
}

const Statistics = ({good, neutral, bad}) => {
  let combined = good + neutral + bad
  if(combined == 0) {
    return (<p>No Feedback Given</p>)
  }
  let score = good - bad
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good}/>
        <StatisticsLine text="neutral" value={neutral}/>
        <StatisticsLine text="bad" value={bad}/>
        <StatisticsLine text="combined" value={combined}/>
        <StatisticsLine text="average" value={score/combined}/>
        <StatisticsLine text="positive" value={(good/combined)*100 + "%"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1> give feedback </h1>
      <Button item={good} funcToUpdate={setGood} text="good"/>
      <Button item={neutral} funcToUpdate={setNeutral} text="neutral"/>
      <Button item={bad} funcToUpdate={setBad} text="bad"/>

      <h1> statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App