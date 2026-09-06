import {View, Text, StyleSheet, Pressable, Image, FlatList,} from 'react-native';
import { useSafeAreaInsets } from  'react-native-safe-area-context';

type ListaCompras={
    id: string;
    nome: string;
    dataCriacao: string;
    dataFinalizacao: string|null;
    finalizado: boolean;
};

export default function Listas(){
    const insets = useSafeAreaInsets();
    const listas: ListaCompras[] = [
        
];

    
    return(

        <View style={[styles.container,
      {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,}
    ]}>

            <View style ={styles.listaTopo}>
                <Text style={styles.titulo}>
                    Minha Lista
                </Text>
                <Text style={styles.subTitulo}>
                    Escolha uma lista ou crie uma nova.
                </Text>                
            </View>

            <View style={styles.botao}>
                <Pressable style={styles.botaoNovaLista} onPress={() => console.log('Lista adicionada!')}>
                    <Text style={styles.textoBotao}>
                        + Nova Lista
                    </Text>
                </Pressable>
            </View>

            <View style={styles.listaConteudo}>
                <FlatList style={styles.cardsLista}
                    data={listas}
                    keyExtractor={(item ) => item.id}
                    renderItem={({item}) => (
                        <Pressable style={styles.card} onPress={() => console.log(item.nome)}>
                            <Text style={styles.nomeLista}>
                                {item.nome}
                            </Text>
                            <Text style={styles.dataLista}>
                                Criado em: {item.dataCriacao}
                            </Text>
                            {
                                item.finalizado ? (
                                    <Text style={styles.statusFinalizado}>
                                        Finalizado em: {item.dataFinalizacao}
                                    </Text>
                                ):(
                                    <Text style={styles.statusAndamento}>
                                        Em andamento
                                    </Text>
                                )
                            }
                        </Pressable>
                    )}

                    ListEmptyComponent={
                        <View style={styles.listaVazia}>
                            <Image 
                                style={styles.carVazio}
                                source={require('../assets/carvazio.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.textoVazio}>
                                Sem lista de compras hoje?
                            </Text>

                            <Text style={styles.textoVazio}>
                                Crie uma nova lista para começar.
                            </Text>                            
                        </View>
                    }
                />            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    /* aqui inicia a estilização do container */
    container:{
        flex: 1,
        backgroundColor: '#fff',
        
    },
    /* aqui termina a estilização do container. As estilizações do container precisão estar antes dessa linha */ 

    /* aqui inicia a estilização do Topo da Lista */
    listaTopo:{
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        
    },    
    titulo:{
        fontSize:28,
        fontWeight: 'bold',
        
    },
    subTitulo:{
        fontSize: 14,
        color: '#665',
        marginTop: 5,
    },
    /* aqui termina a estilização do Topo da Lista. As estilizações do Topo da lista precisão estar antes dessa linha */ 

    /* aqui inicia a estilização do Botão para criar nova lista */
    botao:{
        paddingHorizontal: 20,
        paddingVertical: 15,        
    },
    botaoNovaLista:{
        height: 48,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        boxShadow: '3px 4px 4px rgba(0,0,0,0.35)',
    },
    textoBotao:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    /* aqui termina a estilização do Botão para criar nova lista. As estilizações do Botão para criar nova lista precisão estar antes dessa linha */ 

    /* aqui inicia a estilização do Conteudo da Lista */
    listaConteudo:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,        
    },
    listaVazia:{
        alignItems: 'center',
        paddingTop:40,
    },
    tituloVazio:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    textoVazio:{
        fontSize: 14,
        color: '#777'
    },
    carVazio:{
        width:360,
        height:260,
        marginBottom: 10,
        
    },
    /* aqui termina a estilização do Conteudo da Lista. As estilizações do Conteudo da lista precisão estar antes dessa linha */ 

    /* aqui inicia a estilização dos Cards da Lista */
    cardsLista:{
        width: '100%'
    },
    card:{
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        boxShadow: '3px 4px 4px rgba(0,0,0,0.20)',
    },
    nomeLista:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dataLista:{
        fontSize: 13,
        color: '#777',
        marginBottom: 8,
    },
    statusAndamento:{
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    },
    statusFinalizado:{
        fontSize: 14,
        color: '#777',
        fontWeight: 'bold',
    },
    /* aqui termina a estilização dos Cards da Lista. As estilizações dos cards da lista precisão estar antes dessa linha */ 
})