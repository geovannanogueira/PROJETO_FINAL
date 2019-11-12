import React, { Component } from "react";

import {
    Text,
    View,
    StyleSheet,
    Image,
    AsyncStorage,
    FlatList,
    TextInput,
    TouchableOpacity
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
            lancamentos: [],
            resposta: null,
            lancamentoBuscado: []
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

    _carregarResposta = async () => {
        // verificar se a pessoa digitou algo
        // caso nao tenha digitado, chamar o carregarLancamentos


        let token = await AsyncStorage.getItem('@opflix:token');
        await fetch('http://192.168.3.14:5000/api/lancamentos', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(a => a.json())
            .then(data => {
                let respostaDaPessoa = data.filter(element => {
                    return element.nome == this.state.resposta;
                });
                this.setState({ lancamentoBuscado: respostaDaPessoa })
                
            })
    }


    render() {
        return (
            <View style={styles.tudo}>
                <View style={{ height: '90%' }}>
                    <View style={styles.viewL}>
                        <Text style={styles.lancamento}>Lançamentos</Text>
                    </View>
                    <TextInput
                        style={styles.inputBuscar}
                        onChangeText={resposta => this.setState({ resposta })}
                        value={this.state.resposta}
                    />
                    <View style={styles.viewBotaoBuscar}>
                        <TouchableOpacity onPress={this._carregarResposta}>
                            <Text style={styles.botaoBuscar}>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                    {(!this.state.resposta || this.state.resposta === null || this.state.resposta == '') ? (
                        <FlatList
                            contentContainerStyle={styles.lista}
                            data={this.state.lancamentos}
                            keyExtractor={item => item.idLancamento}
                            renderItem={({ item }) => (
                                <View style={styles.tabela}>
                                    <Text style={styles.nome}>{item.nome}</Text>
                                    <Text style={styles.duracao}>Duração do Filme/Série: {item.duracaoMin} minutos</Text>
                                    {/* <Text style={styles.classificacao}>{item.classificacao}</Text>
                                    <Text style={styles.data}>{item.dataLancamento}</Text>
                                    <Text style={styles.sinopse}>{item.sinopse}</Text>
                                    <Text style={styles.plataforma}>{item.idPlataforma}</Text>
                                    <Text style={styles.categoria}>{item.idGenero}</Text>
                                    <Text style={styles.tipo}>{item.idTipo}</Text> */}
                                    <Image source={{ uri: item.imagem }} style={styles.imagem} />
                                </View>
                            )}
                        />
                        ) : (
                        <FlatList
                            contentContainerStyle={styles.lista}
                            data={this.state.lancamentoBuscado}
                            keyExtractor={item => item.idLancamento}
                            renderItem={({ item }) => (
                                <View style={styles.tabela}>
                                    <Text style={styles.nome}>{item.nome}</Text>
                                    <Text style={styles.duracao}>Duração do Filme/Série: {item.duracaoMin} minutos</Text>
                                    {/* <Text style={styles.classificacao}>{item.classificacao}</Text>
                                    <Text style={styles.data}>{item.dataLancamento}</Text>
                                    <Text style={styles.sinopse}>{item.sinopse}</Text>
                                    <Text style={styles.plataforma}>{item.idPlataforma}</Text>
                                    <Text style={styles.categoria}>{item.idGenero}</Text>
                                    <Text style={styles.tipo}>{item.idTipo}</Text> */}
                                    <Image source={{ uri: item.imagem }} style={styles.imagem} />
                                </View>
                            )}
                        />
                        )}
                </View>
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
        height: '100%'
    },
    viewL: {
        alignItems: "center"
    },
    lancamento: {
        fontSize: 30,
        color: '#7A101C',
        padding: 30
    },
    inputBuscar: {
        margin: 10,
        borderWidth: 1,
    },
    viewBotaoBuscar: {
        display: "flex",
        alignItems: "center"
    },
    botaoBuscar: {
        textAlign: "center",
        fontSize: 17,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "black",
        width: 80,
        height: 40,
    },
    tabela: {
        display: "flex",
        alignItems: "center",
        margin: 20
    },
    nome: {
        color: 'white',
        fontSize: 20,
        backgroundColor: '#808080',
        textAlign: "center",
        width: 300,
    },
    duracao: {
        textAlign: "center",
        fontSize: 20,
        backgroundColor: '#C0C0C0',
        width: 300,
        margin: 10
    },
    imagem: {
        width: 150,
        height: 170,
        // backgroundColor: '#C0C0C0',
        textAlign: "center",
        margin: 20,
    }
})