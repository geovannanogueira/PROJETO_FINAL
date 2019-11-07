import React, {Component} from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'

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
            <View style={styles.tudo}>
                <Image 
            source={require('../img/vermelho.png')}
            />
            <Text style={styles.login}>Login</Text>
            <View style={styles.inputs}>
                <View style={styles.input1}>
                    <TextInput
                    style={styles.input1}
                    placeholder="Email"
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                    />
                </View>
                <View style={styles.input2}>
                    <TextInput 
                    style={styles.input2}
                    placeholder="Senha"
                    onChangeText={senha => this.setState({senha})}
                    value={this.state.senha}
                    />
                </View>
            </View>
            <TouchableOpacity>
                <Text>Efetuar Login</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tudo: {
        backgroundColor: '#f0f8ff',
        height: 700,
    },
    login: {
        textAlign: "center",
        fontSize: 20
    },
    inputs: {
        alignItems: "center",
    },
})