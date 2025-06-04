import Text from '../atoms/Text'

      const PayrollDetailItem = ({ label, value, type }) => {
        const colorClass = {
          default: 'text-surface-600',
          success: 'text-success',
          error: 'text-error',
          primary: 'text-white'
        }[type] || 'text-surface-600'

        const valueClass = {
          default: 'font-medium',
          success: 'font-semibold text-lg text-success',
          error: 'font-semibold text-lg text-error',
          primary: 'font-bold text-xl text-white'
        }[type] || 'font-medium'

        const itemBgClass = {
          success: 'bg-success/5 rounded-lg border border-success/20',
          error: 'bg-error/5 rounded-lg border border-error/20',
          primary: 'bg-gradient-primary rounded-lg text-white'
        }[type] || 'bg-white rounded-lg'

        return (
          <div className={`flex justify-between items-center p-3 ${itemBgClass}`}>
            <Text as="span" className={colorClass}>{label}:</Text>
            <Text as="span" className={valueClass}>₹{value.toLocaleString()}</Text>
          </div>
        )
      }

      export default PayrollDetailItem