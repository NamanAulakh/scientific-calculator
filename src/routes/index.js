import { StackNavigator } from 'react-navigation'
import Entry from 'app/components/screens/entry'
import Settings from 'app/components/screens/settings'

const Routes = StackNavigator(
  {
    Entry: { screen: Entry },
    Settings: { screen: Settings },
  },
  {
    index: 0,
    initialRouteName: 'Entry',
    headerMode: 'none',
  },
)

export default Routes
