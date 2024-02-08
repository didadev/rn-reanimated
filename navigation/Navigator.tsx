import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomSheetMansion from '../Youtube/ExampleAppMansion/index';
import BottomSheet from '../Samples/BottomSheet';
import InterpolateScrollView from '../Youtube/ Reactiive_channel/Interpolate_with_ScrollView/App';
import InterpolateColors from '../Youtube/ Reactiive_channel/interpolateColors/App';
import PinchGestureHandler from '../Youtube/ Reactiive_channel/PinchGestureHandler/App';
import DoubleTapGesture from '../Youtube/ Reactiive_channel/doubleTapgesture/App';
import CircularProgressBar from '../Youtube/ Reactiive_channel/circularProgressbar/App';
import SwipeToDeleteAnimation from '../Youtube/ Reactiive_channel/SwipeToDeleteAnimation/App';
import RippleEffect from '../Youtube/ Reactiive_channel/RippleEffect/App';
import PerspectiveMenu from '../Youtube/ Reactiive_channel/perspectiveMenu/App';
import SLidingCounter from '../Youtube/ Reactiive_channel/SlidingCounter/App';
import ClockLoader from '../Youtube/ Reactiive_channel/ClockLoader/App';

import Home from '../Screens/Home';

export const screens = [
  {name: 'bottom sheet Mansion', component: BottomSheetMansion},
  {name: 'Simple bottom sheet', component: BottomSheet},
  {name: 'Interpolate scrollview', component: InterpolateScrollView},
  {name: 'Interpolate colors', component: InterpolateColors},
  {name: 'Pinch gesture handler', component: PinchGestureHandler},
  {name: 'double tap gesture', component: DoubleTapGesture},
  {name: 'Circular Progressbar', component: CircularProgressBar},
  {name: 'Swipe to delete', component: SwipeToDeleteAnimation},
  {name: 'Ripple effect', component: RippleEffect},
  {name: 'Perspective menu', component: PerspectiveMenu},
  {name: 'Sliding Counter', component: SLidingCounter},
  {name: 'Clock Loader', component: ClockLoader},
];

const Stack = createNativeStackNavigator();
function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: 'tomato'},
        headerShown: false,
        presentation: 'modal',
      }}>
      <Stack.Screen name="Home" component={Home} />
      {screens.map(({name, component}) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
}

export default Navigator;
