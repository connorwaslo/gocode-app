import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import textStyles from '../../styles/Text';

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.onPress = this._onPress.bind(this);
        this.reset = this._reset.bind(this);

        this.state = {
            active: false
        }
    }

    render() {
        const { title, style } = this.props;
        if (style !== undefined) {
            return (
                <TouchableOpacity onPress={this.props.onPress}>   {/*onPressOut={this.reset}*/}
                    <View>
                        <View style={[this._getButtonStyle(), style]}>
                            <Text style={this._getTextStyle()}>
                                {title}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <TouchableOpacity onPressIn={this.onPress} onPressOut={this.reset}>
                <View>
                    <View style={this._getButtonStyle()}>
                        <Text style={this._getTextStyle()}>
                            {title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _onPress() {
        if (!this.props.disabled) {
            this.setState({
                active: true
            });

            this.props.onPress();
            // TODO: Initiate animation that controls button width and height
        }
    }

    _reset() {
        setTimeout(() => {
            this.setState({
                active: false
            })
        }, 250);
    }

    _getButtonStyle() {
        const { disabled, type } = this.props;

        if (type === 'primary') {
            if (disabled) {
                return styles.disabledPrimary;
            }

            return this.state.active ? styles.primaryPressed : styles.primary;
        } else if (type === 'compact') {
            if (disabled) {
                return styles.disabledCompact;
            }

            return this.state.active ? styles.compactPressed : styles.compact;
        } else if (type === 'flat') {
            return styles.flat;
        }
    }

    _getTextStyle() {
        const { disabled, type } = this.props;

        if (disabled)
            return textStyles.disabledButton;

        if (type === 'flat')
            return textStyles.flatButton;

        return textStyles.button;
    }
}

const styles = StyleSheet.create({
    primary: {
        justifyContent: 'center',
        width: scale(225),
        height: verticalScale(48),
        borderRadius: verticalScale(48),
        paddingHorizontal: scale(20),
        backgroundColor: '#1CB0F6'
    },
    primaryPressed: {
        justifyContent: 'center',
        width: scale(225),
        height: verticalScale(48),
        borderRadius: verticalScale(48),
        paddingHorizontal: scale(20),
        backgroundColor: '#168CC4'
    },
    compact: {
        justifyContent: 'center',
        width: scale(115),
        height: verticalScale(32),
        borderRadius: verticalScale(32),
        paddingHorizontal: scale(12),
        backgroundColor: '#1CB0F6'
    },
    compactPressed: {
        justifyContent: 'center',
        width: scale(115),
        height: verticalScale(32),
        borderRadius: verticalScale(16),
        paddingHorizontal: scale(12),
        backgroundColor: '#168CC4'
    },
    disabledPrimary: {
        justifyContent: 'center',
        width: scale(225),
        height: verticalScale(48),
        borderRadius: verticalScale(24),
        paddingHorizontal: scale(20),
        backgroundColor: '#CFCFCF'
    },
    disabledCompact: {
        justifyContent: 'center',
        width: scale(115),
        height: verticalScale(32),
        borderRadius: verticalScale(16),
        paddingHorizontal: scale(12),
        backgroundColor: '#CFCFCF'
    },
    flat: {
        justifyContent: 'center'
    }
});