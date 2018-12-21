import React, {Component} from 'react';
import {Alert, NetInfo, Text} from 'react-native';
import Navigation from "./components/Navigation/Navigation.android";

export default class App extends Component {
    state = {
        isConnected: false
    };

    componentDidMount() {
        NetInfo.getConnectionInfo()
            .then(connectionInfo => {
                this.setState({
                    isConnected: connectionInfo.type === 'wifi' || connectionInfo.type === 'cellular'
                });
                if(connectionInfo.type === 'none' || connectionInfo.type === 'unknown'){
                    Alert.alert('Connection problem', "Check your internet connection")
                }
            });
    }

    render() {

        return this.state.isConnected
            ? <Navigation/>
            : <Text>Loading...</Text>;
    }
}

