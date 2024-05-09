import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import './style.scss'



function SessionsChart({ sessionsData }) {

    console.log(sessionsData.sessions)

    return (
        <article className="data-charts__card data-charts__sessions">
            <ResponsiveContainer width='100%' height='100%'>
                <h2>Durée moyenne des sessions</h2>
                
            </ResponsiveContainer>
        </article>

    )
}

export default SessionsChart