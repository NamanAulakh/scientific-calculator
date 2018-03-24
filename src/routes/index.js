import { StackNavigator } from 'react-navigation'
import Entry from 'app/components/screens/entry'
import Settings from 'app/components/screens/settings'
import Basic from 'app/components/screens/basic'
import Equation from 'app/components/screens/eq'
import StandardDeviation from 'app/components/screens/stdDev'
import Regression from 'app/components/screens/regression'
import UnitConverter from 'app/components/screens/unitConverter'
import Quad from 'app/components/screens/eq/Quad'
import Cubic from 'app/components/screens/eq/Cubic'

const Routes = StackNavigator(
  {
    Entry: { screen: Entry },
    Settings: { screen: Settings },
    Basic: { screen: Basic },
    Equation: { screen: Equation },
    Quad: { screen: Quad },
    Cubic: { screen: Cubic },
    StandardDeviation: { screen: StandardDeviation },
    Regression: { screen: Regression },
    UnitConverter: { screen: UnitConverter },
  },
  {
    index: 0,
    initialRouteName: 'Entry',
    headerMode: 'none',
  },
)

export default Routes
