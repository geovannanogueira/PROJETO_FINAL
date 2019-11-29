import React, {Component} from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    AsyncStorage
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
        await fetch("http://192.168.3.14:5000/api/login", {
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
                await AsyncStorage.setItem('@opflix:token', tokenAReceber);
                this.props.navigation.navigate("NavegacaoL");
            } catch (error) {
                console.warn(error)
            }
        }
    }

    render(){
        return (
            <View style={styles.tudo}>
                <View style={styles.imagemLogo}>
                    <Image
                    style={styles.logo}
                    source={require('../img/vermelho.png')}
                    />
                </View>
                <View style={styles.viewLogin}>
                    <Text style={styles.login}>Login</Text>
                </View>
                <View style={styles.inputs}>
                    <View style={styles.input1}>
                        <TextInput
                        style={styles.email}
                        placeholder="Email"
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        />
                    </View>
                    <View style={styles.input2}>
                        <TextInput 
                        style={styles.senha}
                        placeholder="Senha"
                        onChangeText={senha => this.setState({senha})}
                        value={this.state.senha}
                        />
                    </View>
                </View>
                <View style={styles.botao}>
                    <TouchableOpacity onPress={this._realizarLogin}>
                        <Text style={styles.logar}>Efetuar Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Cadastro")}>
                        <Text style={styles.cadastro}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tudo: {
        backgroundColor: '#ADD8E6',
        height: 700,
    },
    imagemLogo: {
        alignItems: "center",
    },
    logo: {
        padding: 5,
        width: 100,
        height: 100,
    },
    login: {
        padding: 50,
        textAlign: "center",
        fontSize: 40,
        color: '#7A101C',
    },
    inputs: {
        alignItems: "center",
    },
    input1: {
        margin: 10,
        // marginTop: 40,
        width: 300,
        borderWidth: 1,
    },
    input2: {
        margin: 10,
        width: 300,
        borderWidth: 1,
    },
    botao: {
        alignItems: "center",
    },
    logar: {
        textAlign: "center",
        margin: 10,
        fontSize: 20,
        padding: 9,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#7A101C",
        width: 150,
        height: 50,
        color: "white"
    }
})