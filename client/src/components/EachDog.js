import React, { useCallback }  from 'react';
import Card from '@mui/material/Card'; 
import Grid from '@mui/material/Grid'; 
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import 'animate.css';

const EachDog = ({ dog, breeds, size, isDone, cb }) => {
    const {name, age, breed, gender} = dog

    var correct = Math.floor(Math.random() * 4) + 1;
    var options = []
    for (let i = 0; i < 4; i++) {
        if(i == correct) {
            options.push(breed)
        } else {
            var random = Math.floor(Math.random() * size) + 1;
            while(breeds[random] == breed || 
                options.find((item) => item.breed === breeds[random]) !== undefined) {
                random = Math.floor(Math.random() * size) + 1;
            }
            options.push(breeds[random])
        }
    } 

    const handleClick = useCallback(
        (breed) => {
          cb.onClick(breed);
        },
        [cb]
      );
    var image = ("./images/" + breed + ".png").replaceAll(" ","-").toLowerCase()
    return (
        <div class={isDone ? ("animate__animated animate__bounceOutLeft") : ("animate__animated animate__bounceInRight")}>
            <Card variant="outlined" sx={{ width: 900, p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8} md={8}>
                        <Grid item xs={12} md={12}>
                            <h3 style= {{textAlign: "center", fontSize: '30px'}}>
                                { name + "(" + age + " years old) " + gender } 
                            </h3>
                        </Grid>
                        <Grid item xs={12} md={12} style={{backgroundImage: `url(${image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height:'400px'}}/>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Stack spacing={6} sx={{ m: 8 }}>
                            {options.map((item) => (
                                <Fab variant="extended" onClick={() => { handleClick(item); }}>
                                    <p key={item}>{item}</p>
                                </Fab>
                            ))}
                        </Stack>
                        
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default EachDog