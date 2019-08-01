import React from 'react';
import { ScrollView, Image, ImageBackground, Text, SafeAreaView, View, TouchableOpacity, Dimensions, Keyboard, StyleSheet } from 'react-native';
import LessonButton from '../Frontend/LessonButton';
import { scale, verticalScale } from 'react-native-size-matters';
import { NavigationActions } from 'react-navigation';
import DataStorage from '../../utility/DataStorage';
import FeedbackModal from "../Modals/FeedbackModal";
import { MapHeader } from '../Frontend/Header';
import textStyles from '../../styles/Text';

const BUTTON_WIDTH = 178.0 / 1700;
const MUSIC_BUTTON_WIDTH = 102.0 / 1136.0;
const IMG_HEIGHT = Dimensions.get('window').width * 3.093;
const MUSIC_IMG_HEIGHT = Dimensions.get('window').width * 3.011;
const WIDTH = Dimensions.get('window').width;

export default class Map extends React.Component {
    path = '';
    titles = [
        '!doctype',
        'What are tags?',
        '<html></html>',
        'Head and Metadata',
        'Tab over',
        'Add a title',
        '<body></body>',
        'Headings',
        'Paragraphs',
        'Hyperlinks',
        'Self-closing Tags',
        'Time to Add Images!',
        'Attributes',
        'Comments',
    ];

    state = {
        isLoading: true,
        lesson: DataStorage.lesson,
        scrollY: 0
    };

    async componentDidMount() {
        const {navigate} = this.props.navigation;

        let today = new Date();
        let strToday = today.getUTCFullYear() + '-' + today.getUTCMonth() + '-' + today.getUTCDate();
        console.log('Today: ' + strToday);

        // If not logged in, force user to sign up
        if (DataStorage.username === undefined || DataStorage.username === '') {
            navigate('Problem1Screen');
            return;
        }

        this.setState({ isLoading: false });

        // Auto scroll to correct position
        const bottomY = this._getScrollViewHeight();

        if (DataStorage.lesson > 3) {
            this.scroll = this._getScrollViewHeight() - (verticalScale(104) * (DataStorage.lesson + 3));
        } else {
            this.scroll = bottomY;
        }

        if (this.scroll < 0)
            this.scroll = 0;
        else if (this.scroll > this._getScrollViewHeight())
            this.scroll = this._getScrollViewHeight();

        this.setState({
            scrollY: this.scroll
        });

        this._goValue();
    }

    render() {
        const theme = DataStorage.theme.toLowerCase();
        const path = theme === 'sports' ? require('../../res/images/static_sports_map.png') :
                                            require('../../res/images/static_music_map.png');

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        return (
                <View style={{flex: 1}}>
                    <ImageBackground source={path}
                                     style={{flex: 1, marginTop: verticalScale(20)}}>

                        <View style={{flex: 1, paddingVertical: 0, paddingHorizontal: 0, marginHorizontal: 0}}>
                            <ScrollView style={{flex: 1}}
                                        contentContainerStyle={{height: this._getScrollViewHeight()}}
                                        ref={r => this.scrollView = r}>
                                {this._renderButtons()}
                            </ScrollView>

                            {this._feedbackModal()}
                        </View>
                    </ImageBackground>
                </View>
        );
    }

