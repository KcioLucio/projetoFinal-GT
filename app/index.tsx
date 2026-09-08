import { Image, StyleSheet, View, Text, TextInput, Pressable, Alert,} from 'react-native';
import {useState, useEffect,} from 'react';
import { useSafeAreaInsets } from  'react-native-safe-area-context'; /* Essa propriedade faz com que a tela se ajuste a area de notificação e barra de naveção do celular */
import {router} from 'expo-router';

export default function TelaLogin() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function entrar(){

    if(email.trim() ===''|| senha.trim() ===''){
      Alert.alert('E-mail ou senha invalidos!');
      return;
    }
    const emailValido = /\S+@\S+\.\S+/.test(email);
    
      if (!emailValido){
        Alert.alert('Digite um e-mail válido!')
        return;
      }

    router.replace('/lista');

    setEmail('');
    setSenha('');
  }

  return (

    <View style={[styles.container,
      {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,}
    ]}>
     
      <View style={styles.loginTopo}> 
        
        <Image
          source={require('../assets/carcomp.png')} 
          style={styles.logoTopo}
          resizeMode='contain' /* essa propriedade faz com que a imagem seja preenchida no espaço sem deforma-la */
        />

        <Text style={styles.nomeApp}>
          Lista de Compras
        </Text>

      </View>   
      
      <View style={styles.loginConteudo}>
        <Text style={styles.titulo}>
          Bem-vindo!
        </Text>

        <Text style={styles.subtitulo}>
          Entre para acessar suas listas de compras
        </Text>

        <View style={styles.linhaEmail}>
          <Text style={styles.textoConteudo}>
            E-mail:
          </Text>

          <TextInput
            style={styles.input}
            placeholder='Digite seu e-mail'
            placeholderTextColor={'#888'}
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.linhaSenha}>
          <Text style={styles.textoConteudo}>
            Senha:
          </Text>

          <TextInput
            style={styles.input}
            placeholder='Digite sua senha'
            placeholderTextColor={'#888'}
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />
        </View>
        
          <Pressable onPress={() => console.log('Esqueceu a Senha')} style={styles.linhaEsqueciSenha}>
            <Text style={styles.textoEsqueciSenha}>
              Esqueci a senha
            </Text>
          </Pressable>
               
          <Pressable onPress={entrar} style={styles.botao}>
            <Text style={styles.textoBotao}>
              Entrar
            </Text>
          </Pressable>        
      </View>

      <View style={styles.loginFooter}>
        <Text style={styles.textoFooter}>
          É novo por aqui?
        </Text>
        <Pressable onPress={() => console.log('Cadastrar')}>
          <Text style={styles.textoFooterCad}>
            Cadastre-se!
          </Text>
        </Pressable>
      </View>
    </View>
 );
}


const styles = StyleSheet.create({
/* aqui inicia a estilização do container */
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',    
  },
/* aqui termina a estilização do container. As estilizações do container precisão estar antes dessa linha */  

/* aqui inicia a estilização do topo */
  loginTopo: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,    
  },
  logoTopo:{
    width: 220, 
    height: 130, 
    borderRadius:20,    
  },
  nomeApp:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#222'
  },
/* aqui termina a estilização do topo. As estilizações do topo precisão estar antes dessa linha */  

/* aqui inicia a estilização do conteúdo */
  loginConteudo: {
    flex: 4,
    justifyContent: 'center',
    padding: 30,
  },
 titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },  
  textoConteudo: {
    fontSize: 16,
    marginBottom: 5,
  },
  linhaEmail: {
    marginBottom: 15,
  },
  linhaSenha: {
    marginBottom: 5,
  },
  input: {
    height: 45,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 5,
    paddingLeft: 10,
  },
  linhaEsqueciSenha: {
    alignItems: 'flex-end',
    marginTop: 5,
    marginBottom: 20,
  },
  textoEsqueciSenha: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  botao: {
    height: 45,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    boxShadow: '3px 4px 4px rgb(0,0,0, 0.5)' ,
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
/* aqui termina a estilização do conteúdo. As estilizações do conteúdo precisão estar antes dessa linha */

/* aqui inicia a estilização do footer */
  loginFooter: {
    flex: 0.35,
    flexDirection:'row',
    backgroundColor: 'black',
    justifyContent:'center',
    alignItems:'center',
    gap:10,
  },
  textoFooter: {
    color: 'white',
    textAlign: 'center',    
  },
  textoFooterCad:{
    color: '#0066cc',
    textAlign: 'center',
    textDecorationLine:'underline'
  },
/* aqui termina a estilização do footer. As estilizações do footer precisão estar antes dessa linha */
});