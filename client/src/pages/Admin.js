import React from "react";
import { useState, useEffect } from "react";
import { fetchDogs, addDog, deleteDog } from "../api/dogs";
import { PageLayout } from '../components/PageLayout';
import { useAuth0 } from '@auth0/auth0-react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { fetchAdmin } from '../api/admin';


export const Admin = () => {
  const [dogs, setDogs] = useState([]);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const checkIfAdmin = async (token) => {
    if ( token !== ""){
      const response = await fetchAdmin(token);
      setIsAdmin(response.status === 200);
      if (response.status != 200) {
        navigate("/"); // redirect to homepage if not admin
      }
      const getDogs = async() => {    
        const dogs = await fetchDogs()
        setDogs(dogs)
      }
  
      getDogs()
    }
    
  };

  const {
    getAccessTokenSilently
  } = useAuth0();

  const checkAuth = async() => {    
    const token = await getAccessTokenSilently();
    setToken(token)
    checkIfAdmin(token);  
  }

  useEffect(() => {
    checkAuth()
  }, []);

  const handleAddDog = async (name, age, gender, breed, image) => {
    const status = await addDog(token, name, age, gender, breed, image);
    console.log(status)
    if (status === 200) {
      const dogs = await fetchDogs()
      setDogs(dogs)
    }
  };

  const handleDeleteDog = async (id) => {
    const status = await deleteDog(token, id);
    if (status === 200) {
      const dogs = await fetchDogs()
      setDogs(dogs)
    }
  };
  if(!isAdmin) {
    return null;
  }
  return (
    <PageLayout>
    <div className="Admin" style = {{alignItems: "center", justifyContent:"center", display:"flex"}}>
      <div>
        <h1 style= {{textAlign: "center", fontSize: '60px', color: 'white'}}>Admin Page</h1>   
        <form encType="multipart/form-data" onSubmit={(e) => {
            e.preventDefault();
            handleAddDog(e.target.name.value, e.target.age.value, e.target.gender.value, e.target.breed.value, e.target.image.files[0]);
            e.target.reset();
        }}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="number" name="age" placeholder="Age" required />
            <select name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
            <input type="text" name="breed" placeholder="Breed" required />
            <input type="file" name="image" accept="image/*" required />
            <button type="submit">Add</button>
        </form>
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', mt: 2, ml: 20 }}>
            {dogs.map((dog) => (        
                <ListItem alignItems="flex-start" key={dog.id}>
                    <ListItemAvatar>
                        <Avatar alt="dog" src= {dog.imageURL} />
                    </ListItemAvatar>
                    <ListItemText
                    primary= {dog.name}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary">
                            {dog.age} years old ({dog.breed})
                        </Typography>
                        </React.Fragment>
                        
                    }
                    />
                <Button onClick={() => handleDeleteDog(dog.id)}>Delete</Button>
                </ListItem>
            ))}
        </List>
      </div>
    </div>
    </PageLayout>
  );
}