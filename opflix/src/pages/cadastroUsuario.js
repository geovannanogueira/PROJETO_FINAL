import React, { Component } from 'react';

import { View, Text,TextInput, Image, StyleSheet,TouchableOpacity} from 'react-native';

// import { Container } from './styles';

export default class CadastroUsuario extends Component {

    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
            senha: null
        }
    }

    static navigationOptions = {
        header:null
    } 

    _realizarCadastro = async () => {
        await fetch("http://192.168.3.14:5000/api/usuarios", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha
            }),
        })
            .then(resposta => resposta.json())
            .then(data => {
                console.warn(data)
                this.props.navigation.navigate('AuthStack')
            })
            .catch(erro => console.warn(erro));
    }


    render() {
        return (
            <View style={styles.tudo}>
                <View style={styles.imagemLogo}>
                    <Image
                    style={styles.logo}
                    source={require('../img/vermelho.png')}
                    />
                </View>
                <View style={styles.viewCadastro}>
                    <Text style={styles.cadastro}>Cadastro</Text>
                </View>
                <View style={styles.inputs}>
                <View style={styles.input1}>
                        <TextInput 
                        style={styles.nome}
                        placeholder="Nome"
                        onChangeText={nome => this.setState({nome})}
                        value={this.state.nome}
                        />
                    </View>
                    <View style={styles.input2}>
                        <TextInput
                        style={styles.email}
                        placeholder="Email"
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        />
                    </View>
                    <View style={styles.input3}>
                        <TextInput 
                        style={styles.senha}
                        placeholder="Senha"
                        onChangeText={senha => this.setState({senha})}
                        value={this.state.senha}
                        />
                    </View>
                </View>
                <View style={styles.botao}>
                    <TouchableOpacity onPress={this._realizarCadastro}>
                        <Text style={styles.cadastrar}>Concluir Cadastro</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
    }
}

const styles = StyleSheet.create({
    tudo: {
        backgroundColor: '#ADD8E6',
        height: "100%",
    },
    imagemLogo: {
        alignItems: "center",
    },
    logo: {
        padding: 5,
        width: 100,
        height: 100,
    },
    cadastro: {
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
    input3: {
        margin: 10,
        width: 300,
        borderWidth: 1,
    },
    botao: {
        alignItems: "center",
    },
    cadastrar: {
        textAlign: "center",
        margin: 10,
        fontSize: 20,
        padding: 9,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#7A101C",
        width: 250,
        height: 50,
        color: "white"
    }
})