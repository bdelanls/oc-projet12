import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './style.scss'

/**
 * Calculates the range for a given data set and key.
 * @param {Array} data - The array of data objects.
 * @param {string} key - The key in data objects to calculate the range for.
 * @param {number} valAdd - Value to add to the maximum of the range.
 * @param {number} valSub - Value to subtract from the minimum of the range.
 * @returns {Object} - An object containing min and max values.
 */
const getDataRange = (data, key, valAdd, valSub) => {
    const values = data.map(item => item[key])
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    return {
        min: minValue - valSub,
        max: maxValue + valAdd
    }
}

/**
 * Calculates evenly distributed ticks between min and max values.
 * @param {number} min - Minimum value of the range.
 * @param {number} max - Maximum value of the range.
 * @param {number} numTicks - Number of ticks to generate.
 * @returns {Array<number>} - An array of tick values.
 */
const calculateTicks = (min, max, numTicks) => {
    const range = max - min
    const interval = range / (numTicks - 1)
    let ticks = []
    for (let i = 0; i < numTicks; i++) {
        ticks.push(min + i * interval)
    }
    return ticks
}

/**
 * Custom legend component for the BarChart.
 * @param {Object} props - Props passed to the component.
 * @returns {JSX.Element} - A rendered legend component.
 */
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

/**
 * Custom tooltip for displaying data values in the BarChart.
 * @param {Object} props - Props containing tooltip data.
 * @returns {JSX.Element|null} - A rendered tooltip or null if not active.
 */
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

/**
 * Formats date strings to French date format.
 * @param {string} date - The date string to format.
 * @returns {string} - Formatted date string.
 */
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    })
}

/**
 * Main component for displaying activity data in a bar chart.
 * @param {Object} props - Props containing activity data and any error messages.
 * @returns {JSX.Element} - A responsive bar chart or an error message.
 */
function ActivityChart({ activityData, error }) {

    if (error) {
        return (
            <article className="data-charts__card data-charts__activity">
                <div className="error-message">{error}</div>
            </article>
        )
    }

    const weightRange = getDataRange(activityData, 'kilogram', 3, 3)
    const calorieRange = getDataRange(activityData, 'calories', 50, 50)
    const ticks = calculateTicks(weightRange.min, weightRange.max, 3)

    return (
        <article className="data-charts__card data-charts__activity">
            <ResponsiveContainer width='100%' height='100%'>
                <h2>Activité quotidienne</h2>
                <BarChart
                    width={600}
                    height={200}
                    data={activityData}
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