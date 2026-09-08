import {View, Text, StyleSheet,} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuInferior from '../components/menuInferior';
import {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

type ListaCompra = {
  id: string;
  nome: string;
  dataCriacao: string;
  dataFinalizacao: string | null;
  finalizada: boolean;
};

type ItemLista = {
  id: string;
  descricao: string;
  codigoBarras: string;
  quantidade: number;
  status: 'pendente' | 'comprado' | 'nao_comprado';
};
const CHAVE_LISTAS = '@lista_compras:listas';

export default function Dashboard() {

    const insets = useSafeAreaInsets();
    const [totalListas, setTotalListas] = useState(0);
    const [totalPendentes, setTotalPendentes] = useState(0);
    const [totalComprados, setTotalComprados] = useState(0);
    const [totalNaoComprados, setTotalNaoComprados] = useState(0);

    async function carregarDashboard() {

        try {
        
            const dadosListas = await AsyncStorage.getItem(CHAVE_LISTAS);        
                if (dadosListas === null) {
                    setTotalListas(0);
                    setTotalPendentes(0);
                    setTotalComprados(0);
                    setTotalNaoComprados(0);
                    return;
                };     
      
            const listasSalvas: ListaCompra[] = JSON.parse(dadosListas);
                setTotalListas(listasSalvas.length);

            let todosItens: ItemLista[] = [];
            
            for (const lista of listasSalvas) {

                const CHAVE_ITENS = `@lista_compras:itens:${lista.id}`;

                const dadosItens = await AsyncStorage.getItem(CHAVE_ITENS);

                if (dadosItens !== null) {            
                    const itensLista: ItemLista[] = JSON.parse(dadosItens); 
                        todosItens = [
                            ...todosItens,
                            ...itensLista
                        ];
          
                }
        
            }
            
            
            const pendentes = todosItens.filter(item => item.status === 'pendente');

            const comprados = todosItens.filter(item => item.status === 'comprado');

            const naoComprados = todosItens.filter(item => item.status === 'nao_comprado');      
            
            setTotalPendentes(pendentes.length);

            setTotalComprados(comprados.length);
      
            setTotalNaoComprados(naoComprados.length);
      
      
        } catch (erro) {        
            console.log(
                'Erro ao carregar dashboard:',
                erro
            );
      
        }
    }

    useEffect(() => {
        carregarDashboard();
    }, []);

    return (

        <View
          style={[
            styles.container,
            {
              paddingTop: insets.top,
            }
          ]}
        >

            <View style={styles.conteudo}>
                <Text style={styles.titulo}>
                    Dashboard
                </Text>
                <Text style={styles.subTitulo}>
                  Resumo das suas compras
                </Text>

                <View style={styles.areaCards}>
                    <View style={styles.cardListas}>
                        <Text style={styles.valorCard}>
                            {totalListas}
                        </Text>
                        <Text style={styles.tituloCard}>
                            Total de Listas
                        </Text>
                    </View>
    
                    <View style={styles.cardPendentes}>
                        <Text style={styles.valorCard}>
                            {totalPendentes}
                        </Text>
                        <Text style={styles.tituloCard}>
                            Produtos Pendentes
                        </Text>
                    </View>   

                    <View style={styles.cardComprados}>
                        <Text style={styles.valorCard}>
                            {totalComprados}
                        </Text>
                        <Text style={styles.tituloCard}>
                            Produtos Comprados
                        </Text>
                    </View>
                        
                    <View style={styles.cardNaoComprados}>
                        <Text style={styles.valorCard}>
                            {totalNaoComprados}
                        </Text>
                        <Text style={styles.tituloCard}>
                            Produtos Não comprados
                        </Text>
                    </View>
                </View>          
            </View>
            <MenuInferior />
        </View>
    );
}


const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: '#fff',
},
conteudo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
},
titulo: {
    fontSize: 28,   
    fontWeight: 'bold',
},
subTitulo: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    marginBottom: 30,
},
areaCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
},
cardListas: {
    width: '48%',
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    boxShadow: '3px 4px 4px rgba(0,0,0,0.5)',
},
cardPendentes: {
    width: '48%',
    backgroundColor: 'orange',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    boxShadow: '3px 4px 4px rgba(0,0,0,0.5)',
},
cardComprados: {
    width: '48%',
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    boxShadow: '3px 4px 4px rgba(0,0,0,0.5)',
},
cardNaoComprados: {
    width: '48%',
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    boxShadow: '3px 4px 4px rgba(0,0,0,0.5)',
},
valorCard: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
},
tituloCard: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
},
/* valorComprados: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
},
tituloComprados: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
    fontWeight: 'bold',
},
valorPendentes: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'orange',
},
tituloPendentes: {
    fontSize: 14,
    color: 'orange',
    marginTop: 5,
    fontWeight: 'bold',
},
valorNaoComprados: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
},
tituloNaoComprados: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
    fontWeight: 'bold',
}, */
});
