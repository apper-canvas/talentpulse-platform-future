import {
        AlertTriangle, Bell, Calculator, Calendar, Clock, Construction, CreditCard,
        FileText, History, LayoutDashboard, Search, Save, TrendingDown, TrendingUp,
        User, UserPlus, Users, Zap
      } from 'lucide-react'

      const icons = {
        AlertTriangle, Bell, Calculator, Calendar, Clock, Construction, CreditCard,
        FileText, History, LayoutDashboard, Search, Save, TrendingDown, TrendingUp,
        User, UserPlus, Users, Zap
      }

      const AppIcon = ({ name, className = '' }) => {
        const IconComponent = icons[name]
        if (!IconComponent) {
          return null
        }
        return <IconComponent className={className} />
      }

      export default AppIcon