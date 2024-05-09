import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserInfo, getUserActivity, getUserAverageSessions } from '../../services/apiService'
import KeyData from '../../components/KeyData'
import './style.scss'
import ActivityChart from '../../components/ActivityChart'
import SessionsChart from  '../../components/SessionsChart'

const Dashboard = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [activityData, setActivityData] = useState(null)
    const [sessionsData, setSessionsData] = useState(null)

    useEffect(() => {
        getUserInfo(id)
            .then(data => {
                if (data && data.data && data.data) {
                    setUser(data.data)
                } else {
                    console.log('Redirecting because user info is missing or invalid', data)
                    // navigate('/Erreur404', { replace: true })
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user info:', error)
                // navigate('/Erreur404', { replace: true })
            })

        getUserActivity(id)
            .then(data => {
                if (data && data.data && data.data) {
                    setActivityData(data.data)
                } else {
                    console.error('No activity data found for user ID:', id)
                }
            })
            .catch(error => {
                console.error('Error loading activity data:', error)
            })   
            
        getUserAverageSessions(id)
            .then(data => {
                if (data && data.data && data.data) {
                    setSessionsData(data.data)
                } else {
                    console.error('No sessions data found for user ID:', id)
                }
            })
            .catch(error => {
                console.error('Error loading sessions data:', error)
            })   

    }, [id, navigate])

    if (!user) {
        return <div>Chargement...</div>
    }

    const keyDataCards = [
        { type: 'caloriecount', number: `${user.keyData.calorieCount}kCal`, title: 'Calories', icon: 'energy' },
        { type: 'proteincount', number: `${user.keyData.proteinCount}g`, title: 'Protéines', icon: 'chicken' },
        { type: 'carbohydratecount', number: `${user.keyData.carbohydrateCount}g`, title: 'Glucides', icon: 'apple' },
        { type: 'lipidcount', number: `${user.keyData.lipidCount}g`, title: 'Lipides', icon: 'burger' }
    ]

    return (
        <main className="main__data">
            <section className="data-header">
                <h1 className="data-header__title">Bonjour <span className="data-header__title--firstname">{user.userInfos.firstName}</span></h1>
                <p className="data-header__text">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </section>
            <section className="data-charts">
                <ActivityChart activityData={activityData}/>
                {/* <article className="data-charts__card data-charts__sesions"></article> */}
                <SessionsChart sessionsData={sessionsData} />
                <article className="data-charts__card data-charts__performance"></article>
                <article className="data-charts__card data-charts__score"></article>
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