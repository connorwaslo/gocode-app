import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from "react-native-size-matters";

export default class LessonHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                {this._left()}
                {this._middle()}
                {this._right()}
            </View>
        )
    }

    _left() {
        if (!this.props.disableLeft) {
            return (
                <View style={{ position: 'absolute', left: 0, paddingLeft: scale(20), paddingTop: verticalScale(40) }}>
                    <TouchableOpacity onPress={this.props.pressMap}>
                        <View style={{ paddingHorizontal: scale(2), paddingVertical: verticalScale(2) }}>
                            <Text style={styles.subsectionTitle}>&lt; <Text style={styles.bodyTitle}>Map</Text></Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return null;
    }

    _middle() {
        const top = Platform.OS === 'ios' ? verticalScale(38) : verticalScale(40);

        if (!this.props.disableMiddle) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={this.props.run}>
                        <View style={{
                            paddingHorizontal: scale(3),
                            paddingBottom: verticalScale(3),
                            paddingTop: top
                        }}>
                            <Icon name='md-play' size={verticalScale(30)} style={{color: 'white'}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return null;
    }

    _right() {
        if (!this.props.disableRight) {
            return (
                <View style={{ position: 'absolute', right: 0, paddingRight: scale(20), paddingTop: verticalScale(40) }}>
                    <TouchableOpacity onPress={this.props.pressTut}>
                        <View style={{ paddingHorizontal: scale(2), paddingVertical: verticalScale(2) }}>
                            <Text style={styles.subsectionTitle}><Text style={styles.bodyTitle}>Tutorial</Text> &gt;</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return null;
    }
}

const styles = new StyleSheet.create({
    container: {
        height: verticalScale(80),
        backgroundColor: '#14D4F4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subsectionTitle: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-medium',
        fontSize: verticalScale(26),
        textAlign: 'center'
    },
    bodyTitle: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-bold',
        fontSize: verticalScale(19),
    }
});