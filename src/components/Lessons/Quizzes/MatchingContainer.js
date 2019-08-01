import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import Button from '../../Frontend/Button';
import textStyles from "../../../styles/Text";
import { scale, verticalScale } from "react-native-size-matters";
import {STATUSBAR_HEIGHT} from "../../../styles/Constants";

const Card = (props) => (
    <TouchableOpacity {...props}>
        <View style={[cardStyle.container, props.color]}>
            <Text style={textStyles.bodyText}>{props.text}</Text>
        </View>
    </TouchableOpacity>
);

export default class MatchingContainer extends Component {
    state = {
        presses: 0,
        pressedID: -1,
        color: [],
        complete: false
    };

    next = this._nextQuestion.bind(this);

    list = [];

    componentDidMount() {
        let pairs = this.props.options;
        let tempList = [];

        // Get list to be ordered version of pairs
        let n = 0;
        pairs.forEach((obj) => {
            tempList.push({ text: obj.a, num: n });
            tempList.push({ text: obj.b, num: n });

            n++;
        });

        this.list = this._shuffle(tempList);

        // Set background colors
        let c = [];

        for (let i = 0; i < this.list.length; i++) {
            c.push({ backgroundColor: '#AFAFAF' });
        }

        this.setState({
            color: c
        });
    }

    render() {
        return (
            <Animated.View style={{ position: 'absolute', top: 0, left: this.props.left, bottom: 0 }}>
                <View style={{ flex: 1, width: Dimensions.get('window').width, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 0.5, marginTop: STATUSBAR_HEIGHT + verticalScale(30),
                                    paddingHorizontal: scale(10), justifyContent: 'center' }}>
                        <Text style={textStyles.mcQuestion}>Match the tags with{'\n'}what they do</Text>
                    </View>

                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        {this._renderOptions()}
                    </View>

                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                        {this._renderButton()}
                    </View>
                </View>
            </Animated.View>
        )
    }

    _renderOptions() {
        let render = [];
        let options = this.list.map((obj, i) => {
            return (
                <Card key={i}
                      text={obj.text}
                      color={this.state.color[i]}
                      onPress={() => this._handlePress(i)}/>
            )
        });

        let curr;
        for (let i = 0; i < options.length / 2; i++) {
            curr = [];
            for (let j = 0; j < 2; j++) {
                if (i * 2 + j < options.length)
                    curr.push(
                        <Card key={(i * 2) + j}
                              text={this.list[(i * 2) + j].text}
                              color={this.state.color[(i * 2) + j]}
                              onPress={() => this._handlePress((i * 2) + j)}/>
                    )
            }

            render.push(
                <View key={i}
                      style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {curr}
                </View>
            );
        }

        return (
            <View style={{ flex: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {render}
            </View>
        )
    }

    _renderButton() {
        if (this.state.complete) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button type='primary' disabled={false} title='Next' onPress={this.next}/>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button type='primary' disabled={true} title='Next' onPress={this.next}/>
            </View>
        );
    }

    // Fisher-Yates shuffle
    _shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // TODO: Handle correct pairing and changing colors back from green
    _handlePress(i) {
        let tempColor = this.state.color;

        // Check if already pressed
        if (tempColor[i].backgroundColor === '#FFB020') {
            return;
        }

        // If first press
        if (this.state.presses === 0) {
            tempColor[i] = { backgroundColor: '#1CB0F6' };
            this.setState({
                color: tempColor,
                pressedID: i,
                presses: 1,
            });

        } else if (this.state.presses === 1 && this.state.pressedID !== i) {
            // If second press
            let first = this.state.pressedID;

            tempColor[i] = { backgroundColor: '#1CB0F6' };
            this.setState({ color: tempColor, presses: 0 });

            // If correct
            if (this.list[first].num === this.list[i].num && first !== i) {
                let arr = tempColor;
                arr[first] = { backgroundColor: '#FFB020' };
                arr[i] = { backgroundColor: '#FFB020' };

                this.setState({ color: arr, pressedID: -1 });

                let done = true;

                // Check to see if all matched
                this.state.color.forEach((color) => {
                    if (color.backgroundColor !== '#FFB020')
                        done = false;
                });

                if (done) {
                    this.setState({
                        complete: true
                    });
                }
            } else {
                this.setState({ pressedID: -1 });

                // If incorrect
                setTimeout(() => {
                    let arr = tempColor;
                    let i = 0;
                    // Change colors to not green after a quarter second
                    tempColor.forEach((obj) => {
                        if (obj.backgroundColor === '#1CB0F6') {
                            arr[i] = { backgroundColor: '#AFAFAF' }
                        }

                        i++;
                    });

                    this.setState({
                        color: tempColor
                    })
                }, 250);
            }
        }
    }

    _nextQuestion() {
        this.props.next();
    }
}

const cardStyle = StyleSheet.create({
    container: {
        height: verticalScale(45),
        borderRadius: verticalScale(9),
        marginBottom: verticalScale(5),
        marginHorizontal: scale(2.5),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(7)
    }
});