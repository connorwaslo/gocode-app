import React from 'react';
import {View, Animated, TouchableOpacity, Image, StyleSheet} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Splash from "../Splash";
import DataStorage from '../../utility/DataStorage';
import textStyles from '../../styles/Text';
import { scale, verticalScale } from 'react-native-size-matters';
import Button from '../Frontend/Button';
import { BlueHeader } from "./MenuHeaders";

let Theme = (props) => (
    <TouchableOpacity {...props}>
        <Animated.Image source={props.source} style={[{ width: props.size, height: props.size }, props.selected ? styles.themeSelected : styles.theme]}/>
    </TouchableOpacity>
);

export default class themeSelect extends React.Component {
    constructor() {
        super();

        this.submitTheme = this._submitTheme.bind(this);

        this.options = [
            'sports',
            'music'
        ];

        this.size = [new Animated.Value(scale(130)), new Animated.Value(scale(130))];
        this.state = {
            theme: ''
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <BlueHeader title='What are you interested in?'/>
                <View style={{flex: 8}}>
                    <View style={{flex: 7, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        {this._drawOptions()}
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button type='primary' disabled={this.state.theme === ''} title='Next' onPress={this.submitTheme}/>
                    </View>
                </View>
            </View>
        )
    }

    _drawOptions() {
        const sportsPath = require('../../res/images/sports_interest.png');
        const musicPath = require('../../res/images/music_interest.png');

        return this.options.map((str, i) => {
            return (
                <Theme key={i}
                       source={i === 0 ? sportsPath : musicPath}
                       size={this.size[i]}
                       selected={this.state.theme === str}
                       text={str}
                       onPress={() => this._selectTheme(str, i)}/>
            )
        })
    }

    _selectTheme(str, i) {
        if (str === this.state.theme) {
            // Slightly bounce
            Animated.sequence([
                Animated.timing(this.size[i], {
                    toValue: scale(150),
                    duration: 150
                }),
                Animated.spring(this.size[i], {
                    toValue: scale(160),
                    duration: 150,
                    bounciness: 10
                })
            ]).start();
        } else {
            this.setState({
                theme: str
            });

            Animated.spring(this.size[i], {
                toValue: scale(160),
                duration: 300,
                bounciness: 10
            }).start();

            Animated.spring(this.size[this.size.length - 1 - i], {
                toValue: scale(130),
                duration: 300,
                bounciness: 10
            }).start();
        }
    }

    _submitTheme() {
        DataStorage.theme = this.state.theme;

        SecureStore.setItemAsync('theme', this.state.theme)
            .then(() => {
                if (this.props.screen == null) {
                    const {navigate} = this.props.navigation;

                    navigate('GoalSelect');
                } else {
                    this.props.backToMap();
                }
            });
    }
}

const styles = StyleSheet.create({
    theme: {
        marginHorizontal: scale(10),
        borderRadius: scale(5)
    },
    themeSelected: {
        marginHorizontal: scale(10),
        borderRadius: scale(5)
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: verticalScale(5)
    }
});