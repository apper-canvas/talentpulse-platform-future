const MetricValue = ({ value, className = '' }) => {
        return (
          <h3 className={`text-2xl sm:text-3xl font-bold text-surface-900 mb-1 ${className}`}>
            {value}
          </h3>
        )
      }

      export default MetricValue