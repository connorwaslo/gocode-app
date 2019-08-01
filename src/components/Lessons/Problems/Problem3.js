import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
import textStyles from '../../../styles/Text';
import ProblemContainer from '../ProblemContainer';
import {NavigationActions} from "react-navigation";

export default class ProblemThree extends React.Component {
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
                reqTags={['<p>', '</p>']}
                lessonNum={3}
                lessonModalText={[
                    '~<p>This is a tag</p>',
                    'Tags are just words surrounded by < >',
                    'There are opening and closing tags. <h1> and <title> are both opening tags.',
                    'Every opening tag has a closing that that looks like </h1> or </title>. It\'s ' +
                    'just the same word with a / (a forward slash) before it.',
                    'Different tags signal different formatting to the browser for whatever text ' +
                    'is in the middle of the opening and closing tags.'
                ]}
                errorText={[
                    'Make sure to include opening and closing p tags and to write something between them!'
                ]}
                buttons={['<', '>', '/']}
                updateCode={false}
                nav={this.navigate}
                openMap={this.openMap}>

                <React.Fragment>
                    <Text style={textStyles.todoText}>
                        Write your own opening and closing p tags like the example in the tutorial.
                    </Text>
                    <Text style={textStyles.todoText}>
                        Write something interesting about {theme} between the tags.
                    </Text>
                </React.Fragment>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 3 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
