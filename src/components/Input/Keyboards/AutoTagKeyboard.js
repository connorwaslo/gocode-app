import React from 'react';
import {Text, StyleSheet, KeyboardAvoidingView, Animated, View} from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import TagButton from '../TagButton';
import DataStorage from '../../../utility/DataStorage';

export default class AutoTagKeyboard extends React.Component {
    constructor(props) {
        super(props);

        this.onButtonPressed = this._onButtonPressed.bind(this);
        this.tabOver = this._tabOver.bind(this);
    }

    //styles.keyboardContainer
    render() {
        return (
            <View>
                {this._renderShortcuts()}
            </View>
        );
    }

    _renderShortcuts() {
        return (
            <Animated.View style={[styles.menuContainer, { bottom: this.props.padding }]}>
                <View style={styles.buttonsView}>
                    {this._tagButtons()}
                    {this._tabA()}
                </View>
            </Animated.View>
        )
    }

    _tagButtons() {
        // Check for each one in the buttons prop
        let buttons = [];
        let i = 0;

        this.props.buttons.forEach((str) => {
            if (str === '<')
                buttons.push(<TagButton key={i} tag="<" press={this.onButtonPressed}/>);
            else if (str === '>')
                buttons.push(<TagButton key={i} tag=">" press={this.onButtonPressed}/>);
            else if (str === '/')
                buttons.push(<TagButton key={i} tag="/" press={this.onButtonPressed}/>);
            else if (str === '=')
                buttons.push(<TagButton key={i} tag="=" press={this.onButtonPressed}/>);
            else if (str === '"')
                buttons.push(<TagButton key={i} tag='"' press={this.onButtonPressed}/>);

            i++;
        });

        if (buttons === [])
            return null;

        return buttons;

        /*if (DataStorage.openLesson !== 5) {
            return (
                <React.Fragment>
                    <TagButton tag="<" press={this.onButtonPressed}/>
                    <TagButton tag="/" press={this.onButtonPressed}/>
                    <TagButton tag=">" press={this.onButtonPressed}/>
                </React.Fragment>
            );
        }*/
    }

    _tabA() {
        if (this.props.showTabMenu && DataStorage.openLesson > 4)
            return <TagButton shortcut={false} tag="Tab >" press={this.tabOver} color='green'/>

        return <View/>
    }

    _onButtonPressed(tag) {
        this.props.pressButton(tag.toString());
    }

    _tabOver() {
        this.props.tab();
    }
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        flexDirection: 'row'
        /*position: 'absolute',
        bottom: 0*/
    },
    title: {
        paddingLeft: 10,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 'bold'
    },
    menuContainer: {
        position: 'absolute',
        left: 0,
        right: 0
    },
    buttonsView: {
        flex: 1,
        flexDirection: 'row',
        height: verticalScale(20)
    }
});
