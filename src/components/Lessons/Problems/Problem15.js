import React from 'react';
import { Text, Keyboard } from 'react-native';
import textStyles, { TAB_WIDTH } from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemFifteen extends React.Component {
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
                reqTags={['<!--', '-->']}
                reqTabs={[0]}
                lessonNum={15}
                lessonModalText={[
                    'It\'s important to keep track of your code by using comments.',
                    'Comments are lines in your code that don\'t affect the appearance or performance of your' +
                    ' website, but are there for you and other developers to read in order to clarify your' +
                    ' code.',
                    'They look like this:',
                    '~<!-- This is a comment! -->',
                    'Create a comment that lets other coders know YOU made this website.'
                ]}
                errorText={[
                    "Don't forget to add a comment!"
                ]}
                codeBelow={
                    <React.Fragment>
                        <Text style={textStyles.code}>&lt;!doctype html&gt;</Text>
                        <Text style={textStyles.code}>&lt;html&gt;</Text>
                        <Text style={[{ marginLeft: TAB_WIDTH }, textStyles.code]}>&lt;body&gt;</Text>
                        <Text style={[{ marginLeft: TAB_WIDTH }, textStyles.code]}>&lt;/body&gt;</Text>
                        <Text style={textStyles.code}>&lt;/html&gt;</Text>
                    </React.Fragment>
                }
                buttons={['<', '>', '/', '=', '"']}
                updateCode={true}
                nav={this.navigate}
                openMap={this.openMap}>

                <Text style={textStyles.todoText}>
                    Add a comment to your code so that people know YOU wrote it!
                </Text>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        const action = NavigationActions.navigate({
            routeName: 'Website'
        });

        this.props.navigation.dispatch(action);
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
