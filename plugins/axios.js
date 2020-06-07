import axios from 'axios'
console.log(process.env.baseUrl)
export default axios.create({
  baseURL: process.env.baseUrl || '/api'
})