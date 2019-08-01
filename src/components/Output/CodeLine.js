import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import {TAB_WIDTH} from "../../styles/Text";
import textStyles from "../../styles/Text";
import {scale} from "react-native-size-matters";
import DataStorage from "../../utility/DataStorage";

export default class CodeLine extends Component {
    state = {
        code: this.props.code,
        height: 0
    };

    render() {
        let factor = this.props.lineNum > 9 ? scale(9) : 0;
        let distance = scale(15) - factor;
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={[textStyles.code, { justifyContent: 'flex-start' } ]}>{this.props.lineNum}</Text>
                {this._renderCode(distance)}
            </View>
        )
    }

    _renderCode(distance) {
        if (this.props.editable) {
            return (
                <TextInput style={[textStyles.code,
                    { justifyContent: 'flex-start', marginLeft: (distance + (this.props.tabs * TAB_WIDTH)),
                        width: (Dimensions.get('window').width - scale(40) - (scale(15) + (this.props.tabs * TAB_WIDTH))),
                        height: this.state.height } ]}
                           autoCorrect={false}
                           textBreakStrategy='highQuality'
                           multiline={true}
                           editable={true}
                           blurOnSubmit={true}
                           onChangeText={(text) => this._changeText(text) }
                           onContentSizeChange={(e) => {
                               this.setState({
                                   height: e.nativeEvent.contentSize.height
                               });
                           }}
                           underlineColorAndroid='rgba(0, 0, 0, 0)'
                           value={this.state.code}/>
            )
        }

        return (
            <Text style={[textStyles.code,
                { justifyContent: 'flex-start', marginLeft: (distance + (this.props.tabs * TAB_WIDTH)) } ]}>
                {this.props.code}
            </Text>
        )
    }

    _changeText(text) {
        // Change local text
        this.setState({
            code: text
        });

        // Change UserCode
        this.props.changeText(text, this.props.index)
    }
}