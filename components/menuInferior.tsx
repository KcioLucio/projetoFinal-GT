import {View, Text, StyleSheet, Pressable} from 'react-native'
import {router, usePathname} from 'expo-router'
import {Ionicons} from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function MenuInferior(){

    const insets = useSafeAreaInsets();
    const pathname = usePathname();

    return (

        <View 
            style={[
                styles.container,
                {
                    paddingBottom: insets.bottom
                }
            ]}
        >
                        
            <Pressable /* Botão Listas */
                style={styles.botaoMenu}
                onPress={() => router.replace('/lista')}
            >
                <Ionicons
                    name= 'list-outline'
                    size= {28}
                    color= {pathname === '/lista' ? 'green' : '#555'}
                />
                <Text style={[
                    styles.textoMenu,
                    pathname === '/lista' &&
                        styles.textoMenuAtivo
                ]}>
                    Listas
                </Text>
            </Pressable>

            <Pressable /* Botão Dashboard */
                style={styles.botaoMenu}
                onPress={() => router.replace('/dashboard')}
            >
                <Ionicons
                    name= 'bar-chart-outline'
                    size= {28}
                    color= {pathname === '/dashboard' ? 'green' : '#555'}
                />
                <Text style={[
                    styles.textoMenu,
                    pathname === '/dashboard' &&
                        styles.textoMenuAtivo
                ]}>
                    Dashboard
                </Text>
            </Pressable>

            <Pressable /* botão HOME */
                style={styles.botaoMenu}
                onPress={() => router.replace('/configuracoes')}
            >
                <Ionicons
                    name= 'settings-outline'
                    size= {28}
                    color= {pathname === '/configuracoes' ? 'green' : '#555'}
                    
                />
                <Text style={[
                    styles.textoMenu,
                    pathname === '/configuracoes' &&
                        styles.textoMenuAtivo
                ]}>
                    Configurações
                </Text>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    
    container:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,
        boxShadow: '0px -2px 5px rgba(0,0,0,0.10)'
    },
    botaoMenu:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3
    },
    textoMenu:{
        fontSize: 11,
        color: '#555',
    },
    textoMenuAtivo:{
        color: 'green',
        textShadowRadius: 3,
        fontWeight: 'bold'
    },
})