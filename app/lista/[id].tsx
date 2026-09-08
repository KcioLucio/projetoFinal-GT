import {View, Text, StyleSheet, FlatList, Pressable, TextInput, Alert} from "react-native";
import {useState} from 'react';
import {useLocalSearchParams} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type ItemLista = {
    id: string;
    descricao: string;
    codigoBarras: string;
    quantidade: number;
    status: 'pendente'|'comprado'|'nao_comprado';
};

export default function listaAtiva(){

    const insets = useSafeAreaInsets();
    const {id, nome} = useLocalSearchParams();

    const [itens, setItens] = useState<ItemLista[]>([]);
    const [descricaoProduto, setDescricaoProduto] = useState('');
    const [quantidadeProduto, setQuantidadeProduto] = useState('');

    function adicionarProduto(){
        if  (
            descricaoProduto.trim() === '' || quantidadeProduto.trim() === ''
            ) {
            Alert.alert(
                'Atenção',
                'Informe o produto e a quantidade.'
            );
            return;
        }
        const quantidade = Number(quantidadeProduto);
        if (quantidade <=0 || isNaN(quantidade)) {
            Alert.alert(
                'Atenção',
                'Informe uma quantidade válida.'
            );
            return;
        }
        const novoItem: ItemLista = {
            id: Date.now().toString(),
            descricao: descricaoProduto.trim(),
            codigoBarras: '',
            quantidade: quantidade,
            status: 'pendente',
        };
        setItens([
            ...itens,
            novoItem,
        ]);
        setDescricaoProduto('');
        setQuantidadeProduto('');
    }

    function alteraStatus(itemId: string){

        const novosItens = itens.map((item): ItemLista => {
            if (item.id === itemId) {
                return{
                    ...item,
                    status: item.status === 'comprado' ? 'pendente' : 'comprado',
                };
            }
            return item;
        });
        setItens(novosItens)
    }

    function marcarNaoComprado(itemId: string){
        const novosItens = itens.map((item) => {
            if (item.id === itemId) {
                return{
                    ...item,
                    status: 'nao_comprado' as const,
                };
            }
            return item;
        });
        setItens(novosItens)
    }

    return(

        <View
            style={[
                styles.container, {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                }
            ]}
        >
            <View style={styles.topo}>
                <Text style={styles.titulo}>
                    Lista de Compras
                </Text>
                <Text style={styles.nomeLista}>
                    {nome}
                </Text>
            </View>
            <View style={styles.adicionarProduto}>
                <TextInput
                    style={styles.inputProduto}
                    placeholder="Digite o produto..."
                    value={descricaoProduto}
                    onChangeText={setDescricaoProduto}
                />
                <View style={styles.adicionarQuantidade}>
                    <TextInput
                        style={styles.inputQuantidade}
                        placeholder="Digite a Qtd"
                        keyboardType="numeric"
                        value={quantidadeProduto}
                        onChangeText={setQuantidadeProduto}
                    />
                    <Pressable
                        style={styles.botaoAdicionar}
                        onPress={adicionarProduto}
                    >
                        <Text style={styles.textoBotaoAdicionar}>
                            Adicionar
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.conteudo}>

                <FlatList
                    data={itens}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View style={[styles.cardProduto,
                            item.status === 'comprado' &&
                                styles.cardComprado,
                            item.status === 'nao_comprado' &&
                                styles.cardNaoComprado,
                        ]}>
                            
                            <Pressable style={[
                                styles.checkbox,
                                item.status === 'comprado' &&
                                    styles.checkboxComprado,
                                item.status === 'nao_comprado' &&
                                    styles.checkboxNaoComprado
                                ]}
                                onPress={() => alteraStatus(item.id)}
                                >
                                    {item.status === 'comprado' &&(
                                        <Text style={styles.check}>
                                            ✔
                                        </Text>
                                    )}
                                    {item.status === 'nao_comprado' &&(
                                        <Text style={styles.checkNaoComprado}>
                                            ✖
                                        </Text>
                                    )}
                            </Pressable>

                            <View style={styles.infoProduto}>
                                <Text style={[styles.descricaoProduto,
                                    item.status === 'comprado' &&
                                        styles.descricaoComprado,
                                    item.status === 'nao_comprado' &&
                                        styles.descricaoNaoComprado
                                ]}>
                                    {item.descricao}
                                </Text>
                                {item.codigoBarras !=='' && (
                                <Text style={styles.codigoBarras}>
                                    {item.codigoBarras}
                                </Text>
                                )}
                            </View>

                            <Text style={styles.quantidade}>
                                QTD. {item.quantidade}
                            </Text>

                            <Pressable 
                                style={styles.botaoExcluir} 
                                onPress={() => marcarNaoComprado(item.id)}>
                                <Text style={styles.iconeExcluir}>
                                    🗑
                                </Text>
                            </Pressable>
                        </View>
                    )}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    /* aqui inicia a estilização do container */
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    /* aqui termina a estilização do container. As estilizações do container precisão estar antes dessa linha */ 


    /* aqui inicia a estilização do Topo para criar nova lista */
    topo:{
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    titulo:{
        fontSize: 26,
        fontWeight: 'bold'
    },
    nomeLista:{
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
        marginTop: 5,
    },
    /* aqui termina a estilização do Topo. As estilizações do Topo precisão estar antes dessa linha */

     /* aqui inicia a estilização do Area de adicionar */
    adicionarProduto:{
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    inputProduto:{
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 20
    },
    adicionarQuantidade:{
        flexDirection: 'row',
        gap:10,
    },
    inputQuantidade:{
        width: '30%',
        height: 45,
        borderWidth: 1,
        borderColor:'#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
    botaoAdicionar:{
        flex: 1,
        height: 45,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    textoBotaoAdicionar:{
        color: '#fff',
        fontWeight: 'bold',        
    },
     /* aqui termina a estilização da Area de adicionar. As estilizações da Area de adicionar precisão estar antes dessa linha */ 

     /* aqui inicia a estilização do Conteudo da Lista dos produtos */
    conteudo:{
        flex: 1,
        paddingHorizontal: 20,
    },
    cardProduto:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 12,
        boxShadow: '3px 4px 4px rgba(0,0,0,0.20)'
    },
    checkbox:{
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        marginRight: 12,
    },
    infoProduto:{
        flex: 1,
    },
    descricaoProduto:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    codigoBarras:{
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    quantidade:{
        fontSize: 13,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    botaoExcluir:{
        padding: 5
    },
    iconeExcluir:{
        fontSize: 20,
    },
    checkboxComprado:{
        backgroundColor: 'green',
        borderBlockColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    check:{
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    cardComprado:{
        backgroundColor: '#e8f5e9',
        borderColor: '#81c784'
    },
    descricaoComprado:{
       textDecorationLine: 'line-through',
       color: '#777' 
    },
    cardNaoComprado:{
        backgroundColor: '#ffebee',
        borderColor: '#f07979'
    },
    checkboxNaoComprado:{
        backgroundColor: '#d32f2f',
        borderColor:    '#d32f2f',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkNaoComprado: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',

    },
    descricaoNaoComprado: {
        color: '#b71c1c'
    },
    /* aqui termina a estilização do Conteudo da Lista dos Produtos. As estilizações do Conteudo da lista dos produtos precisão estar antes dessa linha */ 
});