import React, { useState, useEffect } from 'react';
import EachDog from './components/EachDog';
import { fetchDogs } from "./api/dogs"

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function App() {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [isStart, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isDone, setDone] = useState(false);



  useEffect(() => {
    const getDogs = async() => {
      const dogs = await fetchDogs()
      setDogs(dogs)
      var breeds = []
      dogs.forEach(dog => {
        breeds.push(dog.breed)
      });
      setBreeds(breeds)
      setIndex(0)
    }
    getDogs()
  }, [])

  const handleButtonClick = (breed) => {
    console.log(breed)
    setDone(true)
    if(breed === dogs[index].breed) {
      setScore(score + 1)
    }
    // await delay(1000);
    setIndex(index + 1)
    setDone(false)
  };

  return (
    <div className="App">
      <h1 style= {{textAlign: "center", fontSize: '100px'}}>Dog Breed</h1>
      <h1 style= {{textAlign: "center", fontSize: '100px'}}>SCORE: {score}</h1>

      <div style = {{alignItems: "center", justifyContent:"center", display:"flex"}}>
      {isStart == false ? (
         <button onClick={()=> setStart(true)}>START</button>
      ) : (
        <div>
          <EachDog dog = {dogs[index]} breeds = {breeds} size = {breeds.length} isDone = {isDone} onClick = {() => handleButtonClick} />
          <button onClick={()=> setStart(false)}>RESTART</button>
        </div>
      )}
      </div>
     
    </div>
  );
}

export default App;
