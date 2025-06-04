import Input from '../atoms/Input'
      import Text from '../atoms/Text'

      const FormField = ({ label, id, ...props }) => {
        return (
          <div>
            <Text as="label" htmlFor={id} className="block text-sm font-medium text-surface-700 mb-2">
              {label}
            </Text>
            <Input id={id} {...props} />
          </div>
        )
      }

      export default FormField