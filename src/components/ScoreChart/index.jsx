import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import './style.scss'


function ScoreChart({ scoreData }) {

    const data = [{
        name: 'score',
        value: scoreData * 100
    }]

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