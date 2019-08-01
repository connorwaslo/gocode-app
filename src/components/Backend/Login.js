import React from 'react';
import { View, StyleSheet, Text, TextInput, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
import Button from '../Frontend/Button';
import { scale, verticalScale } from 'react-native-size-matters';
import * as firebase from 'firebase';
import DataStorage from '../../utility/DataStorage';
import * as SecureStore from 'expo-secure-store';
import textStyles from '../../styles/Text';

const Header = (props) => (
    <View style={headerStyles.container}>
        <View style={{position: 'absolute', left: 0, paddingLeft: scale(20), paddingTop: verticalScale(40)}}>
            <TouchableOpacity onPress={props.onPress}>
                <View style={{paddingHorizontal: scale(2), paddingVertical: verticalScale(2)}}>
                    <Text style={headerStyles.subsectionTitle}>&lt; <Text style={headerStyles.bodyTitle}>Back</Text></Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
);

export default class Login extends React.Component {
    constructor() {
        super();

        this.login = this._login.bind(this);

        this.state = {
            email: '',
            password: '',
            showSpinner: false
        }
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.loginContainer}>
                <Header onPress={() => this.props.navigation.goBack()}/>
                <View style={{ flex: 1 }}/>
                <View style={styles.inputContainerTop}>
                    <TextInput
                        placeholder="email"
                        placeholderTextColor="#CFCFCF"
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={value => this._onChangeText('email', value)}
                        style={textStyles.textInput}/>
                </View>
                <View style={styles.inputContainerBottom}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#CFCFCF"
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={value => this._onChangeText('password', value)}
                        style={textStyles.textInput}/>
                </View>

                <View style={{ flex: 1 }}/>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {this._renderButtonOrSpinner()}
                </View>
                <View style={{ flex: 0.75 }}/>
                    <Button type='flat' title="Forgot Password" disabled={false} onPress={() => {}}/>
                <View style={{ flex: 8}}/>
            </View>
        );
    }

    _renderButtonOrSpinner() {
        // If not loading anything
        if (!this.state.showSpinner) {
            return (
                <Button type='primary' title="Log In" disabled={false} onPress={this.login} />
            )
        }

        // If render spinner
        return (
            <ActivityIndicator size='large' color='#FFFFFF' />
        )
    }

    _onChangeText(state, update) {
        if (state === 'email')
            this.setState({ email: update });
        else if (state === 'password')
            this.setState({ password: update });
    }

    async _login() {
        const { email, password } = this.state;

        this.setState({
            showSpinner: true
        });

        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
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
                                    firebase.database().ref('code/' + userId + '/' + DataStorage.language + '/').once('value')
                                        .then((snapshot) => {
                                            DataStorage.code = snapshot.val().code;

                                            // Get theme
                                            firebase.database().ref('themes/' + userId + '/' + DataStorage.language + '/').once('value')
                                                .then((snapshot) => {
                                                    // TODO: When more languages added, add a switch
                                                    DataStorage.theme = snapshot.val().html;

                                                    // Get goal
                                                    firebase.database().ref('goals/' + userId).once('value')
                                                        .then((snapshot) => {
                                                            DataStorage.goal = snapshot.val().goal;

                                                            // Save username under lastUser
                                                            // Remove at sign from email so that Expo can save it
                                                            let savableEmail = email.substring(0, email.indexOf('@')) + '-at_' + email.substring(email.indexOf('@') + 1, email.length);
                                                            SecureStore.setItemAsync('lastUser', savableEmail)
                                                                .then(() => {

                                                                    // Save password under username
                                                                    SecureStore.setItemAsync('pass', password)
                                                                        .then(() => {

                                                                            console.log('Password: ' + password);

                                                                            console.log('DataStorage.username: ' + DataStorage.username);
                                                                            console.log('DataStorage.theme: ' + DataStorage.theme);
                                                                            console.log('DataStorage.code: ' + DataStorage.code);
                                                                            console.log('DataStorage.goal: ' + DataStorage.goal);
                                                                            console.log('DataStorage.lesson: ' + DataStorage.lesson);

                                                                            const {navigate} = this.props.navigation;

                                                                            Keyboard.dismiss();

                                                                            navigate('Root');
                                                                        }).catch(() => {
                                                                            this.setState({
                                                                                showSpinner: false
                                                                            });
                                                                        });
                                                                }).catch(() => {
                                                                    this.setState({
                                                                        showSpinner: false
                                                                    });
                                                                });
                                                        });
                                                });
                                        });
                                });
                        });
                })
                .catch(() => {
                    alert('Incorrect username/password combo');
                    this.setState({
                        showSpinner: false
                    });
                });
        } catch(err) {
            alert('Error signing in');

            this.setState({
                showSpinner: false
            });
        }
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: '#14D4F4',
        justifyContent: 'center',
    },
    inputContainerTop: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#AFAFAF',
        borderWidth: scale(2),
        marginHorizontal: scale(15),
        paddingHorizontal: scale(30),
        paddingVertical: verticalScale(10)
    },
    inputContainerBottom: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#AFAFAF',
        borderLeftWidth: scale(2),
        borderRightWidth: scale(2),
        borderBottomWidth: scale(2),
        marginHorizontal: scale(15),
        paddingHorizontal: scale(30),
        paddingVertical: verticalScale(10)
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: scale(300),
        height: scale(120),
        resizeMode: 'contain'
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
    }
});