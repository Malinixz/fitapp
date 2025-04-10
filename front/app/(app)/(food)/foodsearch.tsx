import { BackAppbar } from '@/components/Appbar';
import React, { useContext, useState, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, Image, View, Modal, Alert } from 'react-native';
import { Searchbar, List, Text, Divider, Button } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Food } from '@/types/food.types';

export default function FoodSearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const router = useRouter();
    const [ foods, setFoods ] = useState<Food[]>([]);
    const barcodeLock = useRef(false);
    const { meal_ID, meal_Name } = useLocalSearchParams()

    const handleOpenCamera = async () => {
        if (!cameraPermission?.granted) {
            const permission = await requestCameraPermission();
            if (!permission.granted) {
                Alert.alert("É necessário permitir acesso à câmera");
                return;
            }
        }
        setModalIsVisible(true);
        barcodeLock.current = false;
    };

    const handleBarcodeScanned = (barcode : string) => {
        setModalIsVisible(false);
        handleSearchEan13(barcode)
    };

    const handleSearch = async () => {
        if (searchQuery.length > 2) {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://world.openfoodfacts.org/cgi/search.pl`, {
                        params: {
                            search_terms: searchQuery,
                            json: 1,
                            tagtype_0: 'countries',
                            tag_contains_0: 'contains',
                            tag_0: 'BR',
                            fields: 'id,product_name,brands,quantity,product_quantity,product_quantity_unit,image_url,nutriments,serving_size,serving_quantity,serving_quantity_unit',
                        },
                    }
                );
                setFoods(response.data.products || []);
            } catch (error) {
                console.error('Erro ao buscar alimentos:', error);
                setFoods([]);
            } finally {
                setLoading(false);
            }
        } else {
            setFoods([]);
        }
    };

    const handleSearchEan13 = async (barcode : string) => {
        try {
            const response = await axios.get(
                `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, {
                    params: {
                        tagtype_0: 'countries',
                        tag_contains_0: 'contains',
                        tag_0: 'BR',
                        fields: 'id,product_name,brands,quantity,product_quantity,product_quantity_unit,image_url,nutriments,serving_size,serving_quantity,serving_quantity_unit',
                    },
                }
            );
            const food = response.data.product
            if (food) {
                router.push({
                    pathname: '/fooddetails',
                    params: { 
                        ...food,
                        nutriments: JSON.stringify(food.nutriments),
                        meal_ID
                    }
                })
            } else {
                Alert.alert('Alimento não encontrado', 'Utilize a barra de pesquisa')
            }
        } catch (error) {
            console.error('Erro ao buscar alimentos:', error);
            setFoods([]);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <BackAppbar title={meal_Name} onPress={() => router.back()} />
            
            {/* Container para Searchbar e Botão de Scan */}
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Pesquisar por alimento"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={{flex: 1, marginRight: 0}} // Remove margem direita
                    onIconPress={handleSearch}
                    onSubmitEditing={handleSearch}
                />
                <Button 
                    icon="barcode-scan" 
                    onPress={handleOpenCamera}
                    style={styles.scanButton}
                />
            </View>
            <ScrollView style={styles.resultsContainer}>
                <Text style={styles.sectionTitle}>Resultados da Pesquisa</Text>
                <Divider style={styles.divider} />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        {foods.length === 0 ? (
                            <Text style={styles.noResultsText}>Nenhum resultado encontrado.</Text>
                        ) : (
                            foods.map((food) => (
                                <View key={food.id} style={styles.listItemContainer}>
                                    <List.Item
                                        key={food.id}
                                        title={food.product_name || 'Nome não disponível'}
                                        description={`${food.nutriments['energy-kcal_100g'] || 'N/A'} kcal, ${food.quantity || 'N/A'}`}
                                        left={(props) => (
                                            <Image
                                                source={{ uri: food.image_url }}
                                                style={styles.foodImage}
                                            />
                                        )}
                                        style={styles.listItem}
                                        onPress={() => router.push({
                                            pathname: '/fooddetails',
                                            params: { 
                                                ...food,
                                                nutriments: JSON.stringify(food.nutriments),
                                                meal_ID
                                            },
                                        })}
                                    />
                                </View>
                            ))
                        )}
                    </>
                )}

                <Modal
                    visible={modalIsVisible}
                    animationType="slide"
                    style={{flex: 1}}
                >
                    <CameraView 
                        facing="back" 
                        style={{flex: 1}}
                        onBarcodeScanned={({ data }) => {
                            if (data && !barcodeLock.current) {
                                barcodeLock.current = true;
                                setTimeout(() => handleBarcodeScanned(data), 500);
                            }
                        }}
                    />
                    <View style={styles.closeButtonContainer}>
                        <Button
                            mode="contained"
                            onPress={() => setModalIsVisible(false)}
                        >
                            Fechar
                        </Button>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
    },
    foodImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginLeft: 10,
    },
    listItemContainer: {
        backgroundColor: '#f0f0f0',
        padding: 2,
        marginBottom: 8,
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 4,
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
    closeButtonContainer: {
        position: "absolute",
        bottom: 32,
        left: 32,
        right: 32,
    },
    resultsContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8,
    },
    divider: {
        marginBottom: 16,
    },
    listItem: {
        paddingVertical: 8,
    },
    scanButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
    }
});