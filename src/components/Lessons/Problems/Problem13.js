import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
import textStyles, { TAB_WIDTH } from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemThirteen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();

        this.navigate = this._navigate.bind(this);
        this.openMap = this._openMap.bind(this);
    }

    render() {
        const item = DataStorage.theme.toLowerCase() === 'sports' ? 'NFL team' : 'concert';
        const path = DataStorage.theme.toLowerCase() === 'sports' ? 'football.jpg' : 'concert.jpg';

        return (
            <ProblemContainer
                reqTags={['~t~t<img src="' + path + '">']}
                lessonNum={13}
                lessonModalText={[
                    'Let\'s be honest... websites without any pictures are boring. Keep your website from' +
                    ' being boring by using the <img> tag like this:',
                    '~<img src="">',
                    'This is also a self-closing tag, so you don\'t need to add </img> anywhere.',
                    'src is short for "source" and you\'ll type the link to your picture in between the " "' +
                    ' to display your image.',
                    'Add a picture of the ' + item + ' so that your users can see what you\'re talking about!'
                ]}
                errorText={[
                    'Make sure to create an image with the img tag.'
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
                updateCode={false}
                nav={this.navigate}
                openMap={this.openMap}>

                <Text style={textStyles.todoText}>
                    Add a picture of the {item} by making an &lt;img src=""&gt; tag. Write {path} between the quotes.
                </Text>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 13 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
