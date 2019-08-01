import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
import textStyles from '../../../styles/Text';
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
        let theme = DataStorage.theme.toLowerCase();

        return (
            <ProblemContainer
                reqTags={['<html>', '</html>']}
                lessonNum={4}
                lessonModalText={[
                    '~<html>',
                    '~</html>',
                    'The <html> tag is the container for all of your HTML elements.',
                    'Every other tag you use will be between the opening <html> and closing ' +
                    '</html> tags.',
                    'Add the html tags to your website.'
                ]}
                errorText={[
                    'Make sure to include opening and closing html tags.'
                ]}
                codeAbove={
                    <Text style={textStyles.code}>&lt;!doctype html&gt;</Text>
                }
                buttons={['<', '>', '/']}
                updateCode={false}
                nav={this.navigate}
                openMap={this.openMap}>

                <Text style={textStyles.todoText}>
                    Add the opening and closing html tags to your blog.
                </Text>
            </ProblemContainer>

        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 4 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
