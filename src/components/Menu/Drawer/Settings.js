import React from 'react';
import { View, Text, Button } from 'react-native';
import InterestSelect from "../InterestSelect";

export default class Settings extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Settings'
    };

    render() {
        return (
            <View style={{ paddingTop: 40 }}>
                <Text>This is the Settings Screen</Text>
            </View>
        )
    }

    _toMap() {
        this.props.navigation.navigate('Root')
    }
}