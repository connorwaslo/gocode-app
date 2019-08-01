import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
import textStyles, {TAB_WIDTH} from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemSeven extends React.Component {
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

        //styles.lessonContainer
        return (
            <ProblemContainer
                reqTags={['~t~t<title>', '</title>']}
                lessonNum={7}
                lessonModalText={[
                    'One tag that\'s included in the <head> tag is the <title> tag',
                    '~<title></title>',
                    'This defines the title of your web-page.',
                    'This title appears at the top of the tab in your browser and is shown in search engine' +
                    ' results.',
                    'Decide what you want to name your ' + theme + ' blog and then write it in a title tag.'
                ]}
                errorText={[
                    'Make sure to create a title.'
                ]}
                codeAbove={
                    <React.Fragment>
                        <Text style={textStyles.code}>&lt;!doctype html&gt;</Text>
                        <Text style={textStyles.code}>&lt;html&gt;</Text>
                        <Text style={[{ marginLeft: TAB_WIDTH }, textStyles.code]}>&lt;head&gt;</Text>
                    </React.Fragment>
                }
                codeBelow={
                    <React.Fragment>
                        <Text style={[{ marginLeft: TAB_WIDTH }, textStyles.code]}>&lt;/head&gt;</Text>
                        <Text style={textStyles.code}>&lt;/html&gt;</Text>
                    </React.Fragment>
                }
                buttons={['<', '>', '/']}
                updateCode={true}
                nav={this.navigate}
                openMap={this.openMap}>

                <Text style={textStyles.todoText}>
                    Make a title for your web-page.
                </Text>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 7 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
