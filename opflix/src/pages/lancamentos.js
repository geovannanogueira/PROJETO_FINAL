import React, { Component } from "react";

import {
    Text,
    View,
    StyleSheet,
    Image,
    AsyncStorage,
    FlatList
} from 'react-native';

export default class Lancamentos extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
                <Image
                    source={require('../img/lancamento.png')}
                    style={styles.iconL}
                />
        ),
    };

    constructor() {
        super();
        this.state = {
            lancamentos: []
        }
    }
    
    componentDidMount() {
        this._carregarLancamentos();
    }

    _carregarLancamentos = async () => {
        let token = await AsyncStorage.getItem('@opflix:token');
        await fetch('http://192.168.3.14:5000/api/lancamentos', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ lancamentos: data }))
            .catch(erro => console.warn(erro));
    }

    render() {
        return (
            <View style={styles.tudo}>
                <View style={styles.viewL}>
                    <Text style={styles.lancamento}>Lançamentos</Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.lista}
                    data={this.state.lancamentos}
                    keyExtractor= {item => item.idLancamento}
                    renderItem={({ item }) => (
                        <View style={styles.tabela}>
                            <Text style={styles.nome}>{item.nome}</Text>
                            {/* <Text style={styles.duracao}>{item.duracaoMin}</Text>
                            <Text style={styles.classificacao}>{item.classificacao}</Text>
                            <Text style={styles.data}>{item.dataLancamento}</Text>
                            <Text style={styles.sinopse}>{item.sinopse}</Text>
                            <Text style={styles.plataforma}>{item.idPlataforma}</Text>
                            <Text style={styles.categoria}>{item.idGenero}</Text>
                            <Text style={styles.tipo}>{item.idTipo}</Text> */}
                            <Image source={{ uri: item.imagem }} style={styles.imagem} />
                        </View>
                    )}
                />
        </View>
        );
    }
};

const styles = StyleSheet.create({
    iconL: {
        backgroundColor: '#7A101C',
        width: 40,
        height: 40
    },
    tudo: {
        backgroundColor: '#ADD8E6',
        height: 1000,
    },
    viewL: {
        alignItems: "center",
    },
    lancamento: {
        fontSize: 30,
        color: '#7A101C',
        padding: 30
    },
    nome: {
        fontSize: 15,
        backgroundColor: '#808080',
        textAlign: "center"
    },
    imagem: {
        width: 40, 
        height: 40,
        backgroundColor: '#C0C0C0'
    }
})