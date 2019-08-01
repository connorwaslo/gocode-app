import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import DataStorage from '../../utility/DataStorage';
import textStyles from '../../styles/Text';

// TODO: Consider replacing functionality of autotag keyboard with simple button shortcuts above keyboard: < > /
export default class InputLine extends React.Component {
    constructor(props) {
        super(props);

        this.pressCursor = this._pressCursor.bind(this);

        let sel = this.props.select;
        let l = this.props.line;

        this.state = {
            showCursor: false,
            select: sel,
            moveSelection: false,
            autoText: '',
            line: l,
            height: 0
        };

        if (this.props.focus) {
            setInterval(() => {
                if (this.refs.cursor) {
                    this.setState(previousState => {
                        return {showCursor: !previousState.showCursor};
                    });
                }
            }, 500);
        }
    }

    // TODO: If change content function called and the texts are the same length, delete line b/c backspace was
    // called with nothing in it
    render() {
        // If the line is not selected and there's nothing there
        if (this.props.content === undefined) {
            return (
                <View style={{padding: 0, margin: 0, height: 0}}/>
            )
        }

        // If this line is a custom input line for either open or closing tag
        else if (this.props.content === "Input Text") {
            return (
                <View>
                    <TextInput style={[textStyles.code, { height: this.state.height }]}
                               autoFocus={DataStorage.openLesson !== 5}
                               autoCorrect={false}
                               onFocus={() => this.props.setLine(this.props.line)}
                               onContentSizeChange={(e) => {
                                   this.setState({
                                       height: e.nativeEvent.contentSize.height
                                   });
                               }}
                               onChangeText={this.props.changeContent}
                               onSelectionChange={(event) => this.props.setSelection(event.nativeEvent.selection)}
                               textBreakStrategy='highQuality'
                               multiline={true}
                               editable={true}
                               underlineColorAndroid='rgba(0, 0, 0, 0)'
                               value={this.props.text}/>
                </View>
            )
        }

        // If the line is not selected, show tag in place
        return (
            <Text>{this.props.text}</Text>
        )
    }

    _pressCursor() {
        this.props.pressCursor();
    }
}

const styles = StyleSheet.create({
    autotagInput: {
        position: 'absolute'
    },
    closingTag: {
        position: 'absolute',
        right: 0
    },
    cursorButton: {
        width: scale(150)
    },
    monospacedFont: {
        fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace'
    }
});
