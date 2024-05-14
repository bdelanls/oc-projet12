import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import './style.scss'




function PerformanceChart({ performanceData, error }) {

    if (error) {
        return (
            <article className="data-charts__card data-charts__performance">
                <div className="error-message">{error}</div>
            </article>
        )
    }

    if (!performanceData) {
        return (
            <article className="data-charts__card data-charts__performance">
                <div className="error-message">Les données ne sont pas disponibles.</div>
            </article>
        )
    }

    const kindTranslations = {
        'cardio': 'Cardio',
        'energy': 'Énergie',
        'endurance': 'Endurance',
        'strength': 'Force',
        'speed': 'Vitesse',
        'intensity': 'Intensité'
    }

    const { kind, data } = performanceData

    const chartData = data
        .map(item => ({
            subject: kindTranslations[kind[item.kind.toString()]], // Accéder à la description de l'activité
            value: item.value,
            fullMark: 250 // Assurez-vous que cette valeur est adaptée à votre échelle maximale
        }))
        .reverse()

    return (
        <article className="data-charts__card data-charts__performance">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="70%" data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <PolarGrid stroke="#FFFFFF" radialLines={false} />
                    <PolarAngleAxis dataKey="subject" axisLine={false} stroke={false} tick={{ fill: '#FFFFFF' }} />
                    <PolarRadiusAxis tickCount={6} tick={false} axisLine={false} />
                    <Radar name="Performance" dataKey="value" fill="#FF0101" fillOpacity={0.7} />
                </RadarChart>
            </ResponsiveContainer>
        </article>
    )
}

export default PerformanceChart