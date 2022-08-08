import axios from 'axios'



const instance = axios.create({
    baseURL : 'http://localhost:5000/api/'
})

export default instance


// const instance = axios.create({
//     baseURL : 'https://mern-ecommerce-app-2022.herokuapp.com/api'
// })

// export default instance