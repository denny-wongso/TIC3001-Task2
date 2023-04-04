import axios from 'axios'
const dogsURL = process.env.REACT_APP_BASE_URL + '/dogs'

//fetch dogs
export const fetchDogs = async() => {
    const res = axios.get(dogsURL).then(response => {
        return response.data.data
    }).catch(e =>  {
        return []
    })
    return res
}

export const addDog = async(token, name, age, gender, breed, image) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("breed", breed);
    formData.append("image", image);
    const res = axios.post(dogsURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.status
    }).catch(e =>  {
        return []
    })
    return res
}

export const updateDog = async(token, id, body) => {
    const res = axios.put(dogsURL + `/${id}`, {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }, body).then(response => {
        return response.status
    }).catch(e =>  {
        return []
    })
    return res
}

export const deleteDog = async(token, id) => {
    const res = axios.delete(dogsURL + `/${id}`, {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.status
    }).catch(e =>  {
        return []
    })
    return res
}
