// const devMode = process.env.NODE_ENV !== 'production'
// true en développement, false en production
const devMode = false


export const config = {
  apiUrl: 'http://localhost:3000',
  useMock: devMode  
}
