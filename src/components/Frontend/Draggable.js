import React, { Component } from 'react';
import {View, Text, PanResponder, Animated, StyleSheet, Dimensions} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import textStyles from '../../styles/Text';

export default class Draggable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDraggable: true,
            dropAreaValues: null,
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1)
        };

        this.landingZone = -1;
        this._val = { x: 0, y: 0 };
        this.state.pan.addListener((value) => this._val = value);
        this.currCoords = {x: 0, y: 0};

        // TODO: If already loaded, don't let the start zone move again
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => {
                if (!this.props.isStartSet) {
                    this.props.setStartData(this.props.index, e.nativeEvent.pageX - e.nativeEvent.locationX,
                        e.nativeEvent.pageY - e.nativeEvent.locationY,
                        Dimensions.get('window').width - 100, verticalScale(46));

                    this.props.stopLoading();
                }

                return true;
            },
            onPanResponderGrant: (e, gesture) => {
                this.currCoords = {
                    x: (gesture.x0) + (gesture.moveX - (e.nativeEvent.pageX - e.nativeEvent.locationX)),
                    y: (gesture.y0) + (gesture.moveY - (e.nativeEvent.pageY - e.nativeEvent.locationY))
                };
                this.state.pan.setOffset({
                    x: this._val.x,
                    y: this._val.y
                });
                this.state.pan.setValue({ x:0, y:0 });
                console.log('Set');
            },
            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
            onPanResponderRelease: (e, gesture) => {
                this.e = e;
                this.gesture = gesture;

                this._handleDrop(e, gesture);
            }
        });
    }

    isDropArea(gesture) {
        let top, left, right, bottom;
        let colliding = false;

        let i = 0;
        this.props.limit.forEach((obj) => {
            top = obj.y;
            left = obj.x;
            right = obj.x + obj.width;
            bottom = obj.y + obj.height;

            // If colliding
            if (gesture.moveY > top &&
                gesture.moveY < bottom &&
                gesture.moveX > left &&
                gesture.moveX < right) {

                this.landingZone = i;
                console.log('Colliding with ' + i);
                colliding = true;
            } else {
                i++;
            }
        });

        console.log('Landing Zone:', this.landingZone);

        return colliding;
    }

    _handleDrop(e, gesture) {
        let lastZone = this.landingZone;
        console.log('Last Zone: ' + lastZone);

        // Set the current coordinates of this Draggable
        // Why the fuck is this all negative LMAO
        this.currCoords = {
            x: -((-gesture.x0) + (gesture.moveX - (e.nativeEvent.pageX - e.nativeEvent.locationX))),
            y: -((-gesture.y0) + (gesture.moveY - (e.nativeEvent.pageY - e.nativeEvent.locationY)))
        };

        // If already collided
        if (this.landingZone !== -1) {

            // If colliding again
            if (this.isDropArea(gesture)) {

                // If colliding with the same goal
                if (lastZone === this.landingZone) {
                    console.log('Colliding with the same one');
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 5
                    }).start();

                    // If colliding with a different goal
                } else {
                    console.log('Colliding with a different goal and has already collided');

                    // Check to see which Draggable is already at that Goal
                    let other = this.props.positions[this.landingZone];

                    // If spot is filled, move back to previous location
                    if (other !== '') {

                        console.log('Not taking ' + other + '\'s spot');
                        Animated.spring(this.state.pan, {
                            toValue: { x: 0,
                                y: 0 },
                            friction: 5
                        }).start();

                        this.landingZone = lastZone;

                        // If spot is not filled, then fill this spot
                    } else {
                        this.props.setPos(lastZone, '');
                        this.props.setPos(this.landingZone, this.props.text);

                        Animated.spring(this.state.pan, {
                            toValue: { x: (this.props.limit[this.landingZone].x - this.currCoords.x),
                                y: (this.props.limit[this.landingZone].y - this.currCoords.y) },
                            friction: 5
                        }).start();
                        }
                }
            } else {
                // If not colliding with anything
                this.props.setPos(lastZone, '');

                this.landingZone = -1;

                // Return to start
                Animated.spring(this.state.pan, {
                    toValue: { x: (this.props.startPos.x - this.currCoords.x),
                        y: (this.props.startPos.y - this.currCoords.y) },
                    friction: 5
                }).start();
            }

            // If colliding for the first time
        } else {
            if (!this.isDropArea(gesture)) {

                Animated.spring(this.state.pan, {
                    toValue: { x: 0,
                        y: 0 },
                    friction: 5
                }).start();

            } else {
                Animated.spring(this.state.pan, {
                    toValue: { x: (this.props.limit[this.landingZone].x - this.currCoords.x),
                        y: (this.props.limit[this.landingZone].y - this.currCoords.y) },
                    friction: 5
                }).start();

                let other = this.props.positions[this.landingZone];

                console.log('Other:' + other);

                // If spot is filled, go back to start
                if (other !== '') {

                    Animated.spring(this.state.pan, {
                        toValue: { x: 0,
                            y: 0 },
                        friction: 5
                    }).start();

                    // If the spot is not filled, fill it
                } else {
                    this.props.setPos(this.landingZone, this.props.text);

                    Animated.spring(this.state.pan, {
                        toValue: { x: (this.props.limit[this.landingZone].x - this.currCoords.x),
                            y: (this.props.limit[this.landingZone].y - this.currCoords.y) },
                        friction: 5
                    }).start();
                }
            }
        }

        this.props.checkCorrect();

        this.currCoords = {
            x: -((-gesture.x0) + (gesture.moveX - (e.nativeEvent.pageX - e.nativeEvent.locationX))),
            y: -((-gesture.y0) + (gesture.moveY - (e.nativeEvent.pageY - e.nativeEvent.locationY)))
        };

        alert('Positions: ' + this.props.positions);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.renderDraggable()}
            </View>
        );
    }

    renderDraggable() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        };

        return (
            <View style={{position: "absolute"}}>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[panStyle, styles.rect]}>

                    <Text style={[textStyles.draggableCode, { paddingLeft: scale(5) }]}>{this.props.text}</Text>
                </Animated.View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    rect: {
        backgroundColor: '#1CB0F6',
        width: Dimensions.get('window').width - 100,
        borderRadius: scale(5),
        paddingVertical: verticalScale(10)
    }
});