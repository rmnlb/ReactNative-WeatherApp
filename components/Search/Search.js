import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Button, Keyboard} from 'react-native';
//import GooglePlacesAutocomplete from 'react-native-google-places-autocomplete'

export default class Search extends Component {

    state = {
        text: ''
    };

    componentDidMount() {
        this.setState({
            text: this.props.city
                ? this.props.city + ", " + this.props.data.country
                : ''
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.city !== this.props.city) {
            this.setState({
                text: this.props.city
                    ? this.props.city + ", " + this.props.data.country
                    : ''
            })
        }
    }

    render() {
        return (
            <View
            style={styles.searchContainer}
            >
                <TextInput
                    style={styles.searchField}
                    onChangeText={(text) => this.setState({text})}
                    placeholder={'Search...'}
                    value={this.state.text}
                />
            <Button
                title="Search"
                color="#2a2a2a"
                onPress={() => {
                    this.props.getWeather(this.state.text);
                    Keyboard.dismiss()
                }}
            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50
    },
    searchField: {
        flex: 1,
        fontSize: 25,
    },
});

/*<GooglePlacesAutocomplete
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder='Enter Location'
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    styles={{
                        textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth:0
                        },
                        textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        },
                    }}
                    currentLocation={false}
                />

                */