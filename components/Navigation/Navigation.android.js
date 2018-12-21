import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import MapField from "../MapField/MapField.android";
import WeatherField from "../WeatherField/WeatherField";

const Navigation = createBottomTabNavigator({
            Map: {screen: MapField},
            Search: {screen: WeatherField}
        },
    {
        initialRouteName: 'Map'
    });

export default createAppContainer(Navigation);