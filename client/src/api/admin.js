import axios from 'axios'
const adminURL = process.env.REACT_APP_BASE_URL + '/admin'


export const fetchAdmin = async(token) => {
    const res = axios.get(adminURL, {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response
    }).catch(e =>  {
        return []
    })
    return res
}