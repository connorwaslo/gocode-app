import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import textStyles from '../../styles/Text';

export default class TagButton extends React.Component {
    constructor(props) {
        super(props);

        this.inputTag = this._inputTag.bind(this);
    }

    render() {
        return (
            <TouchableOpacity style={{ flex: 1, height: 60 }} onPress={this.inputTag}>
                <View style={styles.button}>
                    <Text style={textStyles.shortCutButton}>{this.props.tag}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _inputTag() {
        this.props.press(this.props.tag);
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#CFCFCF',
        borderWidth: scale(1),
        borderColor: '#4C4C4C',
        height: verticalScale(35),
        justifyContent: 'center',
        alignItems: 'center'
    }
});
