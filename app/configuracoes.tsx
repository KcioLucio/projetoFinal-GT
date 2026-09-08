import {View, Text, StyleSheet,} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuInferior from '../components/menuInferior';


export default function Configurações() {

  const insets = useSafeAreaInsets();

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
          Configurações
        </Text>

        <Text style={styles.subTitulo}>
          Subtitulo Configurações.
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subTitulo: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
});