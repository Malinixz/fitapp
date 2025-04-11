import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { Modal, TouchableWithoutFeedback, View, Text, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, TextInput } from "react-native-paper";

type EditGoalsProps = {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
};

export function EditGoals({modalVisible, setModalVisible} : EditGoalsProps) {
    const { user, updateUser } = useContext(UserContext);
    const [ carb, setCarb] = useState(user.CarbGoal.toString())
    const [ prot, setProt] = useState(user.ProtGoal.toString())
    const [ fat, setFat] = useState(user.FatGoal.toString())
    const [ cal, setCal ] = useState(user.CaloriesGoal.toString())
    const [ carbPerc, setCarbPerc ] = useState(Math.round((user.CarbGoal * 4 * 100) / user.CaloriesGoal).toString())
    const [ protPerc, setProtPerc ] = useState(Math.round((user.ProtGoal * 4 * 100) / user.CaloriesGoal).toString())
    const [ fatPerc, setFatPerc ] = useState(Math.round((user.FatGoal * 9 * 100) / user.CaloriesGoal).toString())

    useEffect(() => {
        const fatGram = parseInt(fat) || 0
        const carbGram = parseInt(carb) || 0
        const protGram = parseInt(prot) || 0

        const fatCal = fatGram * 9
        const carbCal = carbGram * 4
        const protCal = protGram * 4

        const calTotal = fatCal + carbCal + protCal

        if (calTotal === 0) { // Evitar Divisao por zero
            setCal("0");
            setFatPerc("0");
            setCarbPerc("0");
            setProtPerc("0");
            return;
        }
        
        setCal(calTotal.toString())
      
        const percCarb = Math.round((carbCal * 100) / calTotal)
        const percProt = Math.round((protCal * 100) / calTotal)
        const percFat = 100 - percCarb - percProt
      
        setCarbPerc(percCarb.toString())
        setProtPerc(percProt.toString())
        setFatPerc(percFat.toString())
    }, [carb, prot, fat])
    
    const handleSubmit = () => {
        updateUser('CaloriesGoal', parseInt(cal))
        updateUser('CarbGoal', parseInt(carb))
        updateUser('ProtGoal', parseInt(prot))
        updateUser('FatGoal', parseInt(fat))
        setModalVisible(false)
    }
    return(
        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>Meta Calórica Atualizada : {cal}</Text>
                        <Text style={{fontSize:12, fontWeight:'bold', opacity:0.5, marginBottom:10}}>Meta Original : {user.CaloriesGoal.toString()}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <TextInput
                                label="Carboidrato (g)"
                                value={carb}
                                onChangeText={(text) => {
                                    setCarb(text.slice(0, 3)); // Limita a 3 dígitos
                                }}
                                mode="outlined"
                                style={styles.input}
                                keyboardType="numeric"
                            />
                            <TextInput
                                label="Carboidrato (%)"
                                value={carbPerc}
                                onChangeText={(text) => {
                                    setCarb(text.slice(0, 2));
                                }}
                                mode="outlined"
                                style={styles.input}
                                keyboardType="numeric"
                                disabled={true}
                            />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <TextInput
                                label="Proteína (g)"
                                value={prot}
                                onChangeText={(text) => {
                                    setProt(text.slice(0, 3));
                                }}
                                mode="outlined"
                                style={styles.input}
                                keyboardType="numeric"
                            />
                            <TextInput
                                label="Proteína (%)"
                                value={protPerc}
                                onChangeText={(text) => {
                                    setCarb(text.slice(0, 2)); // Limita a 3 dígitos
                                }}
                                mode="outlined"
                                style={styles.input}
                                keyboardType="numeric"
                                disabled={true}
                            />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <TextInput
                                label="Gordura (g)"
                                value={fat}
                                onChangeText={(text) => {
                                    setFat(text.slice(0, 3)); // Limita a 3 dígitos
                                }}
                                mode="outlined"
                                style={styles.input}
                                keyboardType="numeric"
                            />
                            <TextInput
                                label="Gordura (%)"
                                value={fatPerc}
                                onChangeText={(text) => {
                                    setCarb(text.slice(0, 2)); // Limita a 3 dígitos
                                }}
                                mode="outlined"
                                style={styles.input}
                                keyboardType="numeric"
                                disabled={true}
                            />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text onPress={() => setModalVisible(false)} style={{}}>Fechar</Text>
                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={{backgroundColor:'rgba(0, 128, 0, 0.7)', borderRadius:4}}>
                                    <Icon
                                        source="check"
                                        size={20}
                                        color='white'
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "90%",
        padding: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingHorizontal:32
    },
    input: {
        marginBottom: 20,
        height: 50,
        backgroundColor: '#fff',
    },
})