import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export default class ModalButton extends React.Component {
    constructor() {
        super();

        this.onPress = this._onPress.bind(this);
    }

    render() {
        const { title } = this.props;

        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={this._getButtonStyle()}>
                    <Text style={this._getTextStyle()}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    _onPress() {
        this.props.onPress();
    }

    _getButtonStyle() {
        if (this.props.solid === true) {
            return styles.solid;
        }

        return styles.border;
    }

    _getTextStyle() {
        if (this.props.solid === true) {
            return styles.solidText;
        }

        return styles.borderText;
    }
}

const styles = StyleSheet.create({
    solid: {
        width: scale(100),
        height: verticalScale(32),
        backgroundColor: '#FFFFFF',
        borderRadius: verticalScale(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(15)
    },
    solidText: {
        color: '#8549BA',
        fontFamily: 'quicksand-bold',
        textAlign: 'center',
        fontSize: verticalScale(17),
        lineHeight: verticalScale(23)
    },
    border: {
        width: scale(100),
        height: verticalScale(32),
        backgroundColor: '#8549BA',
        borderRadius: verticalScale(8),
        borderWidth: scale(2),
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(15)
    },
    borderText: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-bold',
        textAlign: 'center',
        fontSize: verticalScale(17),
        lineHeight: verticalScale(23)
    }
});