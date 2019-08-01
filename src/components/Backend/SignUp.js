import React from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Text, Keyboard, TextInput, ActivityIndicator } from 'react-native';
import Button from '../Frontend/Button';
import {scale, verticalScale} from 'react-native-size-matters';
import * as SecureStore from 'expo-secure-store';
import * as firebase from 'firebase';
import {NavigationActions} from "react-navigation";
import DataStorage from '../../utility/DataStorage';
import textStyles from '../../styles/Text';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.checked = false;

        this.state = {
            username: '',
            email: '',
            password: '',
            verifyPassword: '',
            isLoading: false
        };
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior="padding" style={styles.signUpContainer}>
                    <View style={{ flex: 0.5 }}/>
                    <View style={styles.inputBlock}>
                        <Text style={styles.bodyTitle}>What's your username?</Text>
                        <TextInput
                            placeholder=""
                            underlineColorAndroid='rgba(0, 0, 0, 0)'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={value => this._onChangeText('username', value)}
                            style={styles.input}/>
                    </View>
                    <View style={styles.inputBlock}>
                        <Text style={styles.bodyTitle}>What's your email?</Text>
                        <TextInput
                            placeholder=""
                            underlineColorAndroid='rgba(0, 0, 0, 0)'
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            onChangeText={value => this._onChangeText('email', value)}
                            style={styles.input}/>
                    </View>
                    <View style={styles.inputBlock}>
                        <Text style={styles.bodyTitle}>What's your password?</Text>
                        <TextInput
                            placeholder=""
                            underlineColorAndroid='rgba(0, 0, 0, 0)'
                            autoCorrect={false}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            onChangeText={value => this._onChangeText('password', value)}
                            style={styles.input}/>
                    </View>
                    <View style={styles.inputBlock}>
                        <Text style={styles.bodyTitle}>Verify your password.</Text>
                        <TextInput
                            placeholder=""
                            underlineColorAndroid='rgba(0, 0, 0, 0)'
                            autoCorrect={false}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            onChangeText={value => this._onChangeText('verifyPassword', value)}
                            style={styles.input}/>
                    </View>
                    <Text style={textStyles.button}>Your password must be at least 6 characters long.</Text>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {this._renderButtonOrSpinner()}
                    </View>
                </KeyboardAvoidingView>
                <View style={{ flex: 0.5, backgroundColor: '#14D4F4' }}/>
            </View>
        );
    }

    _renderButtonOrSpinner() {
        if (!this.state.isLoading) {
            return (
                <Button type='primary' title='ALL DONE!' disabled={false} onPress={() => this._signUp()}/>
            )
        }

        return (
            <ActivityIndicator size='large' color='#FFFFFF' />
        )
    }

    async _signUp() {
        this.setState({ isLoading: true });
        const { username, email, password, verifyPassword } = this.state;

        if (username === '' || email === '' || password === '' || verifyPassword === '') {
            this.setState({ isLoading: false });
            return;
        }

        if (password !== verifyPassword) {
            alert('Password must mach verify password.');

            this.setState({
                isLoading: false
            });

            return;
        }

        let createAccount = true;

        // Make sure that this doesn't get called twice in a row without the user changing the username field
        if (!this.checked) {
            // Check if username already exists
            firebase.database().ref('usernames/').on('value', (snapshot) => {

                snapshot.forEach((child) => {

                    // See if username is identical to one in database and that it hasn't already found a duplicate
                    if (username === child.key && createAccount !== -1 && !this.checked) {
                        console.log('Duplicate username ' + child.key + ' Typed in: ' + username);
                        createAccount = false;
                    }
                });

                // If username is unique
                if (createAccount) {
                    createAccount = -1;

                    // Make sure an account hasn't already been created

                    if (!this.checked) {
                        // Save that already attempted to create account
                        // If this.checked doesn't exist, when adding the username to db it'll redo the loop through
                        // usernames/
                        this.checked = true;

                        // Create account
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                DataStorage.username = username;

                                // Sign in!
                                firebase.auth().signInWithEmailAndPassword(email, password)
                                    .then(() => {

                                        // Get userId
                                        let userId = firebase.auth().currentUser.uid;

                                        // Set username data in database
                                        firebase.database().ref('users/' + userId).set({
                                            username: username,
                                            email: email
                                        });

                                        let obj = {};
                                        obj[DataStorage.username] = userId;

                                        console.log(obj);

                                        firebase.database().ref('usernames/').update(obj);

                                        DataStorage._setupUser(DataStorage.theme, DataStorage.goal);

                                        // As soon as you signup successfully, store the login info for later
                                        // Save username under lastUser
                                        let savableEmail = email.substring(0, email.indexOf('@')) + '-at_' + email.substring(email.indexOf('@') + 1, email.length);

                                        SecureStore.setItemAsync('lastUser', savableEmail)
                                            .then(() => {

                                                // Save password under username
                                                SecureStore.setItemAsync('pass', password)
                                                    .then(() => {

                                                        this.setState({isLoading: false});

                                                        const {navigate} = this.props.navigation;

                                                        console.log('Nav to Root');
                                                        Keyboard.dismiss();
                                                        navigate('Root');
                                                    }).catch(() => {
                                                        this.setState({
                                                            isLoading: false
                                                        });
                                                    });
                                            }).catch(() => {
                                                this.setState({
                                                    isLoading: false
                                                });
                                            });
                                    })
                                    .catch((err) => {
                                        alert("Can't sign in " + err.message + ' ' + err.name);
                                        this.setState({
                                            isLoading: false
                                        });
                                    })
                            })
                            .catch((err) => {
                                let errorCode = err.code;

                                console.log('Failed making account b/c ' + err.message);

                                if (errorCode === 'auth/email-already-in-use') {
                                    alert('This email is already in use');
                                } else if (errorCode === 'auth/invalid-email') {
                                    alert('This email is invalid');
                                } else if (errorCode === 'auth/operation-not-allowed') {
                                    alert('Something is wrong... please send an email to gocode.courses@gmail.com');
                                } else if (errorCode === 'auth/weak-password') {
                                    alert(err.message);
                                }

                                this.setState({
                                    isLoading: false
                                });
                            });
                    }
                } else {
                    // Make sure that an account hasn't already been created
                    if (createAccount !== -1 && !this.checked) {
                        console.log('createAccount: ' + createAccount);
                        alert('That username is taken, please try another.');
                        this.setState({
                            isLoading: false
                        });
                    }
                }
            });
        }
    }

    _onChangeText(state, update) {
        if (state === 'username') {
            if (this.checked)
                this.checked = false;

            this.setState({username: update});
        } else if (state === 'email')
            this.setState({ email: update });
        else if (state === 'password')
            this.setState({ password: update });
        else if (state === 'verifyPassword')
            this.setState({ verifyPassword: update });
    }
}

const styles = StyleSheet.create({
    signUpContainer: {
        flex: 1,
        backgroundColor: '#14D4F4',
        justifyContent: 'center'
    },
    inputBlock: {
        flex: 1
    },
    input: {
        fontFamily: 'quicksand-medium',
        fontSize: verticalScale(23),
        lineHeight: verticalScale(29),
        textAlign: 'center',
        color: '#777777',
        marginHorizontal: scale(40),
        borderBottomWidth: verticalScale(1),
        borderColor: '#777777'
    },
    bodyTitle: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-bold',
        fontSize: verticalScale(23),
        lineHeight: verticalScale(29),
        textAlign: 'center',
        marginBottom: verticalScale(3)
    }
});