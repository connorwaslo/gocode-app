import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
import textStyles, { TAB_WIDTH } from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemTen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();

        this.navigate = this._navigate.bind(this);
        this.openMap = this._openMap.bind(this);
    }

    render() {
        const theme = DataStorage.theme.toLowerCase();
        const item =  DataStorage.theme.toLowerCase() === 'sports' ? 'NFL team' : 'artist';

        return (
            <ProblemContainer
                reqTags={['~t~t<h2>', '</h2>', '~t~t<p>', '</p>']}
                lessonNum={10}
                lessonModalText={[
                    'Now let\'s get to writing text.',
                    'The <p> tag defines a paragraph',
                    '~<p>This is a paragraph.</p>',
                    'Use this tag for basic text.',
                    'Let\'s make a blog post reviewing ' + theme + '.',
                    'Create an h2 tag with the name of the ' + item + ' you\'re reviewing and then write a' +
                    ' one sentence review between opening <p> and closing </p> tags.'
                ]}
                errorText={[
                    'Make sure to create an h2 tag or a p tag.'
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
                buttons={['<', '>', '/']}
                updateCode={true}
                nav={this.navigate}
                openMap={this.openMap}>

                <Text style={textStyles.todoText}>
                    Add an h2 tag with the name of the {item} {'you\'re'} reviewing.
                </Text>
                <Text style={textStyles.todoText}>
                    Write a sentence between p tags describing what you want to blog about.
                </Text>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 10 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
