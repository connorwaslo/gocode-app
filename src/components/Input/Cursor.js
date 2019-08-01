import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import textStyles from '../../styles/Text';

export default class Cursor extends React.Component {
    constructor(props) {
        super(props);

        this.pressCursor = this._pressCursor.bind(this);

        this.state = {
            showCursor: true,
        };

        setInterval(() => {
            if (this.refs.cursor) {
                this.setState(previousState => {
                    return {showCursor: !previousState.showCursor};
                });
            }
        }, 500);
    }

    render() {
        let display = this.state.showCursor ? '|' : ' ';

        return (
            <TouchableOpacity style={styles.cursorButton} onPress={this.pressCursor}>
                <Text ref="cursor" style={[{marginLeft: this.props.tab}, textStyles.code]}>{display}</Text>
            </TouchableOpacity>
        )
    }

    _pressCursor() {
        this.props.pressCursor();
    }
}

const styles = StyleSheet.create({
    autotagContainer: {
    },
    autotagInput: {
        position: 'absolute'
    },
    closingTag: {
        position: 'absolute',
        right: 0
    },
    cursorButton: {
        width: 300
    }
});