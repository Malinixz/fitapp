// SignInStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        opacity:0.7
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        backgroundColor: Colors.primary
    },
    buttonGoogle: {
        marginVertical: 10,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "90%",
        padding: 20,
    },
    subText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 34,
        marginBottom: -30,
        opacity:0.3,
        fontWeight:'bold'
    },
});

export default styles;
