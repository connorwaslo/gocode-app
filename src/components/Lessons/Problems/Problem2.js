import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
import textStyles, {TAB_WIDTH} from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemTwo extends React.Component {
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

        return (
            <ProblemContainer
                reqTags={['<!doctype html>']}
                lessonNum={2}
                lessonModalText={[
                    'Every html file starts with this line:',
                    '~<!doctype html>',
                    'This line (called the doctype declaration) tells the web browser which version' +
                    ' of HTML you\'re using. Without it, the browser won\'t be able to understand your code.',
                    'Start your ' + theme + ' blog off with the doctype declaration!'
                ]}
                errorText={[
                    'Make sure to type <!doctype html>'
                ]}
                buttons={['<', '>']}
                updateCode={false}
                nav={this.navigate}
                openMap={this.openMap}>

                <React.Fragment>
                    <Text style={textStyles.todoText}>
                        Click right here ^ to run your code!
                    </Text>
                    <Text style={textStyles.todoText}>
                        Add the doctype declaration below.
                    </Text>
                </React.Fragment>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 2 });
    }

    _openMap() {
        this.props.navigation.goBack();
    }
}
