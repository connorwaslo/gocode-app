import React from 'react';
import {SafeAreaView, View, Text, ScrollView, Animated, Dimensions, Platform} from 'react-native';
import * as firebase from 'firebase';
import DataStorage from "../../utility/DataStorage";
import { SuccessBanner } from "../Modals/Banners/SuccessBanner";
import CodeLine from '../Output/CodeLine';
import styles from '../../styles/Lessons';
import { scale, verticalScale } from "react-native-size-matters";
import Button from "../Frontend/Button";
import {STATUSBAR_HEIGHT} from "../../styles/Constants";

export default class UserCode extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();

        this.changeText = this._changeText.bind(this);
        this.saveChanges = this._saveChanges.bind(this);

        this.bannerRight = new Animated.Value(-250);

        this.state = {
            isLoading: true,
            lesson: DataStorage.lesson,
            userCode: [],
            showGoodJob: DataStorage.lesson < 7 && DataStorage.lesson - DataStorage.firstLesson > 0
        };
    }

    componentDidMount() {
        // Get code from this lesson and get which lesson
        let code = DataStorage.code;

        // If the first two lessons, just overwrite all previous code with current code
        if (this.state.lesson === 1 || this.state.lesson === 2) {
            let tempCode = this.state.userCode.slice();
            tempCode.push(code);
            this.setState({ userCode: tempCode, isLoading: false });
        } else if (DataStorage.lesson < 6) {
            this.setState({
                isLoading: false
            });
        } else {
            let userId = firebase.auth().currentUser.uid;

            // Get code
            firebase.database().ref('code/' + userId + '/' + DataStorage.language + '/project' + DataStorage.projectNum).once('value')
                .then((snapshot) => {
                    let oldCode = snapshot.val().code.split('~!', (snapshot.val().code.match(new RegExp("~!", "g")) || []).length);

                    let tempCode = this.state.userCode.slice();
                    oldCode.forEach((line) => {
                        tempCode.push(line);
                    });

                    this.setState({ userCode: tempCode });

                    this.setState({ isLoading: false });
                }).catch((err) => {
                    alert("We couldn't get your code for some reason...");
                    console.log('Err: ' + err.message);
            })
        }

        if (this.state.showGoodJob) {
            Animated.timing(this.bannerRight, {
                duration: 1000,
                toValue: scale(0)
            }).start(() => {
                DataStorage.shownGoodJob = true;
            });

            this.showBannerTime = setTimeout(() => {
                Animated.timing(this.bannerRight, {
                    duration: 600,
                    toValue: scale(-250)
                }).start(() => {
                    DataStorage.shownGoodJob = true;
                });
            }, 3500);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.showBannerTime);
    }

    _changeText(text, index) {
        let tempCode = this.state.userCode.slice();
        tempCode[index] = text;

        this.setState({
            userCode: tempCode
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>Loading...</Text>
                </View>
            )
        }

        return (

            <View style={{position: 'absolute', top: verticalScale(80), left: 0, right: 0, bottom: 0}}>
                <View style={{
                    position: 'absolute',
                    top: STATUSBAR_HEIGHT,
                    left: 0,
                    right: 0,
                    bottom: verticalScale(70)
                }}>
                    {this._pickLesson()}
                </View>

                {this._showBanner()}

                <View style={{
                    position: 'absolute',
                    left: (Dimensions.get('window').width / 2) - (scale(225) / 2),
                    bottom: verticalScale(15)
                }}>
                    <Button type='primary' disabled={false} title='Save Changes' onPress={this.saveChanges}/>
                </View>
            </View>
        )
    }

    _saveChanges() {
        // Sum changed user code
        let totalCode = '';

        this.state.userCode.forEach((str) => {
            totalCode += str + '~!'
        });

        DataStorage.code = totalCode;

        DataStorage._editCode(DataStorage.code);
    }

    _showBanner() {
        if (this.state.showGoodJob && !DataStorage.shownGoodJob) {
            return (
                <View style={{ position: 'absolute', top: Dimensions.get('window').height - verticalScale(50), bottom: verticalScale(40) }}>
                    <SuccessBanner right={this.bannerRight}/>
                </View>
            )
        }

        return <View/>;
    }

    _pickLesson() {
        if (DataStorage.lesson === 1)
            return this._lesson2();
        else if (DataStorage.lesson === 2)
            return this._lesson2();
        else if (DataStorage.lesson === 3)
            return this._lesson3();
        else if (DataStorage.lesson === 4)
            return this._lesson4();
        else if (DataStorage.lesson === 5)
            return this._lesson5();
        else if (DataStorage.lesson === 6)
            return this._lesson6();
        else if (DataStorage.lesson === 7)
            return this._lesson7();
        else if (DataStorage.lesson === 8)
            return this._lesson8();
        else if (DataStorage.lesson === 9)
            return this._lesson9();
        else if (DataStorage.lesson === 10)
            return this._lesson10();
        else if (DataStorage.lesson === 11)
            return this._lesson11();
        else if (DataStorage.lesson === 12)
            return this._lesson12();
        else if (DataStorage.lesson === 13)
            return this._lesson13();
        else if (DataStorage.lesson === 14)
            return this._lesson14();
    }

    _lesson2() {
        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson3() {
        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson4() {
        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={0} code={'<head>'} editable={false}/>
                <CodeLine lineNum={4} tabs={0} code={'</head>'} editable={false}/>
                <CodeLine lineNum={5} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson5() {
        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={1} code={'<head>'} editable={false}/>
                <CodeLine lineNum={4} tabs={1} code={'</head>'} editable={false}/>
                <CodeLine lineNum={5} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    // TODO: Popup that lets users know they can edit that code
    _lesson6() {
        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={1} code={'<head>'} editable={false}/>
                <CodeLine lineNum={4} tabs={0} code={this.state.userCode[0]} editable={true}/>
                <CodeLine lineNum={5} tabs={1} code={'</head>'} editable={false}/>
                <CodeLine lineNum={6} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson7() {
        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={1} code={'<head>'} editable={false}/>
                <CodeLine lineNum={4} tabs={0} code={this.state.userCode[0]} editable={true}/>
                <CodeLine lineNum={5} tabs={1} code={'</head>'} editable={false}/>
                <CodeLine lineNum={6} tabs={1} code={'<body>'} editable={false}/>
                <CodeLine lineNum={7} tabs={1} code={'</body>'} editable={false}/>
                <CodeLine lineNum={8} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson8() {
        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={1} code={'<head>'} editable={false}/>
                <CodeLine lineNum={4} tabs={0} code={this.state.userCode[0]} editable={true}/>
                <CodeLine lineNum={5} tabs={1} code={'</head>'} editable={false}/>
                <CodeLine lineNum={6} tabs={1} code={'<body>'} editable={false}/>
                <CodeLine lineNum={7} tabs={0} code={this.state.userCode[1]} editable={true}/>
                <CodeLine lineNum={8} tabs={1} code={'</body>'} editable={false}/>
                <CodeLine lineNum={9} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson9() {
        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={1} code={'<head>'} editable={false}/>
                <CodeLine lineNum={4} tabs={0} code={this.state.userCode[0]} editable={true}/>
                <CodeLine lineNum={5} tabs={1} code={'</head>'} editable={false}/>
                <CodeLine lineNum={6} tabs={1} code={'<body>'} editable={false}/>
                <CodeLine lineNum={7} tabs={0} code={this.state.userCode[1]} editable={true}/>
                <CodeLine lineNum={8} tabs={0} code={this.state.userCode[2]} editable={true}/>
                <CodeLine lineNum={9} tabs={1} code={'</body>'} editable={false}/>
                <CodeLine lineNum={10} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson10() {
        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={1} code={'<head>'} editable={false}/>
                <CodeLine lineNum={4} tabs={0} code={this.state.userCode[0]} editable={true}/>
                <CodeLine lineNum={5} tabs={1} code={'</head>'} editable={false}/>
                <CodeLine lineNum={6} tabs={1} code={'<body>'} editable={false}/>
                <CodeLine lineNum={7} tabs={0} code={this.state.userCode[1]} editable={true}/>
                <CodeLine lineNum={8} tabs={0} code={this.state.userCode[2]} editable={true}/>
                <CodeLine lineNum={9} tabs={0} code={this.state.userCode[3]} editable={true}/>
                <CodeLine lineNum={10} tabs={1} code={'</body>'} editable={false}/>
                <CodeLine lineNum={11} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson11() {
        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={1} code={'<head>'} editable={false}/>
                <CodeLine lineNum={4} tabs={0} code={this.state.userCode[0]} editable={true}/>
                <CodeLine lineNum={5} tabs={1} code={'</head>'} editable={false}/>
                <CodeLine lineNum={6} tabs={1} code={'<body>'} editable={false}/>
                <CodeLine lineNum={7} tabs={0} code={this.state.userCode[1]} editable={true}/>
                <CodeLine lineNum={8} tabs={0} code={this.state.userCode[2]} editable={true}/>
                <CodeLine lineNum={9} tabs={0} code={this.state.userCode[3]} editable={true}/>
                <CodeLine lineNum={10} tabs={0} code={this.state.userCode[4]} editable={true}/>
                <CodeLine lineNum={11} tabs={1} code={'</body>'} editable={false}/>
                <CodeLine lineNum={12} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson12() {
        const path = DataStorage.theme.toLowerCase() === 'sports' ? 'football.jpg' : 'concert.jpg';

        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={1} code={'<head>'} editable={false}/>
                <CodeLine lineNum={4} tabs={0} code={this.state.userCode[0]} editable={true}/>
                <CodeLine lineNum={5} tabs={1} code={'</head>'} editable={false}/>
                <CodeLine lineNum={6} tabs={1} code={'<body>'} editable={false}/>
                <CodeLine lineNum={7} tabs={2} code={'<img src="' + path + '">'} editable={false}/>
                <CodeLine lineNum={8} tabs={0} code={this.state.userCode[1]} editable={true}/>
                <CodeLine lineNum={9} tabs={0} code={this.state.userCode[2]} editable={true}/>
                <CodeLine lineNum={10} tabs={0} code={this.state.userCode[3]} editable={true}/>
                <CodeLine lineNum={11} tabs={0} code={this.state.userCode[4]} editable={true}/>
                <CodeLine lineNum={12} tabs={1} code={'</body>'} editable={false}/>
                <CodeLine lineNum={13} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson13() {
        const path = DataStorage.theme.toLowerCase() === 'sports' ? 'football.jpg' : 'concert.jpg';

        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={2} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={1} code={'<head>'} editable={false}/>
                <CodeLine lineNum={4} tabs={0} code={this.state.userCode[0]} editable={true}/>
                <CodeLine lineNum={5} tabs={1} code={'</head>'} editable={false}/>
                <CodeLine lineNum={6} tabs={1} code={'<body>'} editable={false}/>
                <CodeLine lineNum={7} tabs={2} code={'<img src="' + path + '" width="150" height="150">'} editable={false}/>
                <CodeLine lineNum={8} tabs={0} code={this.state.userCode[1]} editable={true}/>
                <CodeLine lineNum={9} tabs={0} code={this.state.userCode[2]} editable={true}/>
                <CodeLine lineNum={10} tabs={0} code={this.state.userCode[3]} editable={true}/>
                <CodeLine lineNum={11} tabs={0} code={this.state.userCode[4]} editable={true}/>
                <CodeLine lineNum={12} tabs={1} code={'</body>'} editable={false}/>
                <CodeLine lineNum={13} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }

    _lesson14() {
        const path = DataStorage.theme.toLowerCase() === 'sports' ? 'football.jpg' : 'concert.jpg';

        return (
            <ScrollView style={styles.codeOutputContainer}>
                <CodeLine lineNum={1} tabs={0} code={this.state.userCode[5]} editable={true} changeText={this.changeText} index={5}/>
                <CodeLine lineNum={2} tabs={0} code={'<!doctype html>'} editable={false}/>
                <CodeLine lineNum={3} tabs={0} code={'<html>'} editable={false}/>
                <CodeLine lineNum={4} tabs={1} code={'<head>'} editable={false}/>
                <CodeLine lineNum={5} tabs={0} code={this.state.userCode[0]} editable={true} changeText={this.changeText} index={0}/>
                <CodeLine lineNum={6} tabs={1} code={'</head>'} editable={false}/>
                <CodeLine lineNum={7} tabs={1} code={'<body>'} editable={false}/>
                <CodeLine lineNum={8} tabs={2} code={'<img src="' + path + '" width="150" height="150">'} editable={false} changeText={this.changeText}/>
                <CodeLine lineNum={9} tabs={0} code={this.state.userCode[1]} editable={true} changeText={this.changeText} index={1}/>
                <CodeLine lineNum={10} tabs={0} code={this.state.userCode[2]} editable={true} changeText={this.changeText} index={2}/>
                <CodeLine lineNum={11} tabs={0} code={this.state.userCode[3]} editable={true} changeText={this.changeText} index={3}/>
                <CodeLine lineNum={12} tabs={0} code={this.state.userCode[4]} editable={true} changeText={this.changeText} index={4}/>
                <CodeLine lineNum={13} tabs={1} code={'</body>'} editable={false}/>
                <CodeLine lineNum={14} tabs={0} code={'</html>'} editable={false}/>
            </ScrollView>
        )
    }
}