import { StackNavigator } from 'react-navigation'
import Entry from 'app/components/screens/entry'
import Settings from 'app/components/screens/settings'
import Basic from 'app/components/screens/basic'
import Equation from 'app/components/screens/eq'

const Routes = StackNavigator(
  {
    Entry: { screen: Entry },
    Settings: { screen: Settings },
    Basic: { screen: Basic },
    Equation: { screen: Equation },
  },
  {
    index: 0,
    initialRouteName: 'Entry',
    headerMode: 'none',
  },
)

export default Routes
