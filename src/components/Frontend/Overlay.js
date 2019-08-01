import React from 'react';
import { Animated, View } from 'react-native';
import styles from '../../styles/Lessons';

export default class Overlay extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0)
    };

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 350
            }
        ).start();
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View
                style={[styles.blurCode, { opacity: fadeAnim }]}>

                {this.props.children}
            </Animated.View>
        )
    }
}