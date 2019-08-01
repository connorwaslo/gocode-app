import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
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
        let theme = DataStorage.theme;

        //styles.lessonContainer
        return (
            <ProblemContainer
                reqTags={['~t<head>', '~t</head>']}
                lessonNum={6}
                lessonModalText={[
                    'Spacing is SUPER important to make your code readable!',
                    'We use tabs to indent code so that each level of tags is clearly separated.',
                    'Any tag that\'s between another opening and closing tag should be indented like this:',
                    '~<html>',
                    '~  <head>',
                    '~  </head>',
                    '~</html>',
                    'Use the Tab > button to indent the opening and closing head tags.'
                ]}
                errorText={[
                    'Make sure to tab both head tags once!'
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
                buttons={[]}
                updateCode={false}
                nav={this.navigate}
                openMap={this.openMap}>

                <Text style={textStyles.todoText}>
                    Tab over the {'<head>'} and {'</head>'} tags by selecting each line and
                    then pressing{'\n'}"Tab >" once.
                </Text>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 6 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
