import React from 'react';
import { Text, Keyboard } from 'react-native';
import textStyles, {TAB_WIDTH} from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemSix extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();

        this.navigate = this._navigate.bind(this);
        this.openMap = this._openMap.bind(this);
    }
    render() {
        return (
            <ProblemContainer
                reqTags={['<head>', '</head>']}
                lessonNum={5}
                lessonModalText={[
                    '~<head>',
                    '~</head>',
                    'The head tag contains all of the "metadata" for your web-page.',
                    'Metadata is the fancy word for information that isn\'t displayed, but ' +
                    'is important to use for search engines and other background activities.',
                    'The <head> tag is usually the first tag after the html tag.',
                    'Add an opening <head> and closing\n</head> tag to the file.'
                ]}
                errorText={[
                    'Make sure to include opening and closing head tags.'
                ]}
                codeAbove={
                    <React.Fragment>
                        <Text style={textStyles.code}>&lt;!doctype html&gt;</Text>
                        <Text style={textStyles.code}>&lt;html&gt;</Text>
                    </React.Fragment>
                }
                codeBelow={
                    <Text style={textStyles.code}>&lt;/html&gt;</Text>
                }
                buttons={['<', '>', '/']}
                updateCode={false}
                nav={this.navigate}
                openMap={this.openMap}>

                <Text style={textStyles.todoText}>
                    Add the opening and closing head tags.
                </Text>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 5 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
