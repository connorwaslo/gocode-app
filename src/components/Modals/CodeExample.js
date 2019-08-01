import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default class CodeExample extends React.Component {
    render() {
        return (
            <View>
                {this._getCodeLines()}
            </View>
        )
    }

    _getCodeLines() {
        let finalCode = [];
        this.props.code.forEeach((str) => {
            finalCode.push(<Text style={styles.codeLine}>{str}</Text>)
        });
    }
}

const styles = StyleSheet.create({
    codeLine: {
        fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
        fontSize: 11
    }
});