import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
import textStyles, { TAB_WIDTH } from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemFourteen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();

        this.navigate = this._navigate.bind(this);
        this.openMap = this._openMap.bind(this);
    }

    render() {
        const path = DataStorage.theme.toLowerCase() === 'sports' ? 'football.jpg' : 'concert.jpg';

        return (
            <ProblemContainer
                reqTags={['~t~t<img src="' + path + '" width="150" height="150">']}
                lessonNum={14}
                lessonModalText={[
                    'Two of the tags we\'ve learned about have used attributes.',
                    '~<a href=""></a>',
                    '~<img src="">',
                    'href and src are both attributes - modifiers to the functionality of tags.',
                    'Other examples include width and height for the <img> tag.',
                    'You can set an images width and height like so:',
                    '~<img src="' + path + '" width="200" height="150">',
                    'When we dive into CSS (that\'s how you\'ll make your blog look beautiful), we\'ll be using ' +
                    'lots of attributes, so be familiar with the term.'
                ]}
                errorText={[
                    'Make sure to create an image with the correct width and height attributes.'
                ]}
                codeAbove={
                    <React.Fragment>
                        <Text style={textStyles.code}>&lt;!doctype html&gt;</Text>
                        <Text style={textStyles.code}>&lt;html&gt;</Text>
                        <Text style={[{ marginLeft: TAB_WIDTH }, textStyles.code]}>&lt;body&gt;</Text>
                    </React.Fragment>
                }
                codeBelow={
                    <React.Fragment>
                        <Text style={[{ marginLeft: TAB_WIDTH }, textStyles.code]}>&lt;/body&gt;</Text>
                        <Text style={textStyles.code}>&lt;/html&gt;</Text>
                    </React.Fragment>
                }
                buttons={['<', '>', '/', '=', '"']}
                updateCode={false}
                nav={this.navigate}
                openMap={this.openMap}>

                <Text style={textStyles.todoText}>
                    Add an image tag with {path} as the source and 150 as both the width and height.
                </Text>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 14 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
