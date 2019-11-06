import React, {Component} from "react";

import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";

export default class SignIn extends Component{

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            email: "" ,
            senha: ""
        };
    }

    _realizarLogin = async () => {
        await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha
            }),
        })
        .then(resposta => resposta.json())
        .then(data => this._irParaHome(data.token))
        .catch(erro => console.warn(erro));
    }

    _irParaHome = async tokenAReceber => {
        if(tokenAReceber != null){
            try {
                await AsyncStorage.setItem('@roman:token', tokenAReceber);
                this.props.navigation.navigate("MainNavigation");
            } catch (error) {
                console.warn(error)
            }
        }
    }

    render(){
        return (
            <View>
                <Image 
            source={require('../img/vermelho.png')}
            />
            <Text>Login</Text>
            <TextInput 
            placeholder="Email"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            />
            <TextInput 
            placeholder="Senha"
            onChangeText={senha => this.setState({senha})}
            value={this.state.senha}
            />
            <TouchableOpacity>
                <Text>Efetuar Login</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
})