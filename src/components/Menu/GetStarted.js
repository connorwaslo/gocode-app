import React from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Font from 'expo-font';
import DataStorage from "../../utility/DataStorage";
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import Button from '../Frontend/Button';
import { verticalScale } from 'react-native-size-matters';
import Splash from "../Splash";
import { getTimeSinceOpened } from "../../utility/DateUtil";

let loadedFonts = false;

export default class GetStarted extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false,
            isLoading: true,
            showingAnim: false,
        };

        this.start = this._start.bind(this);
        this.logIn = this._logIn.bind(this);

        this.logoTop = new Animated.Value(0);
    }

    async componentDidMount() {
        // Cache fonts
        if (!loadedFonts) {
            await Font.loadAsync({
                'quicksand': require('../../res/fonts/Quicksand-Regular.ttf'),
                'quicksand-medium': require('../../res/fonts/Quicksand-Medium.ttf'),
                'quicksand-bold': require('../../res/fonts/Quicksand-Bold.ttf'),
                'source-code': require('../../res/fonts/SourceCodePro-Regular.ttf')
            });

            console.log('Loaded fonts');
            loadedFonts = true;
            this._autoLogIn();


            this.setState({ fontLoaded: true });
        } else {
            this.setState({ isLoading: false, fontLoaded: true });
            this.logoTop = new Animated.Value(-verticalScale(120));
        }
    }

    render() {
        return (
            <View style={styles.background}>
                <Splash top={this.logoTop}/>
                {this._renderButtons()}
            </View>
        );
    }

    _renderButtons() {
        const { isLoading, fontLoaded, showingAnim } = this.state;

        if (!isLoading && fontLoaded && !showingAnim) {
            return (
                <React.Fragment>
                    <Animatable.View animation='bounceIn'
                                     delay={0}
                                     duration={500}
                                     style={styles.getStartedContainer}>
                        <Button type='primary' disabled={false} title='Create an Account' onPress={this.start}/>
                    </Animatable.View>
                    <Animatable.View animation='bounceIn'
                                     delay={0}
                                     duration={500}
                                     style={styles.loginContainer}>
                        <Button type='primary' disabled={false} title='Log In' onPress={this.logIn}/>
                    </Animatable.View>
                </React.Fragment>
            )
        }

        return null;
    }

    async _autoLogIn() {
        // Check if an account has been made
        let username = await SecureStore.getItemAsync('lastUser');

        if (username !== '-' && username !== null &&
            username !== undefined && username.trim() !== '') {

            DataStorage.username = username;

            // Login and go to HTMLLessonSelectScreen
            SecureStore.getItemAsync('lastUser')
                .then((val) => {
                    console.log('Last User: ' + val);

                    SecureStore.getItemAsync('pass')
                        .then((p) => {
                            let email = val.substring(0, val.indexOf('-at_')) + '@' + val.substring(val.indexOf('-at_') + 4, val.length);

                            console.log('Email: ' + email);

                            this.setState({ loginPass: email });

                            firebase.auth().signInWithEmailAndPassword(email, p)
                                .then(() => {
                                    // Get userId
                                    let userId = firebase.auth().currentUser.uid;

                                    // Get username
                                    firebase.database().ref('users/' + userId).once('value')
                                        .then((snapshot) => {
                                            DataStorage.username = snapshot.val().username;
                                            console.log('Got username ' + DataStorage.username);

                                            // Get lesson
                                            firebase.database().ref('lessons/' + userId + '/' + DataStorage.language + '/').once('value')
                                                .then((snapshot) => {
                                                    DataStorage.lesson = snapshot.val().lesson;
                                                    DataStorage.firstLesson = snapshot.val().lesson;

                                                    // Get code
                                                    firebase.database().ref('code/' + userId + '/' + DataStorage.language + '/project' + DataStorage.projectNum).once('value')
                                                        .then((snapshot) => {
                                                            DataStorage.code = snapshot.val().code;

                                                            // Get theme
                                                            firebase.database().ref('themes/' + userId + '/' + DataStorage.language + '/').once('value')
                                                                .then((snapshot) => {
                                                                    DataStorage.theme = snapshot.val().html;

                                                                    // Get goal
                                                                    firebase.database().ref('goals/' + userId).once('value')
                                                                        .then((snapshot) => {
                                                                            DataStorage.goal = snapshot.val().goal;

                                                                            // Get streaks
                                                                            firebase.database().ref('streaks/' + userId).once('value')
                                                                                .then((snapshot) => {
                                                                                    DataStorage.streak = snapshot.val().streak;
                                                                                    DataStorage.lastDate = snapshot.val().lastDate;

                                                                                    // Check if should add to streak
                                                                                    if (getTimeSinceOpened() === 1) {
                                                                                        DataStorage._editStreak(DataStorage.streak + 1);
                                                                                    } else if (getTimeSinceOpened() > 1) {

                                                                                        // Reset to 1 if it's been
                                                                                        // longer than a day since
                                                                                        // last used
                                                                                        DataStorage._editStreak(1);
                                                                                    }

                                                                                    const {navigate} = this.props.navigation;

                                                                                    navigate('Root');
                                                                                });
                                                                        });
                                                                });
                                                        });
                                                });
                                        });
                                })
                                .catch(() => {
                                    alert('Incorrect username/password combo');
                                    this.setState({ isLoading: false });
                                    this.splashTimer = setTimeout(() => {
                                        this.setState({
                                            isLoading: false
                                        });

                                        // Animate logo
                                        this._animSplash();

                                        clearTimeout(this.splashTimer);
                                    }, 1500);
                                });
                        }).catch((err) => {
                            alert("It's been a while since you last used GoCode. We made some changes and you'll" +
                                " have to make a new account.");
                            this._logOut();
                            this.setState({isLoading: false});
                            this.splashTimer = setTimeout(() => {
                                this.setState({
                                    isLoading: false
                                });

                                // Animate logo
                                this._animSplash();

                                clearTimeout(this.splashTimer);
                            }, 1500);
                        })
                }).catch((err) => {
                alert("Auto sign-in failed.");
                this.setState({ isLoading: false });
                this.splashTimer = setTimeout(() => {
                    this.setState({
                        isLoading: false
                    });

                    // Animate logo
                    this._animSplash();

                    clearTimeout(this.splashTimer);
                }, 1500);
            });
        } else {
            this.splashTimer = setTimeout(() => {
                this.setState({
                    isLoading: false
                });

                // Animate logo
                this._animSplash();

                clearTimeout(this.splashTimer);
            }, 1500);
        }
    }

    _animSplash() {
        this.setState({ showingAnim: true });
        Animated.spring(this.logoTop, {
            toValue: -verticalScale(120),
            duration: 650,
            bounciness: 15
        }).start();

        this.logoAnimTimer = setTimeout(() => {
            // On completed
            this.setState({
                showingAnim: false
            });

            clearTimeout(this.logoAnimTimer);
        }, 200)
    }

    _start() {
        this.props.navigation.navigate('InterestSelectScreen');
    }

    _logIn() {
        this.props.navigation.navigate('LoginScreen');
    }

    _logOut() {
        // First, delete persisted username/password/goal/interest data
        SecureStore.getItemAsync('lastUser')
            .then((user) => {
                SecureStore.setItemAsync('pass', '-')
                    .then(() => {
                        SecureStore.setItemAsync('lastUser', '-')
                            .then(() => {
                                SecureStore.setItemAsync('goal', '-')
                                    .then(() => {
                                        SecureStore.setItemAsync('interest', '-')
                                            .then(() => {
                                                DataStorage.username = '';
                                            })
                                    })
                            })
                    })
            });
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#14D4F4',
        alignItems: 'center'
    },
    getStartedContainer: {
        position: 'absolute',
        bottom: verticalScale(280)
    },
    loginContainer: {
        position: 'absolute',
        bottom: verticalScale(200)
    }
});
