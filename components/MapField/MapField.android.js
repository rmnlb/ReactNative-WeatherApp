import React, {Component} from 'react'
import {StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';


let {width, height} = Dimensions.get('window');
const RATIO = width / height;
const DEF_LATITUDE = 150.0760;
const DEF_LONGITUDE = 170.8777;
const LAT_DELTA = 3;
const LONG_DELTA = LAT_DELTA * RATIO;

export default class MapField extends Component {
    state = {
        markerPos: '',
        region: {
            latitude: DEF_LATITUDE,
            longitude: DEF_LATITUDE,
            latitudeDelta: LAT_DELTA,
            longitudeDelta: LONG_DELTA,
        }
    };

    setMarkerPos = (e) => {
        this.setState({
            region: this.state.region,
            markerPos: e.nativeEvent.coordinate
        })
    };

    clearMarkerPos = () => {
        this.setState({
            region: this.state.region,
            markerPos: ''
        })
    };

    regionChange = (e) => {
        this.setState({
            region: e.nativeEvent,
            markerPos: this.state.markerPos
        })
    };

    getWeather = () => {
        this.props.navigation.navigate('Search', {
            coordinates: this.state.markerPos
        })
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((pos) => this.setState({
                markerPos: {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                },
                region: {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta
                }
            })
            ,
            (err) => this.setState({
                ...this.state,
                region: {
                    latitude: DEF_LATITUDE,
                    longitude: DEF_LONGITUDE,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta
                }
            }),
            {enableHighAccuracy: false, timeout: 2000, maximumAge: 1000}
        );
    }


    render() {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={this.state.region}
                onPress={this.clearMarkerPos}
                onLongPress={this.setMarkerPos}
                onRegionChange={this.regionChange}
            >
                {this.state.markerPos
                    ? <Marker
                        coordinate={this.state.markerPos}
                        onPress={() => {
                            this.props.navigation.navigate('Search', {
                                coordinates: this.state.markerPos
                            })
                        }
                        }
                    />
                    : null}
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
