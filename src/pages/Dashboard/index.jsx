import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserInfo, getUserActivity, getUserAverageSessions, getUserPerformance } from '../../services/apiService'
import KeyData from '../../components/KeyData'
import './style.scss'
import ActivityChart from '../../components/ActivityChart'
import SessionsChart from  '../../components/SessionsChart'
import PerformanceChart from '../../components/PerformanceChart'
import ScoreChart from '../../components/ScoreChart'


const Dashboard = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [activityData, setActivityData] = useState(null)
    const [sessionsData, setSessionsData] = useState(null)
    const [performanceData, setPerformanceData] = useState(null)
    const [listErrors, setListErrors] = useState([])

    useEffect(() => {
        getUserInfo(id)
            .then(data => {
                if (data && data.data) {
                    setUser(data.data)
                } else {
                    console.log('Redirecting because user info is missing or invalid')
                    setListErrors(prevErrors => [...prevErrors, 'user info is missing or invalid'])
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user info:')
                setListErrors(prevErrors => [...prevErrors, 'Failed to fetch user info'])
            })

        getUserActivity(id)
            .then(data => {
                if (data && data.data) {
                    setActivityData(data.data)
                } else {
                    console.error('No activity data found for user ID:')
                }
            })
            .catch(error => {
                console.error('Error loading activity data:')
            })   
            
        getUserAverageSessions(id)
            .then(data => {
                if (data && data.data) {
                    setSessionsData(data.data)
                } else {
                    console.error('No sessions data found for user ID:')
                }
            })
            .catch(error => {
                console.error('Error loading sessions data:')
            })   

        getUserPerformance(id)
            .then(data => {
                if (data && data.data) {
                    setPerformanceData(data.data)
                } else {
                    console.error('No performance data found for user ID:')
                }
            })
            .catch(error => {
                console.error('Error loading performance data:')
            })     

    }, [id])

    console.log('error = ', listErrors)

    if (listErrors.length > 0) {
        return <div className='error-message'>Errors: {listErrors}</div>
    }

    if (!user) {
        return <div>Chargement...</div>
    }

    const keyDataCards = [
        { type: 'caloriecount', number: `${user.keyData.calorieCount} kCal`, title: 'Calories', icon: 'energy' },
        { type: 'proteincount', number: `${user.keyData.proteinCount} g`, title: 'Protéines', icon: 'chicken' },
        { type: 'carbohydratecount', number: `${user.keyData.carbohydrateCount} g`, title: 'Glucides', icon: 'apple' },
        { type: 'lipidcount', number: `${user.keyData.lipidCount} g`, title: 'Lipides', icon: 'burger' }
    ]

    const todayScore = () => user.todayScore ? user.todayScore : user.score


    return (
        <main className="main__data">
            <section className="data-header">
                <h1 className="data-header__title">Bonjour <span className="data-header__title--firstname">{user.userInfos.firstName}</span></h1>
                <p className="data-header__text">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </section>
            <section className="data-charts">
                <ActivityChart activityData={activityData}/>
                {/* <article className="data-charts__card data-charts__sesions"></article> */}
                <SessionsChart sessionsData={sessionsData.sessions} />
                {/* <article className="data-charts__card data-charts__performance"></article> */}
                <PerformanceChart performanceData={performanceData} />
                {/* <article className="data-charts__card data-charts__score"></article> */}
                <ScoreChart scoreData={todayScore()} />
            </section>
            {/* KEYDATA */}
            <section className="data-keydata">
                {keyDataCards.map(keyDataCard => (
                    <KeyData key={keyDataCard.type} type={keyDataCard.type} number={keyDataCard.number} title={keyDataCard.title} icon={keyDataCard.icon} />
                ))}
            </section>
        </main>
    )
}

export default Dashboard