import axios from 'axios'
import { config } from './config'
import mockData from '../MockData/mockData.json'

/**
 * Fetches data using an HTTP request based on the environment settings. 
 * It uses mocked data if in development mode and real API calls if in production.
 * @param {string} endpoint - The specific API endpoint for the request.
 * @param {number} userId - The ID of the user for whom data is requested.
 * @returns {Promise<Object>} - Promise resolved with fetched data or rejected with an error.
 */
const fetchData = async (endpoint, userId) => {
  if (config.useMock) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = mockData.users[userId]
        if (!mockResponse) {
          reject(new Error('User not found'))
        } else {
          if (endpoint === '') {
            endpoint = 'userInfo'
          }  
          const data = mockResponse[endpoint]
          if (!data) {
            reject(new Error(`Data for endpoint '${endpoint}' not found`))
          } else {
            const adaptedMockData = { data: data }
            resolve(adaptedMockData)
          }
        }
      }, 1000) // Simulated delay for fetching mock data.
    })
  } else {
    try {
      const response = await axios.get(`${config.apiUrl}/user/${userId}/${endpoint}`)
      if (endpoint === 'performance' && response.data && response.data.data) {
        return { data: response.data.data }
      }
      return response.data
    } catch (error) {
      console.error('API call error:', error)
      throw error
    }
  }
}

/**
 * Retrieves user information from the API or mocked data based on environment settings.
 * @param {number} userId - The user's ID.
 * @returns {Promise<Object>} - Promise with the user information, activity, session and performance data
 */
export const getUserInfo = (userId) => fetchData('', userId) 
export const getUserActivity = (userId) => fetchData('activity', userId)
export const getUserAverageSessions = (userId) => fetchData('average-sessions', userId)
export const getUserPerformance = (userId) => fetchData('performance', userId)
