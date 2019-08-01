import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import DataStorage from '../../utility/DataStorage';

const WIDTH = Dimensions.get('window').width;

export default class LessonButton extends React.Component {
    state = {
        isLoading: true
    };

    handlePress = this._handlePress.bind(this);

    x = 0;
    width = 0;
    left = 0;

    render() {
        return (
            <Animatable.View animation='fadeIn'
                             delay={201}
                             duration={1300}
                             style={{ flex: 1 }}>
                {this._renderArrow(this.props.goingRight !== undefined)}
                <TouchableOpacity onPress={this.handlePress}
                                  style={[styles.buttonContainer, this._getStyle(), this._getColor() ]}>
                    <View
                        onLayout={(e) => {
                            this.x = e.nativeEvent.layout.x;
                            this.width = e.nativeEvent.layout.width;

                            this.setState({ isLoading: false });
                        }}>
                        <Text style={[styles.text, this.unavailable ? { color: '#E0E0E0' } : { color: '#4C4C4C'}]}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        )
    }

    _renderArrow() {
        if (this.props.showArrow === undefined) {
            if (this.state.isLoading) {
                return <View style={{width: verticalScale(20), height: verticalScale(20)}}/>;
            }

            return (
                <View style={this._getArrowStyle()}>
                    <Icon name='md-arrow-round-up' size={verticalScale(20)} color='#FFFFFF'/>
                </View>
            )
        }

        return null;
    }

    _handlePress() {
        if (DataStorage.lesson < this.props.index) {
            return;
        }

        this.props.onPress();
    }

    _getStyle() {
        if (this.props.right === undefined) {
            this.left = this.props.left;

            return {
                alignSelf: 'flex-start',
                left: this.props.left,
                marginLeft: scale(30),
                top: 0
            };
        }

        this.left = WIDTH - this.props.right;

        return {
            alignSelf: 'flex-end',
            right: this.props.right,
            marginRight: scale(30),
            top: 0
        }
    }

    _getColor() {
        let color;
        if (this.props.index < DataStorage.lesson) {
            color = styles.bgCompleted;
        } else if (this.props.index === DataStorage.lesson) {
            color = styles.bgCurrent;
        } else {
            this.unavailable = true;
            color = styles.bgUnavailable;
        }

        return color;
    }

    _getArrowStyle() {
        let minX;
        let maxX;

        // If going left
        if (!this.props.goingRight) {
            if (this.props.right === undefined) {
                // If measure from left
                let x = this.x + this.left + (this.width / 4);

                minX = x + (this.width * (6 / 7));
                maxX = x + (this.width * (11 / 12));
            } else {
                // If measure from right
                let x = this.left;

                minX = x - (this.width * (2 / 3));
                maxX = x - (this.width * (5 / 6));
            }


            //console.log('Minx: ' + minX + ' MaxX: ' + maxX);

            // If going right
        } else {
            if (this.props.right === undefined) {
                // If style from left
                let x = this.x + this.left;

                minX = x + (this.width / 5);
                maxX = x + (this.width / 3);
            } else {
                // If style from right
                let x = this.left - (this.width / 3);

                minX = x - (this.width * (7 / 8));
                maxX = x - (this.width * (9 / 10));
            }
        }

        let x1 = this._getRndInteger(minX, maxX);

        return {
            left: x1
        }
    }

    _getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: 0,
        marginVertical: verticalScale(10),
        height: verticalScale(64),
        borderRadius: verticalScale(32),
        borderWidth: scale(3),
    },
    text: {
        fontFamily: 'quicksand-medium',
        textAlign: 'center',
        fontSize: verticalScale(20)
    },
    bgCompleted: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFB020'
    },
    bgCurrent: {
        backgroundColor: '#FFFFFF',
        borderColor: '#1CB0F6'
    },
    bgUnavailable: {
        backgroundColor: 'transparent',
        borderColor: '#E0E0E0'
    }
});