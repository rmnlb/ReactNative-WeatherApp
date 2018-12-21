import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native'
import Search from "../Search/Search";
import WeatherCard from "../WeatherCard/WeatherCard"

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const KEY_STRING = "&APPID=32ab8b575c49cebf836553302e5aefde";

export default class WeatherField extends Component {

    state = {
        currentWeather: {},
        error: null
    };

    fetchData = (coords) => {
        let params = (typeof coords === 'string')
            ? 'q=' + coords.replace(", ", ",")
            : "lat=" + coords.latitude + "&lon=" + coords.longitude;
        fetch(BASE_URL + params + "&units=metric" + KEY_STRING)
            .then(res => res.json())
            .then(res => {
                    if (!res.weather) {
                        this.setState({
                            error: res.cod + " " + res.message,
                            currentWeather: {},
                        })
                    } else {
                        this.setState({
                            error: null,
                            currentWeather: res,
                        })
                    }
                }
            )
            .catch(err => this.setState({
                currentWeather: {},
                error: err
            }))
    };

    componentDidMount() {

        let coords = this.props.navigation.getParam('coordinates');
        if (coords) {
            this.fetchData(coords)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.navigation !== this.props.navigation) {
            this.fetchData(this.props.navigation.getParam('coordinates'))
        }
    }

    render() {
        const localWeather = this.state.currentWeather;
        return (
            <View
                style={styles.card}
            >
                <Search
                    city={localWeather.name || ''}
                    data={localWeather.sys || ''}
                    getWeather={this.fetchData}
                />

                {Object.keys(localWeather).length
                    ? <WeatherCard
                        icon={localWeather.weather[0].icon}
                        description={localWeather.weather[0].description}
                        temperature={localWeather.main.temp}
                    />
                    : <View style={styles.weatherContainer}>
                        <Text
                            style={styles.cityName}
                        >{this.state.error ? this.state.error : "Choose place to show weather"}</Text>
                    </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        ...StyleSheet.absoluteFillObject,
    },
    cityName: {
        fontSize: 35,
    },
    weather: {
        fontSize: 25,
        color: '#550011'
    },
    weatherContainer: {
        flex: 4
    }
});
