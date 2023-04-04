import Card from '@mui/material/Card'; 
import Grid from '@mui/material/Grid'; 
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import 'animate.css';

const EachDog = ({ dog, breeds, size, options, isDone, cb }) => {
    const {name, age, breed, gender, imageURL} = dog
    
    return (
        <div className = {"animate__animated" + 
                            (isDone ? (" animate__bounceOutLeft") : (" animate__bounceInRight"))}
            >
            <Card variant="outlined" sx={{ width: 900, p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8} md={8}>
                        <Grid item xs={12} md={12}>
                            <h3 style= {{textAlign: "center", fontSize: '30px'}}>
                                { name + "(" + age + " years old) " + gender } 
                            </h3>
                        </Grid>
                        <Grid item xs={12} md={12} style={{backgroundImage: `url(${imageURL})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height:'400px'}}/>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Stack spacing={6} sx={{ m: 8 }}>
                            {options.map((item) => (
                                <Fab variant="extended" onClick={() => { cb(item); }}>
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