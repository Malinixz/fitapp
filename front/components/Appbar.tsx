import { Colors } from '@/styles/Colors';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

interface Props {
  title: string;
  onPress?: () => void;
}

export const BackAppbar = (props: Props) => (
  // StatusbarHeight para retirar o padding extra padrao que vem no expo para ios
  <Appbar.Header statusBarHeight={0} style={styles.appbar}>
    <Appbar.BackAction onPress={props.onPress} color='#f5f5f5'/>
    <Appbar.Content title={props.title} titleStyle={styles.title}/>
  </Appbar.Header>
);

export const HomeAppbar = (props: Props) => (
  <Appbar.Header statusBarHeight={0} style={styles.appbar}>
    <Appbar.Action icon="account-circle" onPress={props.onPress} color='#f5f5f5'/>
    <Appbar.Content title={props.title} titleStyle={styles.title} />
  </Appbar.Header>
);  

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: Colors.primary, // Cor de fundo do Appbar
    elevation: 4, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.25, // Sombra para iOS
    shadowRadius: 3.84, // Sombra para iOS
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#f5f5f5'
  },
});
