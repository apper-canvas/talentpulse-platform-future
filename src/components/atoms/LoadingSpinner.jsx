const LoadingSpinner = ({ className = 'h-12 w-12' }) => {
        return (
          <div className="flex items-center justify-center py-12">
            <div className={`animate-spin rounded-full ${className} border-b-2 border-primary`}></div>
          </div>
        )
      }

      export default LoadingSpinner