import { useState } from 'react'

const Button = ({item, funcToUpdate, text}) => {
  return (<button onClick={() => funcToUpdate(item + 1)}> {text} </button>)
}

const StatisticsLine = ({text, value}) => {
  return (<p>{text} {value}</p>)
}

const Statistics = ({good, neutral, bad}) => {
  let combined = good + neutral + bad
  if(combined == 0) {
    return (<p>No Feedback Given</p>)
  }
  let score = good - bad
  return (
    <div>
      {/* <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {combined} </p>
      <p>average {score/combined}</p>
      <p>positive {(good/combined)*100} %</p> */}

      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="combined" value={combined}/>
      <StatisticsLine text="average" value={score/combined}/>
      <StatisticsLine text="positive" value={(good/combined)*100 + "%"}/>
    </div>
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