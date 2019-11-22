import React, { Component } from 'react';

import { View, AsyncStorage, Text, Image, StyleSheet } from 'react-native';

import jwtParse from 'jwt-decode'

// import { Container } from './styles';

export default class Profile extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../img/profile.png')}
                style={styles.iconP}

            />
        ),
    };

    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
        }
    }

    componentDidMount() {
        this._recuperarUser();
    }

    _recuperarUser = async () => {
        let token = await AsyncStorage.getItem('@opflix:token')
        let user = jwtParse(token);
        this.setState({ nome: user.nomeUsuario, email: user.email })
    }

    render() {
        return (
            <View style={styles.tudo}>
                <View style={styles.viewImagem}>
                    <Image
                        style={styles.imagem}
                        source={{ uri: 'https://image.flaticon.com/icons/png/512/74/74472.png' }}
                    />
                </View>
                <View style={styles.textos}>
                    <View style={styles.view1}>
                        <Text style={styles.nomeUsuario1}>Nome:</Text>
                        <Text style={styles.nomeUsuario}>{this.state.nome}</Text>
                    </View>
                    <View style={styles.view2}>
                        <Text style={styles.emailUsuario1}>E-mail:</Text>
                        <Text style={styles.emailUsuario}>{this.state.email}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    iconP: {
        backgroundColor: '#7A101C',
        width: 30,
        height: 30,
        tintColor: '#222'
    },
    tudo: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        alignItems: "center",
        // justifyContent: "center"
    },
    viewImagem: {
    },
    imagem: {
        margin: 60,
        height: 50,
        padding: 40 ,
        width: 50,
        marginBottom: 100,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
    },
    nomeUsuario1: {
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center'
    },
    nomeUsuario: {
        fontSize: 20,
        alignSelf: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 300
    },
    emailUsuario1: {
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center'
    },
    emailUsuario: {
        margin: 10,
        fontSize: 20,
        alignSelf: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 300
    },
    view2: {
        marginTop: 50
    }
})
