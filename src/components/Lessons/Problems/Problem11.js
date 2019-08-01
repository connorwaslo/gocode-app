import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
import textStyles, { TAB_WIDTH } from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemEleven extends React.Component {
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
        let website = theme === 'music' ? `~t~t<a href="www.spotify.com">` : `~t~t<a href="www.nfl.com">`;
        let websiteText = website.substring(4, website.length);

        return (
            <ProblemContainer
                reqTags={[website, "</a>"]}
                lessonNum={11}
                lessonModalText={[
                    'You can create hyperlinks with the <a> tag. It looks like this:',
                    '~<a href="www.gocode.courses">I want to learn how to code!</a>',
                    'Whatever URL (link to a website) you put inside the " " will be the destination users' +
                    ' arrive at when they click your link.',
                    'Let\'s add a link to your first blog post. Make a link that brings users to ' + websiteText
                    + '.'
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
                    Add a &lt;a href=""&gt;&lt;/a&gt; tag with {websiteText} between the quotes.
                </Text>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 11 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
