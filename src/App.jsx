import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import FormInput from './components/FormInput'
import ThankYou from './components/ThankYou';

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const[name, setName] = useState('JANE APPLESEED');
  const[number, setNumber] = useState('0000 0000 0000 0000');
  const[month, setMonth] = useState('00');
  const[year, setYear] = useState('00');
  const[cvc, setCvc] = useState('000');

  function test(){
    const invalidText = name.contains(/(.{4})/g, '$1 ')
    if(invalidText){
      console.log("Text Not Valid")
    }
  }

  useEffect(() => {
    console.log("effect ran")
}, [name, number, month, year, cvc, isClicked])

  return (
    <div className='App'>
      <Card
        name={name} 
        number={number}
        month={month}
        year={year}
        cvc={cvc}
        
      />
      {!isClicked ? 
        <FormInput
          test={test}
          setName={setName}
          setNumber={setNumber}
          setMonth={setMonth}
          setYear={setYear}
          setCvc={setCvc}
          name={name} 
          month={month}
          year={year}
          cvc={cvc}
          setclicked={setIsClicked}
      /> :
      <ThankYou />
    }
    </div>
    
  )
}

export default App
