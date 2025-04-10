import React from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import { Image } from 'expo-image';
import { Button, Text } from 'react-native-paper';
import Styles from '@/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { useSharedValue } from 'react-native-reanimated'
import Carousel from "react-native-reanimated-carousel";
import { Colors } from '@/styles/Colors';

const carousselData = [
    {'image': require('@/assets/images/food.jpg'), title: 'Quer começar a ver os resultados?\n    Comece a acompanhar seu dia!'},
    {'image': require('@/assets/images/phone.png'), title: '             Monitore sua alimentação!\nDescubra o impacto positivo na saúde.'},
    {'image': require('@/assets/images/chart.png'), title: '                  Confira seu histórico.\nTenha total controle do seu progresso.'}
]

const renderItem = ({ item, index }) => {
    return (
        <View
          key={index}
          style={{
            height: '100%',
            borderRadius: 25, // Usando o parâmetro 'rounded'
            justifyContent: 'center',
            alignItems: 'center',
            padding:5
          }}
        >
            <Image
              source={item.image}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 25, // Usando o parâmetro 'rounded'
                resizeMode: 'cover',
              }}
            />
            <Text style={{fontWeight:'bold', color: 'black', fontSize: 25.5, marginTop:8 }}>{item.title}</Text>
        </View>
    );
};

export default function SignIn() {
    const router = useRouter()
    const progress = useSharedValue<number>(0);

    return (
        <SafeAreaView style={[Styles.container,{justifyContent:'center'}]}>
            <Text style={Styles.subtitle}>Bem-Vindo ao</Text>
            <Text style={[Styles.title, {color:Colors.primary}]}>FitApp</Text>
            <View
		    	id="carousel-component"
		    	dataSet={{ kind: "basic-layouts", name: "parallax" }}
                style={{marginBottom:100}}
		    >
		    	<Carousel
		    		autoPlayInterval={2000}
		    		data={carousselData}
		    		height={400}
		    		loop={true}
		    		pagingEnabled={true}
		    		snapEnabled={true}
		    		width={Dimensions.get('window').width}
		    		mode="parallax"
		    		modeConfig={{
		    			parallaxScrollingScale: 0.9,
		    			parallaxScrollingOffset: 50,
		    		}}
		    		onProgressChange={progress}
		    		renderItem={renderItem}
		    	/>
		    </View>
            <Button 
                mode="contained" 
                onPress={() => router.push('/(app)/(auth)/signup')}
                style={{marginInline:30, padding:5, borderRadius:30, backgroundColor:Colors.primary}}
                labelStyle={{fontWeight:'600', fontSize:18}}
            >
                REGISTRE-SE GRATUITAMENTE
            </Button>
            <Button 
                onPress={() => router.push('/(app)/(auth)')}
                style={{marginInline:160, marginTop:10}}
                labelStyle={{fontWeight:'bold', fontSize:18, color:Colors.primary}}
            >
                Entrar
            </Button>
        </SafeAreaView>
    );
}