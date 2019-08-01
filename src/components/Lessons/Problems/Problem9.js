import React from 'react';
import { Text, Keyboard } from 'react-native';
import textStyles, { TAB_WIDTH } from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemNine extends React.Component {
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
                reqTags={['~t~t<h1>', '</h1>']}
                lessonNum={9}
                lessonModalText={[
                    'There are 6 heading tags.',
                    '~<h1>, <h2>, ..., <h6>',
                    'h1 all the way to h6.',
                    'h1 creates the largest heading (perfect for page titles) and <h6> creates the smallest.',
                    'Write your blog\'s title in an h1 tag.'
                ]}
                errorText={[
                    'Make sure to create an h1 tag.'
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
                    Write your {'blog\'s'} title in an h1 tag.
                </Text>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 9 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
