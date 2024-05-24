import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import './style.scss'


/**
 * Component to display a radial bar chart representing a score as a percentage of a goal.
 * @param {Object} props - Component props.
 * @param {number} props.scoreData - The score as a fraction (e.g., 0.7 for 70%).
 * @returns {JSX.Element} - Rendered component for the score chart.
 */
function ScoreChart({ scoreData }) {
    // Prepare the data for the RadialBarChart
    const data = [{
        name: 'score',
        value: scoreData * 100 // Convert fractional score to percentage
    }]

    // Calculate the end angle based on the score to create a complete circle animation
    const endAngle = 90 + (360 * scoreData)

    return (
        <article className="data-charts__card data-charts__score">
            <h2>Score</h2>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="80%"
                    startAngle={90}
                    endAngle={endAngle}
                    data={data}
                >
                    <RadialBar
                        minAngle={5}
                        closeWise={false}
                        dataKey="value"
                        cornerRadius={10}
                        barSize={12}
                        fill="#E60000"
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <div className='data-charts__score--legende'>
                <h3>{data[0].value}%</h3>
                <p>de votre objectif</p>
            </div>
        </article>
    )
}

export default ScoreChart