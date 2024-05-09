import axios from 'axios'
import { config } from './config'
import mockData from '../MockData/mockData.json'

const fetchData = async (endpoint, userId) => {
  if (config.useMock) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = mockData.users[userId]  // Accès aux données mockées
        if (!mockResponse) {
          reject(new Error('User not found'))
        } else {
          // Adapter la structure des données mockées
          if (endpoint === '') {
            endpoint = 'userInfo'
          }  
          const adaptedMockData = mockResponse[endpoint] ? { data: mockResponse[endpoint] } : { data: mockResponse }
          resolve(adaptedMockData)
        }
      }, 1000)
    })
  } else {
    try {
      const response = await axios.get(`${config.apiUrl}/user/${userId}/${endpoint}`)
      return response.data
    } catch (error) {
      console.error('API call error:', error)
      throw error
    }
  }
}


export const getUserInfo = (userId) => fetchData('', userId) // Notez l'ajout de l'argument userId
export const getUserActivity = (userId) => fetchData('activity', userId)
export const getUserAverageSessions = (userId) => fetchData('averageSessions', userId)
export const getUserPerformance = (userId) => fetchData('performance', userId)
