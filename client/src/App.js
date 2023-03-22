import React, { useState, useEffect } from 'react';
import EachDog from './components/EachDog';
import Title from './components/Title';
import Score from './components/Score';
import Game from './components/Game';
import { fetchDogs } from "./api/dogs";


const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function App() {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [isStart, setStart] = useState(false);
  const [index, setIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [isDone, setDone] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getDogs = async() => {
      const dogs = await fetchDogs()
      setDogs(dogs)
      var breeds = []
      dogs.forEach(dog => {
        breeds.push(dog.breed)
      });
      setBreeds(breeds)
      instantiateDog(0, dogs)
    }
    getDogs()
  }, [])

  const handleButtonClick = async (breed) => {
    setDone(true)
    if(breed === dogs[index].breed) {
      setScore(score + 1)
    }
    await delay(1000);
    instantiateDog(index + 1, dogs)
    setDone(false)
  };

  const resetButtonClick = () => {
    setScore(0)
    setStart(false)
    instantiateDog(index + 1, dogs)
  }

  const populateOptions = (index, dogs) => {
    var correct = Math.floor(Math.random() * 4);
    var options = []
    var random = Math.floor(Math.random() * dogs.length);
    for (var i = 0; i < 4; i++) {
      if(i === correct) {
          options.push(dogs[index].breed)
      } else {    
          while(random === index) {
              random = (random + 1)  % dogs.length;
          }
          options.push(dogs[random].breed)
          random = (random + 1) % dogs.length
      }
    } 
    setOptions(options)
  }

  const instantiateDog = (index, dogs) => {
    setIndex(index)
    populateOptions(index, dogs)
  }

  const showEachDog = () => {
    return (
        dogs === null || breeds === null || index == -1 ? (
          <h1>loading</h1>
        ) : (
            <EachDog dog = {dogs[index]} 
                    breeds = {breeds} 
                    size = {breeds.length} 
                    options = {options} 
                    isDone = {isDone} 
                    cb = {handleButtonClick} />
        )
    )
  }
  return (
    <div className="App">
      <Title />
      <Score value = {score} />
      <Game isStart={isStart}
            showEachDog={showEachDog}
            setStart={setStart}
            resetButtonClick={resetButtonClick} />
    </div>
  );
}

export default App;
