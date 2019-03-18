import {createAppContainer, createStackNavigator} from 'react-navigation';

import Main from './components/Main';
import Chat from './components/Chat';

const StackNavigator = createStackNavigator({
    Main: Main,
    Chat: Chat,
});

export default createAppContainer(StackNavigator);