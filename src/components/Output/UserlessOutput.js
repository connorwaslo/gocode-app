import React from 'react';
import {View, Text, StyleSheet, ImageBackground, SafeAreaView, Platform} from 'react-native';
import Button from '../Frontend/Button';
import LessonModal from '../Modals/LessonModal';
import {NavigationActions} from "react-navigation";
import DataStorage from '../../utility/DataStorage';
import { scale, verticalScale } from 'react-native-size-matters';
import {STATUSBAR_HEIGHT} from "../../styles/Constants";

export default class UserlessOutput extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.triggerOverlay = this._triggerOverlay.bind(this);

        this.state = {
            modalVisible: false,
            hasOpenedCode: false,
            code: DataStorage.code,
            loggedIn: true,
            showGoodJob: false
        }
    }

    componentDidMount() {
        if (DataStorage.username === '') {
            this.setState({
                loggedIn: false,
                modalVisible: true
            });
        }
    }

    render() {
        let code = this.state.code;

        return (
                <View style={{position: 'absolute', top: STATUSBAR_HEIGHT, bottom: 0, left: 0, right: 0}}>
                    <ImageBackground style={{flex: 1}}
                                     resizeMode='stretch'
                                     onError={({nativeEvent: {error}}) => console.log('Error:', error)}
                                     source={require('../../res/images/web_browser.png')}>
                        <View style={{flex: 1, paddingHorizontal: scale(20), paddingVertical: verticalScale(30)}}>

                            <View>
                                <LessonModal
                                    visible={this.state.modalVisible}
                                    msg={['Congrats on making your first header!',
                                        'This is just step one on your way to making a sweet website!',
                                        'As you write more code, you\'ll see your website progress.',
                                        'You\'ll also be able to see all the code that you\'ve written so far.',
                                        'Sign Up now and learn all about HTML for FREE!']}
                                    triggerOverlay={this.triggerOverlay}
                                />
                                {this._renderCode(code)}

                            </View>

                            <View style={{flex: 8}}/>

                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Button type='primary' title='Sign Up' disabled={false} onPress={() => {
                                    const action = NavigationActions.navigate({
                                        routeName: 'SignUpScreen'
                                    });

                                    this.props.navigation.dispatch(action);
                                    DataStorage.code = '-';
                                }}/>
                            </View>

                            {this._drawOverlay()}
                        </View>
                    </ImageBackground>
                </View>
        )
    }

    _triggerOverlay() {
        let alt = !this.state.modalVisible;
        this.setState({
            modalVisible: alt
        });
    }

    _drawOverlay() {
        if (this.state.modalVisible)
            return <View style={styles.blur}/>
    }

    _renderCode(code) {
        // Eliminate the comma at the end
        let codeArr = code.split('~!');
        let codeStr = '';
        codeArr.forEach((str) => codeStr += str);

        if (codeStr === '-')
            return <View/>;
        if (codeStr !== undefined && codeStr !== '')
            return <Text style={styles.code}>{codeStr}</Text>
    }
}

const styles = StyleSheet.create({
    nextButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10
    },
    blur: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    explanation: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    code: {
        position: 'absolute',
        top: verticalScale(100),
        fontSize: Math.round(verticalScale(22)),
        fontFamily: 'serif'
    }
});
