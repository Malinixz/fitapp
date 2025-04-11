import React, { useEffect, useState, useContext } from "react";
import {View,StyleSheet,SafeAreaView,Text,ScrollView,} from "react-native";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import WeightChart from "@/components/weight_progress/WeightChart";
import WeightList from "@/components/weight_progress/WeightList";
import { UserContext } from "@/contexts/UserContext";
import { HomeAppbar } from "@/components/Appbar";
import { IconButton } from "react-native-paper";
import WeightModal from "@/components/weight_progress/WeightModal";
import CalIntakeChart from "@/components/calorie_progress/CalIntakeChart";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalIntakeList from "@/components/calorie_progress/CalIntakeList";
import StepsChart from "@/components/steps_progress/StepsChart";
import StepsList from "@/components/steps_progress/StepsList";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function weightprogress() {
  const param = useLocalSearchParams<{chart?: string}>()
  const [chosenSheet, setChosenSheet] = useState("Peso");
  const [period, setPeriod] = useState("Todos");
  const [modalVisible, setModalVisible] = useState(false);
  const [allDaysData, setAllDaysData] = useState([])
  const { weightUpdates } = useContext(UserContext);
  const router = useRouter()
  const filterOptions = [
    { label: "1 Semana", value: 1 },
    { label: "1 Mês", value: 4 },
    { label: "2 Meses", value: 8 },
    { label: "3 Meses", value: 12 },
    { label: "6 Meses", value: 24 },
    { label: "1 Ano", value: 48 },
    { label: "Todos", value: "Todos" },
  ];
  const sheetOptions = [
    { label: "Peso", value: "Peso" },
    { label: "Calorias", value: "Calorias" },
    { label: "Passos", value: "Passos" },
  ]
  
  // ???
  useEffect(() => {
    const loadCalData = async () => {
      const PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL as string
      const userToken = await AsyncStorage.getItem('userToken');
      try {
        const response = await axios.get(`${PUBLIC_API_URL}/days`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
        });
        setAllDaysData(response.data.data)
      } catch (err) {
        console.error('Erro ao buscar detalhes do dia:', err);
        throw err;
      }
    };

    if(chosenSheet === 'Passos' || chosenSheet === 'Calorias') {
      loadCalData()
    }

  },[chosenSheet])

  useEffect(() => {
    if(param.chart){
      setChosenSheet(param.chart)
    }
    router.replace({pathname: '/progress', params:{chart : undefined}})
  },[param.chart])

  function filterData() {
    const agora = moment().startOf("day");
    const dataSource = chosenSheet === "Peso" ? weightUpdates : allDaysData;
    
    return period === "Todos" 
    ? dataSource 
    : dataSource.filter((d : any) => moment(d.Date).isAfter(agora.clone().subtract(period, "week")));
  };

  const filteredData = filterData();

  return (
    <SafeAreaView style={styles.container}>
      <HomeAppbar title="FITAPP" />
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center", padding: 16 }}>
          <View style={styles.box}>
              <Text style={styles.chartTitle}>
                {(() => {
                  switch (chosenSheet) {
                    case "Peso":
                      return "Progressão de Peso (kg)";
                    case "Calorias":
                      return "Ingestão de Calorias";
                    case "Passos":
                      return "Contagem de Passos";
                    default:
                      return "Gráfico";
                  }
                })()}
              </Text>
            <View style={styles.dropdownContainer}>
              <Dropdown
                style={[styles.dropdown, { flex: 1, marginRight: 5 }]}
                data={sheetOptions}
                onChange={(item) => {
                  setChosenSheet(item.value);
                }}
                labelField="label"
                valueField="value"
                value={chosenSheet}
                selectedTextStyle={{ paddingLeft: 10 , fontWeight: 'bold'}}
              />
              <Dropdown
                style={[styles.dropdown, { flex: 1, marginLeft: 5 }]}
                data={filterOptions}
                onChange={(item) => {
                  setPeriod(item.value);
                }}
                labelField="label"
                valueField="value"
                value={period}
                selectedTextStyle={{ paddingLeft: 10 , fontWeight: 'bold'}}
              />
            </View>

            {filteredData.length > 0 && ( 
              chosenSheet === "Peso" ? (
                <WeightChart filteredUpdates={[...filteredData].reverse()} />
              ) : chosenSheet === "Calorias" ? (
                <CalIntakeChart filteredUpdates={[...filteredData].reverse()} />
              ) : chosenSheet === "Passos" ? (
                <StepsChart filteredUpdates={[...filteredData].reverse()} />
              ) : null
            )}

          </View>

          <View style={styles.box}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.sectionTitle}>Últimas Atualizações</Text>
              {chosenSheet === "Peso" ? <IconButton icon={"plus-circle-outline"} iconColor="#4a148c" style={{ marginTop: -8 }} onPress={() => setModalVisible(true)} /> : <></>}
            </View>
            {chosenSheet === "Peso" ? (
              <WeightList updates={filteredData} />
            )
              : 
            chosenSheet === "Calorias" ? (
              <CalIntakeList daysData={filteredData} />
            ) : 
            chosenSheet === "Passos" ? (
              <StepsList stepsData={filteredData} />
            ) : null
            }
          </View>

          <WeightModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: "100%",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    marginBottom: 16,
    height: 50,
    borderColor: "#4a148c",
    borderWidth: 2,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});