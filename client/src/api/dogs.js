import axios from 'axios'
const dogsURL = process.env.REACT_APP_BASE_URL + '/dogs'

//fetch dogs
export const fetchDogs = async() => {
    console.log(dogsURL)
    const res = axios.get(dogsURL).then(response => {
        return response.data.data
    }).catch(e =>  {
        return []
    })

    return res
}
