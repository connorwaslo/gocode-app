import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Animated, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import textStyles from '../../../styles/Text';
import {scale, verticalScale} from "react-native-size-matters";
import Button from "../../Frontend/Button";
import { STATUSBAR_HEIGHT } from '../../../styles/Constants';

let Answer = (props) => (
    <View style={{ flex: 1, flexDirection: 'row', width: Dimensions.get('window').width }}>
        <TouchableOpacity {...props}>
            <Animated.View style={[styles.goal, props.correct && !props.incorrect ? props.correctColor : null,
                                    props.incorrect && !props.correct ? props.incorrectColor : null]}>
                <Text style={[props.textStyle, {textAlign: 'left', marginRight: scale(40)}]}>{props.answer}</Text>

                <View style={{position: 'absolute', right: scale(10), alignItems: 'center'}}>
                    <Icon name={props.selected ? 'md-radio-button-on' : 'md-radio-button-off'}
                          style={{color: '#777777'}} size={verticalScale(40)}/>
                </View>
            </Animated.View>
        </TouchableOpacity>
        <View style={styles.lineBreak}/>
    </View>
);

export default class MultipleChoiceContainer extends Component {
    state = {
        selected: -1
    };

    correctAnimValue = new Animated.Value(0);
    wrongAnimValue = new Animated.Value(0);

    submit = this._submitAnswer.bind(this);
    next = this._nextQuestion.bind(this);

    render() {
        return (
            <Animated.View style={{ position: 'absolute', top: 0, left: this.props.left, bottom: 0 }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, marginTop: STATUSBAR_HEIGHT + verticalScale(45), paddingHorizontal: scale(10) }}>
                        <Text style={textStyles.mcQuestion}>{this.props.question}</Text>
                    </View>

                    {this._renderAnswers()}

                    {this._renderButton()}
                </View>
            </Animated.View>
        )
    }

    _renderAnswers() {
        const interpolateCorrect = this.correctAnimValue.interpolate({
            inputRange: [0, 150],
            outputRange: ['rgba(255, 255, 255, 0)', '#7AC70C']
        });

        const interpolateWrong = this.wrongAnimValue.interpolate({
            inputRange: [0, 150],
            outputRange: ['rgba(255, 255, 255, 0)', '#E53B3B']
        });

        const bgCorrect = { backgroundColor: interpolateCorrect };
        const bgWrong = { backgroundColor: interpolateWrong };

        return this.props.answers.map((str, i) => {
            let text;
            let style;

            // Check if the answer is code or not
            if (str.substring(0, 1) === '~') {
                text = str.substring(1, str.length);
                style = textStyles.mcAnswerCode;
            } else {
                text = str;
                style = textStyles.mcAnswer;
            }

            return (
                <Answer key={i}
                        answer={text}
                        correct={this.props.correct === i}
                        correctColor={bgCorrect}
                        incorrect={this.props.incorrect === i}
                        incorrectColor={bgWrong}
                        onPress={() => this._pressAnswer(i)}
                        selected={this.state.selected === i}
                        textStyle={style}
                />
            )
        });
    }

    _renderButton() {
        if (this.props.correct === -1) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button type='primary' disabled={this.state.selected === -1} title='Submit' onPress={this.submit}/>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button type='primary' disabled={false} title='Next' onPress={this.next}/>
            </View>
        );
    }

    _pressAnswer(i) {
        this.setState({
            selected: i
        });
    }

    _submitAnswer() {
        // Make sure that the animValue is 0 before
        this.correctAnimValue = new Animated.Value(0);
        this.wrongAnimValue = new Animated.Value(0);

        this.props.submit(this.state.selected);

        Animated.timing(this.correctAnimValue, {
            toValue: 150,
            duration: 400
        }).start();
        Animated.timing(this.wrongAnimValue, {
            toValue: 150,
            duration: 400
        }).start(() => {
            // On complete animation, set timeout and then reverse animation
            setTimeout(() => {

                Animated.timing(this.wrongAnimValue, {
                    toValue: 0,
                    duration: 400
                }).start();
            }, 2000);
        });
    }

    _nextQuestion() {
        this.props.next();
    }
}

const styles = StyleSheet.create({
    goal: {
        width: Dimensions.get('window').width - scale(25),
        minHeight: verticalScale(40),
        marginHorizontal: scale(15),
        paddingHorizontal: scale(10),
        borderRadius: verticalScale(10)
    }
});