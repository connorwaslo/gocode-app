import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Button from '../../Frontend/Button';
import { NavigationActions } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import DataStorage from '../../../utility/DataStorage';
import { scale, verticalScale } from "react-native-size-matters";
import textStyles from '../../../styles/Text';
import LessonHeader from "../../Frontend/LessonHeader";

export default class Profile extends React.Component {
    constructor() {
        super();

        this.logOut = this._logOut.bind(this);
    }

    static navigationOptions = {
        header: null,
        title: 'Profile'
    };

    render() {
        // Back button opens up 1st lesson tutorial modal
        return (
            <View style={{ flex: 1 }}>
                <LessonHeader disableRight={true} disableMiddle={true} pressMap={() => this.props.navigation.goBack()}/>

                <View style={{ flex: 1 }}>
                    <View style={styles.infoBlock}>
                        <View style={{ position: 'absolute', left: scale(30) }}>
                            <Image style={{ width: scale(50), height: scale(54) }} source={require('../../../res/images/profile_icon.png')}/>
                        </View>
                        <View style={{ position: 'absolute', left: scale(130) }}>
                            <Text style={textStyles.subsectionTitleLeft}>{DataStorage.username}</Text>
                        </View>
                    </View>
                    <View style={styles.infoBlock}>
                        <View style={{ position: 'absolute', left: scale(28)}}>
                            <Image style={{ width: scale(54), height: scale(50) }} source={require('../../../res/images/coin_icon.png')}/>
                        </View>
                        <View style={{ position: 'absolute', left: scale(130) }}>
                            <Text style={textStyles.subsectionTitleLeft}>{DataStorage.lesson}</Text>
                        </View>
                    </View>
                    <View style={styles.infoBlock}>
                        <View style={{ position: 'absolute', left: scale(30)}}>
                            <Image style={{ width: scale(50), height: scale(44.67) }} source={require('../../../res/images/heart_icon.png')}/>
                        </View>
                        <View style={{ position: 'absolute', left: this._getStreakCountLeft() }}>
                            <Text style={textStyles.subsectionTitleWhite}>{DataStorage.streak}</Text>
                        </View>
                        <View style={{ position: 'absolute', left: scale(130) }}>
                            <Text style={textStyles.subsectionTitleLeft}>{this._getStreakText()}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 5, flexDirection: 'column', paddingTop: verticalScale(10) }}>
                        <Text style={[textStyles.sectionTitle, { textAlign: 'center' } ]}>Leaderboard</Text>
                        <Text style={textStyles.subsectionText}>Coming Soon!</Text>
                    </View>
                    <View style={{ flex: 1, marginBottom: verticalScale(15), justifyContent: 'center', alignItems: 'center' }}>
                        <Button type='primary' title='Log Out' disabled={false} onPress={this.logOut}/>
                    </View>
                </View>
            </View>
        )
    }

    _getStreakText() {
        if (DataStorage.streak === 1) {
            return 'Come back tomorrow!'
        } else {
            return "You're on a streak!"
        }
    }

    _getStreakCountLeft() {
        if (DataStorage.streak < 10)
            return scale(48.5);
        else if (DataStorage.streak < 100)
            return scale(45);
    }

    _logOut() {
        // First, delete persisted username/password/goal/interest data
        SecureStore.getItemAsync('lastUser')
            .then((user) => {
                SecureStore.setItemAsync(user, '-')
                    .then(() => {
                        SecureStore.setItemAsync('lastUser', '-')
                            .then(() => {
                                SecureStore.setItemAsync('goal', '-')
                                    .then(() => {
                                        SecureStore.setItemAsync('interest', '-')
                                            .then(() => {
                                                DataStorage.username = '';
                                                DataStorage.theme = '';
                                                DataStorage.code = '-';
                                                DataStorage.outputMsg = [];
                                                DataStorage.lesson = -1;
                                                DataStorage.openLesson = 0;
                                                DataStorage.goal = '';
                                                DataStorage.firstLesson = 0;

                                                const action = NavigationActions.navigate({
                                                    routeName: 'Start'
                                                });

                                                this.props.navigation.dispatch(action);
                                            })
                                    })
                            })
                    })
            });
    }
}

const styles = StyleSheet.create({
    infoBlock: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: scale(15),
        marginHorizontal: scale(10),
        paddingVertical: verticalScale(15),
        borderBottomWidth: verticalScale(1),
        borderColor: '#4C4C4C',
        alignItems: 'center'
    },
    streakText: {

    }
});

const headerStyles = StyleSheet.create({
    container: {
        height: verticalScale(80),
        backgroundColor: '#14D4F4',
        alignItems: 'center'
    },
    subsectionTitle: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-medium',
        fontSize: verticalScale(26),
        lineHeight: verticalScale(39),
        textAlign: 'center'
    },
    bodyTitle: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-bold',
        fontSize: verticalScale(19),
        lineHeight: verticalScale(29),
        textAlign: 'center'
    }
});