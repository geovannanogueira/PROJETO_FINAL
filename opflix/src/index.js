
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import SignScreen from './pages/signin.js'
import LancamentoScreen from './pages/lancamentos'

// criar uma navegacao para lancamentos

const AuthStack = createStackNavigator({
    Sign: { screen: SignScreen },
});

const NavegacaoL = createBottomTabNavigator({
    Lancamento: {
        screen: LancamentoScreen,
    },
})

export default createAppContainer(
    createSwitchNavigator(
        {
            NavegacaoL,
            AuthStack
        },
        {
            initialRouteName: "AuthStack"
        }
    )
);