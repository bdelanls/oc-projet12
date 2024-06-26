import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, YAxis, Rectangle } from 'recharts'
import './style.scss'

/**
 * Custom tooltip component for line chart.
 * @param {Object} props - Props containing tooltip data.
 * @param {boolean} active - Flag indicating whether the tooltip is active.
 * @param {Array} payload - The data payload for the tooltip.
 * @returns {JSX.Element|null} - A rendered tooltip component or null.
 */
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: '#fff', padding: '8px', fontSize: '10px'
            }}>
                <p>{`${payload[0].value} min`}</p>
            </div>
        )
    }
    return null
}

/**
 * Custom cursor component for line chart.
 * @param {Object} props - Props for custom cursor.
 * @param {Array} points - Points on the graph where the cursor intersects.
 * @param {number} width - Width of the custom cursor area.
 * @param {number} height - Height of the custom cursor area.
 * @returns {JSX.Element|null} - A rectangle representing the cursor or null.
 */
const CustomCursor = ({ points, width, height }) => {
    if (!points || points.length === 0) return null
    const { x } = points[0]
    return (
        <Rectangle
            fill="rgba(0, 0, 0, 0.1)" 
            x={x}
            y={0}
            width={width - x} 
            height={height}
        />
    )
}

/**
 * Component to display average session lengths over a week.
 * @param {Object} props - Component props.
 * @param {Array} props.sessionsData - Data for each day's session length.
 * @param {string} props.error - Error message if data could not be loaded.
 * @returns {JSX.Element} - Rendered line chart for session durations.
 */
function SessionsChart({ sessionsData, error }) {

    if (error) {
        return (
            <article className="data-charts__card data-charts__sessions">
                <div className="error-message">{error}</div>
            </article>
        )
    }

    // Mapping days of the week to session data
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    const formattedData = sessionsData.map(session => ({
        day: daysOfWeek[session.day - 1],
        sessionLength: session.sessionLength
    }))

    return (
        <article className="data-charts__card data-charts__sessions">
            <ResponsiveContainer width='100%' height='100%'>
                <h2>Durée moyenne des sessions</h2>
                <LineChart data={formattedData} margin={{ top: 60, right: 15, bottom: 10, left: 15 }}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} stroke='rgb(255, 255, 255, 0.6)'  />
                    <YAxis hide domain={['dataMin-15', 'dataMax+15']} />
                    <Tooltip content={<CustomTooltip />} cursor={<CustomCursor width={400} height={300} />} />
                    <Line type="natural" dataKey="sessionLength" stroke="#FFF" strokeWidth={2} dot={false} activeDot={{ fill: '#FFF', r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </article>

    )
}

export default SessionsChart