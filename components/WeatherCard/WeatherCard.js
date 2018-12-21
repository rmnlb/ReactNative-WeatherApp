import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from 'react-native';

export default WeatherCard = (props) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.weatherCard}>
        <Image
            source={{uri: `http://openweathermap.org/img/w/${props.icon}.png`}}
            style={styles.icon}
        />
        <Text style={styles.temper}>{Math.round(props.temperature) + " C"}</Text>
        <Text style={styles.description}>{props.description}</Text>
    </View>
    </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
   temper: {
       fontSize: 40,
       color: '#afafaf'
   } ,
    description: {
        fontSize: 27,
        color: "#828282"
    },
    weatherCard: {
       flex: 7,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#144f6f'
    },
    icon: {
       width: 100,
        height: 100
    }
});