import React, { Component } from 'react';
import { View, Animated, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Draggable from '../../Frontend/Draggable';
import {STATUSBAR_HEIGHT} from "../../../styles/Constants";
import {scale, verticalScale} from "react-native-size-matters";
import textStyles from "../../../styles/Text";
import Button from "../../Frontend/Button";

const GoalContainer = (props) => (
    <View style={styles.goal}
          onLayout={({nativeEvent: {layout: {x, y, width, height}}}) => {
              props.setGoalData(props.index, x, y + props.offset + verticalScale(10), width, height);
              alert('#' + props.index + ': X:' + x + ' Y:' + y);
          }}/>
);

const StartContainer = (props) => (
    <View style={[{ position: 'absolute', left: props.x, top: props.y, width: props.width, height: props.height}, styles.start]}/>
);

export default class DragDropContainer extends Component {
    state = {
        isLoadingHeader: true,
        isLoadingGoal: true,
        isLoadingStart: true,
        isLoadingDrags: true,
        correct: false
    };

    left = this.props.left;
    options = [];
    draggableData = [{}, {}, {}];
    startData = [{}, {}, {}];
    positions = ['', '', ''];
    offset = 0;

    setGoalData = this._setGoalData.bind(this);
    setStartData = this._setStartData.bind(this);
    setPosition = this._setPosition.bind(this);
    checkCorrect = this._checkCorrect.bind(this);
    next = this._next.bind(this);

    componentDidMount() {

    }

    render() {
        return (
            <Animated.View style={{ position: 'absolute', top: 0, left: this.left, bottom: 0 }}>
                <View style={styles.mainContainer}>
                    <View style={{ flex: 0.5, paddingTop: STATUSBAR_HEIGHT + verticalScale(30), paddingHorizontal: scale(10) }}
                          onLayout={({nativeEvent: {layout: {x,y,width,height}}}) => {
                              this.offset = height;
                              this.setState({ isLoadingHeader: false });
                          }}>

                        <Text style={textStyles.mcQuestion}>Arrange these lines in the right order</Text>
                    </View>
                    {this._renderGoals()}

                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                        {this._renderStartAreas()}
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {this._renderDraggables()}
                    </View>

                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                        <Button type='primary' title='Next' disabled={this.state.correct === false} onPress={this.next}/>
                    </View>
                </View>
            </Animated.View>
        );
    }

    _renderGoals() {
        if (!this.state.isLoadingHeader) {
            return (
                <View style={{ flex: 1, paddingTop: STATUSBAR_HEIGHT + 15 }}>
                    <GoalContainer index={0} setGoalData={this.setGoalData} offset={this.offset}/>
                    <GoalContainer index={1} setGoalData={this.setGoalData} offset={this.offset}/>
                    <GoalContainer index={2} setGoalData={this.setGoalData} offset={this.offset}/>
                </View>
            )
        }

        return null;
    }

    _renderDraggables() {
        if (!this.state.isLoadingGoal) {
            return (
                <View style={styles.row}>
                    <Draggable index={0}
                               limit={this.draggableData}
                               startPos={this.startData[0]}
                               setStartData={this.setStartData}
                               stopLoading={() => this.setState({ isLoadingDrags: false })}
                               isStartSet={this.startData[0].x !== undefined}
                               setPos={this.setPosition}
                               positions={this.positions}
                               checkCorrect={this.checkCorrect}
                               text={this.props.options[0]}
                    />
                    <Draggable index={1}
                               limit={this.draggableData}
                               startPos={this.startData[1]}
                               setStartData={this.setStartData}
                               stopLoading={() => this.setState({ isLoadingDrags: false })}
                               isStartSet={this.startData[1].x !== undefined}
                               setPos={this.setPosition}
                               positions={this.positions}
                               checkCorrect={this.checkCorrect}
                               text={this.props.options[1]}
                    />
                    <Draggable index={2}
                               limit={this.draggableData}
                               startPos={this.startData[2]}
                               setStartData={this.setStartData}
                               stopLoading={() => this.setState({ isLoadingDrags: false })}
                               isStartSet={this.startData[2].x !== undefined}
                               setPos={this.setPosition}
                               positions={this.positions}
                               checkCorrect={this.checkCorrect}
                               text={this.props.options[2]}
                    />
                </View>
            )
        }

        return null;
    }

    _renderStartAreas() {
        if (!this.state.isLoadingGoal && !this.state.isLoadingDrags) {
            return this.startData.map((obj, i) => {
                // If the x coordinate doesn't exist/isn't greater than zero, set the values to invisible
                if (!(obj.x > 0)) {
                    return <StartContainer key={i} index={i} x={-10000} y={-10000} width={obj.width} height={obj.height}/>
                }

                return (
                    <StartContainer key={i} index={i} x={obj.x} y={obj.y - verticalScale(10)} width={obj.width} height={obj.height}/>
                )
            })
        }

        return null;
    }

    _setGoalData(index, x, y, width, height) {
        this.draggableData[index] = {
            x: x,
            y: y,
            width: width,
            height: height
        };

        console.log('Index' + index);

        if (index === this.props.options.length - 1) {
            console.log('Done loading goal');
            this.setState({isLoadingGoal: false});
        }
    }

    _setStartData(index, x, y, width, height) {
        this.startData[index] = {
            x: x,
            y: y,
            width: width,
            height: height
        };
    }

    _setPosition(index, toPos) {
        this.positions[index] = toPos;
    }

    _checkCorrect() {
        console.log('Checking if correct');

        if (this.positions[0] === this.props.answer[0] &&
            this.positions[1] === this.props.answer[1] &&
            this.positions[2] === this.props.answer[2]) {

            this.setState({ correct: true });
        } else {
            if (this.state.correct === true) {
                this.setState({ correct: false });
            }
        }
    }

    _next() {
        this.props.next();
    }
}

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    goal: {
        width: Dimensions.get('window').width - 100,
        height: verticalScale(46),
        marginLeft: 50,
        marginBottom: verticalScale(8),
        borderColor: '#4F4F4F',
        borderWidth: scale(2),
        borderRadius: scale(5),
        backgroundColor: 'transparent'
    },
    start: {
        width: Dimensions.get('window').width - 100,
        height: verticalScale(46),
        backgroundColor: '#CFCFCF',
        borderRadius: scale(5)
    },
    row: {
        flex: 1,
        flexDirection: 'column',
    }
});