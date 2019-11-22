
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import SignScreen from './pages/signin.js'
import LancamentoScreen from './pages/lancamentos'
import ProfileScreen from './pages/profile'
import Cadastro from './pages/cadastroUsuario'

// criar uma navegacao para lancamentos

const AuthStack = createStackNavigator({
    Sign: { screen: SignScreen },
});


const CadastroStack = createStackNavigator({
    Cadastro
})

const NavegacaoL = createBottomTabNavigator({
    Lancamento: {
        screen: LancamentoScreen,
    },
    Profile: {
        screen: ProfileScreen
    }
},
    {
        initialRouteName: 'Lancamento',
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            inactiveBackgroundColor: '#7A101C',
            activeBackgroundColor: '#7A101C',
            style: {
                width: '100%',
                height: 50,
            },
        },
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            NavegacaoL,
            AuthStack,
            CadastroStack
        },
        {
            initialRouteName: "AuthStack"
        }
    )
);