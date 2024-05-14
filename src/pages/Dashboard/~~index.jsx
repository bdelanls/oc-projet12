import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserInfo } from '../../services/apiService'
import './style.scss'







const Dashboard = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserInfo(id)
            .then(data => {
                if (data && data.data) {
                    setUser(data.data)
                } else {
                    navigate('/Erreur404', { replace: true })
                }
            })
            .catch(() => {
                navigate('/Erreur404', { replace: true })
            })
    }, [id, navigate])
    
    if (!user) {
        return <div>Chargement...</div>
    }




    return (
        <main className="main__data">
            <section className="data-header">
                <h1 className="data-header__title">Bonjour <span className="data-header__title--firstname"></span></h1>
                <p className="data-header__text">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </section>
            <section className="data-charts">

            </section>

            <section className="data-keydata">


            </section>
        </main>
    )
}

export default Dashboard