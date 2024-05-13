import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './style.scss'

const getDataRange = (data, key, valAdd, valSub) => {
    const values = data.map(item => item[key])
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    return {
        min: minValue - valSub,
        max: maxValue + valAdd
    }
}

const calculateTicks = (min, max, numTicks) => {
    const range = max - min
    const interval = range / (numTicks - 1)
    let ticks = []
    for (let i = 0; i < numTicks; i++) {
        ticks.push(min + i * interval)
    }
    return ticks
}

const CustomLegend = (props) => {
    const { payload } = props


    return (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ display: 'inline-block', marginLeft: 30 }}>
                    <svg height="10" width="10" style={{ marginRight: 10, verticalAlign: 'middle' }}>
                        <circle cx="5" cy="5" r="5" fill={entry.color} />
                    </svg>
                    <span style={{ color: '#74798C', verticalAlign: 'middle' }}>{entry.value}</span>
                </li>
            ))}
        </ul>
    )
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                textAlign: 'center',
                backgroundColor: '#E60000',
                color: '#FFFFFF',
                padding: '5px'
            }}>
                {payload.map((entry, index) => (
                    <p key={index} style={{ margin: 0, padding: '15px 5px', fontSize: '10px' }}>
                        {entry.value} {entry.name === 'Poids (kg)' ? 'kg' : 'kCal'}
                    </p>
                ))}
            </div>
        )
    }
    return null
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    })
}

function ActivityChart({ activityData }) {

    const weightRange = getDataRange(activityData.sessions, 'kilogram', 3, 3)
    const calorieRange = getDataRange(activityData.sessions, 'calories', 50, 50)
    const ticks = calculateTicks(weightRange.min, weightRange.max, 3)

    return (
        <article className="data-charts__card data-charts__activity">
            <ResponsiveContainer width='100%' height='100%'>
                <h2>Activité quotidienne</h2>
                <BarChart
                    width={600}
                    height={200}
                    data={activityData.sessions}
                    margin={{
                        top: 50, right: 0, left: 0, bottom: 0
                    }}
                    barGap={8}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" stroke="#9B9EAC" tickLine={false} tickFormatter={formatDate} tickMargin={12} />
                    <YAxis yAxisId="left" orientation="right" stroke="#9B9EAC" domain={[weightRange.min, weightRange.max]} axisLine={false} tickLine={false} ticks={ticks} />
                    <YAxis yAxisId="right" orientation="left" stroke="#9B9EAC" hide domain={[calorieRange.min, calorieRange.max]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} align="right" verticalAlign="top" wrapperStyle={{ top: 0, right: '10px', width: 'auto' }} />
                    <Bar yAxisId="left" dataKey="kilogram" fill="#282D30" barSize={7} radius={[3, 3, 0, 0]} name="Poids (kg)" />
                    <Bar yAxisId="right" dataKey="calories" fill="#E60000" barSize={7} radius={[3, 3, 0, 0]} name="Calories brûlées (kCal)" />
                </BarChart>
            </ResponsiveContainer>
        </article>

    )
}

export default ActivityChart