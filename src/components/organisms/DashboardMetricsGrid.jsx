import MetricCard from '../molecules/MetricCard'

      const DashboardMetricsGrid = ({ metrics }) => {
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.title}
                {...metric}
                delay={index * 0.1}
              />
            ))}
          </div>
        )
      }

      export default DashboardMetricsGrid