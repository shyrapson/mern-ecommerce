import axios from "axios"

const BASE_URL = "http://localhost:3000/api/v1"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzBmNWUyOTA1ODNlMmJiZTJiMTgzMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjQyNjcyMDAsImV4cCI6MTY2Njg1OTIwMH0.FhWyMk182urcP9iKtGotWsFFUdWAF3ymz443Q1A2Je4"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{Authorization:`Bearer ${TOKEN}`} ,

})