    _renderButtons() {
        let buttons = [];

        let k = this.titles.length - 1;
        for (let i = 0; i < this.titles.length / 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.titles[k] !== undefined) {

                    // If diagonal right and down
                    if (i % 2 === 0) {
                        // If right
                        if (j > 1) {
                            buttons.push(
                                <LessonButton key={(i * 4) + j}
                                              index={k}
                                              title={this.titles[k]}
                                              right={(WIDTH / 2) - (j) * (WIDTH / 6)}
                                              goingRight={true}
                                              onPress={() => this._openLesson(this.titles.length - (i * 4 + j))}/>
                            )

                            // If left
                        } else {
                            if (i === 0 && j === 0) {
                                buttons.push(
                                    <LessonButton key={(i * 4) + j}
                                                  index={k}
                                                  title={this.titles[k]}
                                                  left={(j) * (WIDTH / 6)}
                                                  goingRight={true}
                                                  showArrow={false}
                                                  onPress={() => this._openLesson(this.titles.length - (i * 4 + j))}/>
                                )
                            } else {
                                buttons.push(
                                    <LessonButton key={(i * 4) + j}
                                                  index={k}
                                                  title={this.titles[k]}
                                                  left={(j) * (WIDTH / 6)}
                                                  goingRight={true}
                                                  onPress={() => this._openLesson(this.titles.length - (i * 4 + j))}/>
                                )
                            }
                        }
                    } else {
                        // If left
                        if (j > 1) {
                            buttons.push(
                                <LessonButton key={(i * 4) + j}
                                              index={k}
                                              title={this.titles[k]}
                                              left={(WIDTH / 2) - (j) * (WIDTH / 6)}
                                              goingRight={false}
                                              onPress={() => this._openLesson(this.titles.length - (i * 4 + j))}/>
                            )

                            // If right
                        } else {
                            buttons.push(
                                <LessonButton key={(i * 4) + j}
                                              index={k}
                                              title={this.titles[k]}
                                              right={(j) * (WIDTH / 6)}
                                              goingRight={false}
                                              onPress={() => this._openLesson(this.titles.length - (i * 4 + j))}/>
                            )
                        }
                    }

                    k--;
                }
            }
        }

        return buttons;
    }

    _feedbackModal() {
        // If this hasn't been opened and the user has completed the first lesson and they've completed one lesson
        // this session
        if (!DataStorage.opened && DataStorage.lesson >= 2 && DataStorage.lesson - DataStorage.firstLesson > 0) {
            DataStorage.opened = true;

            return (
                <FeedbackModal/>
            );
        }

        return null;
    }

    _openLesson(i) {
        let number = (i + 1).toString();
        let lesson = 'Problem' + number + 'Screen';

        DataStorage.shownGoodJob = false;
        DataStorage.openLesson = i;

        Keyboard.dismiss();

        const action = NavigationActions.navigate({
            routeName: lesson,
        });

        this.props.navigation.dispatch(action);
    }

    _nav(screen) {
        const action = NavigationActions.navigate({
            routeName: screen,
        });

        this.props.navigation.dispatch(action);
    }

    _goValue() {
        setTimeout(() => {
            this.scrollView.scrollTo({ x: 0, y: this.state.scrollY, animated: false })
        }, 1);
    }

    _getScrollViewHeight() {
        return verticalScale(104) * this.titles.length;
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: scale(10),
        height: verticalScale(48),
        borderRadius: verticalScale(24),
        backgroundColor: 'lightblue'
    },
    buttonShape: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: Dimensions.get('window').width * BUTTON_WIDTH,
        height: Dimensions.get('window').width * BUTTON_WIDTH,
        borderRadius: Dimensions.get('window').width * BUTTON_WIDTH / 2
    },
    musicButtonShape: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: Dimensions.get('window').width * MUSIC_BUTTON_WIDTH,
        height: Dimensions.get('window').width * MUSIC_BUTTON_WIDTH,
        borderRadius: Dimensions.get('window').width * MUSIC_BUTTON_WIDTH / 2
    },
    buttonCompleted: {
        backgroundColor: 'rgba(0, 255, 0, 0.4)',
        width: Dimensions.get('window').width * BUTTON_WIDTH,
        height: Dimensions.get('window').width * BUTTON_WIDTH,
        borderRadius: Dimensions.get('window').width * BUTTON_WIDTH / 2
    },
    musicButtonCompleted: {
        backgroundColor: 'rgba(0, 255, 0, 0.4)',
        width: Dimensions.get('window').width * MUSIC_BUTTON_WIDTH,
        height: Dimensions.get('window').width * MUSIC_BUTTON_WIDTH,
        borderRadius: Dimensions.get('window').width * MUSIC_BUTTON_WIDTH / 2
    },
    buttonUnavailable: {
        backgroundColor: 'rgba(50, 50, 50, 0.4)',
        width: Dimensions.get('window').width * BUTTON_WIDTH,
        height: Dimensions.get('window').width * BUTTON_WIDTH,
        borderRadius: Dimensions.get('window').width * BUTTON_WIDTH / 2
    },
    musicButtonUnavailable: {
        backgroundColor: 'rgba(50, 50, 50, 0.4)',
        width: Dimensions.get('window').width * MUSIC_BUTTON_WIDTH,
        height: Dimensions.get('window').width * MUSIC_BUTTON_WIDTH,
        borderRadius: Dimensions.get('window').width * MUSIC_BUTTON_WIDTH / 2
    },
    problem1: {
        position: 'absolute',
        bottom: 0.038 * IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(20)
    },
    problem2: {
        position: 'absolute',
        bottom: 0.0814 * IMG_HEIGHT,
        right: scale(113)
    },
    problem3: {
        position: 'absolute',
        bottom: 0.12 * IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(36)
    },
    problem4: {
        position: 'absolute',
        bottom: 0.178 * IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(63)
    },
    problem5: {
        position: 'absolute',
        bottom: 0.209 * IMG_HEIGHT,
        right: Dimensions.get('window').width / 2 - scale(40)
    },
    problem6: {
        position: 'absolute',
        bottom: 0.270 * IMG_HEIGHT,
        right: Dimensions.get('window').width / 2 - scale(49)
    },
    problem7: {
        position: 'absolute',
        bottom: 0.315 * IMG_HEIGHT,
        right: Dimensions.get('window').width / 2 - scale(88)
    },
    problem8: {
        position: 'absolute',
        bottom: 0.357 * IMG_HEIGHT,
        right: Dimensions.get('window').width / 2 - scale(38)
    },
    problem9: {
        position: 'absolute',
        bottom: 0.408 * IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(44)
    },
    problem10: {
        position: 'absolute',
        bottom: 0.467 * IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(54)
    },
    problem11: {
        position: 'absolute',
        bottom: 0.513 * IMG_HEIGHT,
        right: Dimensions.get('window').width / 2 - scale(33)
    },
    problem12: {
        position: 'absolute',
        bottom: 0.553 * IMG_HEIGHT,
        right: Dimensions.get('window').width / 2 - scale(80)
    },
    problem13: {
        position: 'absolute',
        bottom: 0.615 * IMG_HEIGHT,
        right: Dimensions.get('window').width / 2 - scale(84)
    },
    problem14: {
        position: 'absolute',
        bottom: 0.661 * IMG_HEIGHT,
        right: Dimensions.get('window').width / 2 - scale(45)
    },
    problem15: {
        position: 'absolute',
        bottom: 0.731 * IMG_HEIGHT,
        right: Dimensions.get('window').width / 2 - scale(47)
    },
    music_problem1: {
        position: 'absolute',
        bottom: 0.097 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem2: {
        position: 'absolute',
        bottom: 0.141 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem3: {
        position: 'absolute',
        bottom: 0.186 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem4: {
        position: 'absolute',
        bottom: 0.229 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem5: {
        position: 'absolute',
        bottom: 0.274 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem6: {
        position: 'absolute',
        bottom: 0.321 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem7: {
        position: 'absolute',
        bottom: 0.366 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem8: {
        position: 'absolute',
        bottom: 0.411 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem9: {
        position: 'absolute',
        bottom: 0.457 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem10: {
        position: 'absolute',
        bottom: 0.502 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem11: {
        position: 'absolute',
        bottom: 0.547 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem12: {
        position: 'absolute',
        bottom: 0.591 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem13: {
        position: 'absolute',
        bottom: 0.636 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem14: {
        position: 'absolute',
        bottom: 0.681 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
    music_problem15: {
        position: 'absolute',
        bottom: 0.733 * MUSIC_IMG_HEIGHT,
        left: Dimensions.get('window').width / 2 - scale(27)
    },
});
