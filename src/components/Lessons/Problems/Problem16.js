import React from 'react';
import { Text, Keyboard } from 'react-native';
import textStyles, { TAB_WIDTH } from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemSixteen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();

        this.navigate = this._navigate.bind(this);
        this.openMap = this._openMap.bind(this);
    }

    // TODO: Create ProjectContainer that functions without margin tabbing and only with spacing tabbing
    /*
        Required tags for project:
            Comment
            doctype
            html
                head
                    title
                /head
                body
                    img
                    h1
                    p /p
                    p /p
                /body
            /html
     */
    render() {
        return (
            <ProblemContainer
                reqTags={['<!--', '-->', '<!doctype html>', '<html>', '</html>',
                            '<head>', '</head>', '<title>', '</title>', '<body>', '</body>',
                            '<h1>', '</h1>', '<p>', '</p>', '<p>', '</p>']}
                reqTabs={[0, 0, 0, 1, 2, 1, 1, 2, 2, 2, 1, 0]}
                lessonNum={13}
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
