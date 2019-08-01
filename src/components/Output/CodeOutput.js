import React from 'react';
import {
    View, SafeAreaView, Text, Image, ImageBackground, Animated, Dimensions, StyleSheet,
    Platform
} from 'react-native';
import Communications from 'react-native-communications';
import HTMLView from 'react-native-htmlview';
import OutputModal from "../Modals/OutputModal";
import DataStorage from '../../utility/DataStorage';
import TutorialModal from "../Modals/TutorialModal";
import Button from '../Frontend/Button';
import { scale, verticalScale } from "react-native-size-matters";
import { SuccessBanner } from '../Modals/Banners/SuccessBanner';
import { STATUSBAR_HEIGHT } from '../../styles/Constants';

export default class CodeOutput extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.triggerOverlay = this._triggerOverlay.bind(this);
        this.reset = this._reset.bind(this);

        this.bannerRight = new Animated.Value(scale(-250));

        this.state = {
            modalVisible: false,
            hasOpenedCode: false,
            code: DataStorage.code,
            msg: DataStorage.outputMsg,
            showGoodJob: DataStorage.lesson > 6 && DataStorage.lesson - DataStorage.firstLesson > 0
        };
    }

    componentDidMount() {
        if (DataStorage.username === '') {
            this.setState({
                modalVisible: true
            });
        }

        if (this.state.showGoodJob) {
            Animated.timing(this.bannerRight, {
                duration: 1500,
                toValue: scale(0)
            }).start();

            DataStorage.shownGoodJob = true;
            this.showBannerTime = setTimeout(() => {
                Animated.timing(this.bannerRight, {
                    duration: 600,
                    toValue: scale(-250)
                }).start(() => {
                    DataStorage.shownGoodJob = true;
                });
            }, 5000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.showBannerTime);
    }

    _reset() {
        this.setState({
            code: DataStorage.code
        })
    }

    render() {
        let code = this.state.code;
        let msg = this.state.msg;

        return (
                <View style={{position: 'absolute', top: verticalScale(80), bottom: 0, left: 0, right: 0}}>
                    <ImageBackground style={{flex: 1}}
                                     resizeMode='stretch'
                                     source={require('../../res/images/web_browser.png')}>
                        {this._showTutorialModal()}

                        <OutputModal
                            visible={this.state.modalVisible}
                            msg={DataStorage.lesson === 1 ? ['Congrats on making your first header!',
                                'This tab will show you the state of your website.',
                                'It\'ll also tell you what the code you wrote just did.',
                                'To see the code you\'ve written so far, click the "Code"' +
                                ' tab!'] : msg}
                            triggerOverlay={this.triggerOverlay}
                        />
                        {this._renderCode(code)}

                        <View style={{
                            position: 'absolute',
                            left: (Dimensions.get('window').width / 2) - (scale(225) / 2),
                            bottom: verticalScale(25)
                        }}>
                            <Button type='primary' disabled={false} title='Refresh' onPress={this.reset}/>
                        </View>

                        {this._showBanner()}
                        {this._drawOverlay()}
                    </ImageBackground>
                </View>
        )
    }

    _showBanner() {
        if (this.state.showGoodJob && !DataStorage.shownGoodJob) {
            return (
                <SuccessBanner right={this.bannerRight}/>
            )
        }

        return <View/>;
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
        let title = '';

        // Get title
        if (codeArr.length > 0) {
            title = codeArr[0].substring(codeArr[0].indexOf('>') + 1, codeArr[0].indexOf('</'));
        }

        const WIDTH = Dimensions.get('window').width;
        const HEIGHT = Dimensions.get('window').height;

        codeArr.forEach((str) => {
            // Don't include title or image in the rendered HTML code
            if (!str.includes('<img src=') && !str.includes('<title>'))
                codeStr += str
        });

        if (codeStr === '-') {
            return null;
        }

        if (codeStr === '' && title !== '') {
            return (
                <View style={{position: 'absolute', top: HEIGHT * 0.023, left: WIDTH * 0.1, right: WIDTH * 0.7, bottom: HEIGHT * 0.94,
                                width: WIDTH * 0.2, height: HEIGHT * 0.037 }}>
                    <Text numberOfLines={1}>{title}</Text>
                </View>
            );
        }

        if (codeStr !== undefined && codeStr !== '')
            if (DataStorage.theme.toLowerCase() === 'sports' && DataStorage.lesson >= 12)
                return (
                    <React.Fragment>
                        <View style={{ position: 'absolute', top: HEIGHT * 0.023, left: WIDTH * 0.1, right: WIDTH * 0.7, bottom: HEIGHT * 0.94,
                            width: WIDTH * 0.2, height: HEIGHT * 0.037 }}>
                            <Text numberOfLines={1}>{title}</Text>
                        </View>
                        <View style={{ position: 'absolute', top: HEIGHT * 0.17, left: 0, right: 0, bottom: 0 }}>
                            <Image style={{ width: scale(150), height: verticalScale(150) }} source={require('../../res/images/football.jpg')}/>
                            <HTMLView value={codeStr}  onLinkPress={(url) => Communications.web('http://' + url)}/>
                        </View>
                    </React.Fragment>
                );
            else if (DataStorage.theme.toLowerCase() !== 'sports' && DataStorage.lesson >= 12)
                return (
                    <React.Fragment>
                        <View style={{ position: 'absolute', top: HEIGHT * 0.023, left: WIDTH * 0.1, right: WIDTH * 0.7, bottom: HEIGHT * 0.94,
                            width: WIDTH * 0.2, height: HEIGHT * 0.037 }}>
                            <Text numberOfLines={1}>{title}</Text>
                        </View>
                        <View style={{ position: 'absolute', top: HEIGHT * 0.17, left: 0, right: 0, bottom: 0 }}>
                            <Image style={{ width: scale(150), height: verticalScale(150) }} source={require('../../res/images/concert.jpg')}/>
                            <HTMLView value={codeStr}  onLinkPress={(url) => Communications.web('http://' + url)}/>
                        </View>
                    </React.Fragment>
                );
            else {
                return (
                    <React.Fragment>
                        <View style={{ position: 'absolute', top: HEIGHT * 0.023, left: WIDTH * 0.1, right: WIDTH * 0.7, bottom: HEIGHT * 0.94,
                            width: WIDTH * 0.2, height: HEIGHT * 0.037 }}>
                            <Text numberOfLines={1}>{title}</Text>
                        </View>
                        <View style={{ position: 'absolute', top: HEIGHT * 0.17, left: 0, right: 0, bottom: 0 }}>
                            <HTMLView value={codeStr} onLinkPress={(url) => Communications.web('http://' + url)}/>
                        </View>
                    </React.Fragment>
                );
            }
    }

    _showTutorialModal() {
        if (DataStorage.lesson === 1) {
            return (
                <TutorialModal visible={true}
                               msg={['This tab shows you the state of your website! It will update after you' +
                               ' complete lessons']}/>
            )
        }

        return null;
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
    }
});

const htmlStyles = {
    title: {
        fontSize: Math.round(verticalScale(22)),
        fontFamily: 'serif'
    }
};