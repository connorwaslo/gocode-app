import React from 'react';
import { KeyboardAvoidingView, ScrollView, View, StyleSheet, Text, Keyboard, TouchableOpacity } from 'react-native';
import { RkTextInput, RkTheme, RkButton, RkCard } from 'react-native-ui-kitten';
import { scale } from 'react-native-size-matters';

export default class LangSelect extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelect = this._handleSelect.bind(this);
    }

    render() {
        return (
            <ScrollView>
                <TouchableOpacity
                    onPress={this.handleSelect}>
                    <RkCard rkType="langAvailable">
                        <View rkCardHeader>
                            <Text>HTML & CSS</Text>
                        </View>
                        <View rkCardContent>
                            <Text>Learn the basics of web development.</Text>
                        </View>
                    </RkCard>
                </TouchableOpacity>
                <RkCard rkType="langUnavailable">
                    <View rkCardHeader>
                        <Text>Javascript</Text>
                    </View>
                    <View rkCardContent>
                        <Text>The most popular language on the internet.</Text>
                    </View>
                    <View rkCardFooter>
                        <Text>Coming Soon...</Text>
                    </View>
                </RkCard>
                <RkCard rkType="langUnavailable">
                    <View rkCardHeader>
                        <Text>ReactJS</Text>
                    </View>
                    <View rkCardContent>
                        <Text>A popular JavaScript framework based on components and created by Facebook.</Text>
                    </View>
                    <View rkCardFooter>
                        <Text>Coming Soon...</Text>
                    </View>
                </RkCard>
                <RkCard rkType="langUnavailable">
                    <View rkCardHeader>
                        <Text>PHP</Text>
                    </View>
                    <View rkCardContent>
                        <Text>Server-side communication.</Text>
                    </View>
                    <View rkCardFooter>
                        <Text>Coming Soon...</Text>
                    </View>
                </RkCard>
            </ScrollView>
        );
    }

    _handleSelect() {
        const { navigate } = this.props.navigation;

        Keyboard.dismiss();
        navigate('Root');
    }
}

/*
RkTheme.setType('RkCard', 'langAvailable', {
    header: {
        backgroundColor: 'white'
    },
    content: {
        backgroundColor: 'white'
    }
});

RkTheme.setType('RkCard', 'langUnavailable', {
    header: {
        backgroundColor: 'gray'
    },
    content: {
        backgroundColor: 'gray'
    },
    footer: {
        backgroundColor: 'gray'
    }
});*/
