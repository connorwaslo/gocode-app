import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
import textStyles, { TAB_WIDTH } from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemTwelve extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();

        this.navigate = this._navigate.bind(this);
        this.openMap = this._openMap.bind(this);
    }
    render() {
        let theme = DataStorage.theme.toLowerCase();
        const review = DataStorage.code.substring(DataStorage.code.indexOf('<p>'), DataStorage.code.indexOf('</p>') + 4);

        //styles.lessonContainer
        // TODO: Add the line break in the MIDDLE of the review. Add prop to get user code and which line
        return (
            <ProblemContainer
                reqTags={['<br>']}
                lessonNum={12}
                lessonModalText={[
                    'So far we\'ve talked about opening and closing tags, but some tags close themselves!',
                    'They look like this:',
                    '~<br>',
                    'That line of code is known as a line break. It\'s the same as pressing "enter" on your' +
                    ' keyboard.',
                    "Self-closing tags look just like opening tags, but they don't require a closing tag!",
                    'Add a line break after your review.'
                ]}
                errorText={[
                    'Make sure to create an link with the a tag.'
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
                updateCode={true}
                nav={this.navigate}
                openMap={this.openMap}>

                <Text style={textStyles.todoText}>
                    Add a line break after our review.
                </Text>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 12 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
