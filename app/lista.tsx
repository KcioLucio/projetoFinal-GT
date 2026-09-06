import {View, Text, StyleSheet} from 'react-native';

export default function Lista(){
    
    return(

        <View style={styles.container}>
            <Text style={styles.titulo}>
                Minha Lista
            </Text>
            <Text>
                Aqui aparecerão suas listas de compras.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    /* aqui inicia a estilização do container */
    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo:{
        fontSize:20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    /* aqui termina a estilização do container. As estilizações do container precisão estar antes dessa linha */ 

    

})