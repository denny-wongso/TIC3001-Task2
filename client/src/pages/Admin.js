import React from "react";
import { useState, useEffect } from "react";
import { fetchDogs, addDog, deleteDog, updateDog } from "../api/dogs";
import { PageLayout } from '../components/PageLayout';
import { useAuth0 } from '@auth0/auth0-react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField  from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { fetchAdmin } from '../api/admin';

function getModalStyle() {
  const top = 50;
  const left = 50;
  const transform = `translate(-${top}%, -${left}%)`;

  return {
    position: 'absolute',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    top: `${top}%`,
    left: `${left}%`,
    transform: transform,
  };
}

export const Admin = () => {
  const [dogs, setDogs] = useState([]);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [selectedDog, setSelectedDog] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [image, setImage] = useState(null);
  const [modalStyle] = useState(getModalStyle);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };


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

  const handleOpenModal = (dog) => {
    setSelectedDog(dog);
    setOpen(true);
  };

  const handleUpdateDog = async () => {
    const sName = name == "" ? selectedDog.name : name
    const sAge = age == "" ? selectedDog.age : age
    const sGender = gender == "" ? selectedDog.gender : gender
    const sBreed = breed == "" ? selectedDog.breed : breed
    const sImage = image == "" ? selectedDog.imageURL : image
    const status = await updateDog(token, selectedDog.id, sName, sAge, sGender, sBreed, sImage);
    if (status === 200) {
      const dogs = await fetchDogs()
      setDogs(dogs)
    }
    handleClose()
  };

  const handleClose = () => {
    setSelectedDog(null);
    setOpen(false);
  };

  return (
    <PageLayout>
    <div>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="edit-dog-modal-title"
          aria-describedby="edit-dog-modal-description"
        >
          <Box sx={modalStyle}>
            <h2 id="edit-dog-modal-title">Edit Dog</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateDog();
              }}
            >
              <TextField
                id="edit-dog-name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                defaultValue={selectedDog ? selectedDog.name : ''}
                onChange={handleNameChange}
                sx={{mb: 5}}
              />
              <TextField
                id="edit-dog-age"
                label="Age"
                variant="outlined"
                type="number"
                fullWidth
                required
                defaultValue={selectedDog ? selectedDog.age : ''}
                onChange={handleAgeChange}
                sx={{mb: 5}}
              />
              <TextField
                id="edit-dog-gender"
                select
                label="Gender"
                variant="outlined"
                fullWidth
                required
                defaultValue={selectedDog ? selectedDog.gender : ''}
                onChange={handleGenderChange}
                sx={{mb: 5}}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
              <TextField
                id="edit-dog-breed"
                label="Breed"
                variant="outlined"
                fullWidth
                required
                defaultValue={selectedDog ? selectedDog.breed : ''}
                onChange={handleBreedChange}
                sx={{mb: 5}}
              />
              <TextField
                id="edit-dog-image"
                type="file"
                accept="image/*"
                fullWidth
                onChange={handleImageChange}
                sx={{mb: 5}}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
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
                      primary= {
                        <React.Fragment>
                          <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              color="text.primary">
                              {dog.name} ({dog.gender})
                          </Typography>
                        </React.Fragment>}
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
                  <Button onClick={() => handleOpenModal(dog)}>Edit</Button>
                  </ListItem>
              ))}
          </List>
        </div>
      </div>
    </div>
    </PageLayout>
  );
}