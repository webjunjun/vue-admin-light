import dashboardRoutes from './dashboard'
import systemRoutes from './system'
import aboutRoutes from './about'

const asyncRoutes = [
  ...dashboardRoutes,
  ...systemRoutes,
  ...aboutRoutes
]

export default asyncRoutes
