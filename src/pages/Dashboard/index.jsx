import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserInfo, getUserActivity, getUserAverageSessions, getUserPerformance } from '../../services/apiService'
import KeyData from '../../components/KeyData'
import './style.scss'
import ActivityChart from '../../components/ActivityChart'
import SessionsChart from  '../../components/SessionsChart'
import PerformanceChart from '../../components/PerformanceChart'
import ScoreChart from '../../components/ScoreChart'


/**
 * Dashboard page component that displays user data and charts related to their physical activities.
 * Utilizes user ID from URL parameters to fetch and display data.
 */
const Dashboard = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [activityData, setActivityData] = useState({ sessions: [] })
    const [sessionsData, setSessionsData] = useState({ sessions: [] })
    const [performanceData, setPerformanceData] = useState(null)
    
    const [sessionError, setSessionError] = useState('')
    const [performanceError, setPerformanceError] = useState('')
    const [activityError, setActivityError] = useState('')

    useEffect(() => {
        // Fetching user information and handling possible redirection if data is invalid or missing.
        getUserInfo(id)
            .then(data => {
                if (data && data.data) {
                    setUser(data.data)
                } else {
                    console.log('Redirecting because user info is missing or invalid')
                    navigate('/Erreur404', { replace: true })
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user info:')
                navigate('/Erreur404', { replace: true })
            })

        /// Additional fetches for activity, sessions, and performance data
        // Similar pattern with error handling for each type of data
        getUserActivity(id)
            .then(data => {
                if (data && data.data) {
                    setActivityData(data.data)
                    setActivityError('')
                } else {
                    console.error('No activity data found for user ID:')
                    setActivityError('Aucune donnée d\'activité disponible.')
                }
            })
            .catch(error => {
                console.error('Error loading activity data:')
                setActivityError('Erreur lors du chargement des données d\'activité.')
            })   
            
        getUserAverageSessions(id)
            .then(data => {
                if (data && data.data) {
                    setSessionsData(data.data)
                    setSessionError('')
                } else {
                    console.error('No sessions data found for user ID:')
                    setSessionError('Aucune donnée de session disponible.')
                }
            })
            .catch(error => {
                console.error('Error loading sessions data:')
                setSessionError('Erreur lors du chargement des données de session.')
            })   

        getUserPerformance(id)
            .then(data => {
                if (data && data.data) {
                    setPerformanceData(data.data)
                    setPerformanceError('')
                } else {
                    console.error('No performance data found for user ID:')
                    setPerformanceError('Aucune donnée de performance disponible.')
                }
            })
            .catch(error => {
                console.error('Error loading performance data:')
                setPerformanceError('Erreur lors du chargement des données de performance.')
            })     

    }, [id, navigate])



    if (!user) {
        return <div>Chargement...</div>
    }

    // Key data cards prepared for rendering, using data from user state.
    const keyDataCards = [
        { type: 'caloriecount', number: `${user.keyData.calorieCount} kCal`, title: 'Calories', icon: 'energy' },
        { type: 'proteincount', number: `${user.keyData.proteinCount} g`, title: 'Protéines', icon: 'chicken' },
        { type: 'carbohydratecount', number: `${user.keyData.carbohydrateCount} g`, title: 'Glucides', icon: 'apple' },
        { type: 'lipidcount', number: `${user.keyData.lipidCount} g`, title: 'Lipides', icon: 'burger' }
    ]

    // The calculated score is used to determine user achievements and feedback.
    const todayScore = () => user.todayScore ? user.todayScore : user.score


    return (
        <main className="main__data">
            <section className="data-header">
                <h1 className="data-header__title">Bonjour <span className="data-header__title--firstname">{user.userInfos.firstName}</span></h1>
                <p className="data-header__text">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </section>
            <section className="data-charts">
                {activityData && <ActivityChart activityData={activityData.sessions} error={activityError} /> }
                {sessionsData && <SessionsChart sessionsData={sessionsData.sessions} error={sessionError} /> }
                {performanceData && <PerformanceChart performanceData={performanceData} error={performanceError} /> }
                <ScoreChart scoreData={todayScore()} />
            </section>
            <section className="data-keydata">
                {keyDataCards.map(keyDataCard => (
                    <KeyData key={keyDataCard.type} type={keyDataCard.type} number={keyDataCard.number} title={keyDataCard.title} icon={keyDataCard.icon} />
                ))}
            </section>
        </main>
    )
}

export default Dashboard