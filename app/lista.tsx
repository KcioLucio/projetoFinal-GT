import {View, Text, StyleSheet, Pressable} from 'react-native';
import { useSafeAreaInsets } from  'react-native-safe-area-context';
export default function Listas(){
    const insets = useSafeAreaInsets();
    const temListas = false;
    
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
                {temListas ?(
                    <View>

                    </View>
                ):(
                    <View style={styles.listaVazia}>
                        <Text style={styles.tituloVazio}>
                            Sem listas de compras hoje?
                        </Text>
                        <Text style={styles.textoVazio}>
                            Crie uma nova lista para começar.
                        </Text>
                    </View>
                )}
            
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
        alignItems: 'center'
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
    /* aqui termina a estilização do Conteudo da Lista. As estilizações do Conteudo da lista precisão estar antes dessa linha */ 
})