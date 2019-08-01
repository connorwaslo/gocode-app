import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from "../../../utility/DataStorage";
import textStyles, {TAB_WIDTH} from '../../../styles/Text';
import {NavigationActions} from "react-navigation";
import ProblemContainer from "../ProblemContainer";

export default class ProblemEight extends React.Component {
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
        let interests = this._getInterests();

        //styles.lessonContainer
        return (
            <ProblemContainer
                reqTags={['~t<body>', '~t</body>']}
                lessonNum={8}
                lessonModalText={[
                    'The body tag contains all of your web-page\'s content.',
                    'It goes right after your closing head tag.',
                    '~...',
                    '~</head>',
                    '~<body>',
                    '~</body>',
                    'Everything that you want to write about ' + theme + ', like ' + interests + ' will' +
                    ' exist between the opening <body> and closing </body> tags.',
                    'Add an opening <body> tag and a closing </body> tag to your code.'
                ]}
                errorText={[
                    'Make sure to include opening and closing head tags.'
                ]}
                codeAbove={
                    <React.Fragment>
                        <Text style={textStyles.code}>&lt;!doctype html&gt;</Text>
                        <Text style={textStyles.code}>&lt;html&gt;</Text>
                        <Text style={[{ marginLeft: TAB_WIDTH }, textStyles.code]}>&lt;head&gt;</Text>
                        <Text style={[{ marginLeft: TAB_WIDTH }, textStyles.code]}>&lt;/head&gt;</Text>
                    </React.Fragment>
                }
                codeBelow={
                    <Text style={textStyles.code}>&lt;/html&gt;</Text>
                }
                buttons={['<', '>', '/']}
                updateCode={false}
                nav={this.navigate}
                openMap={this.openMap}>

                <Text style={textStyles.todoText}>
                    Add an opening &lt;body&gt; tag and a closing &lt;/body&gt; tag to your code.
                </Text>
            </ProblemContainer>
        )
    }

    _getInterests() {
        if (DataStorage.theme.toLowerCase() === 'sports') {
            return 'March Madness predictions, sneaker reviews, or friendly trash talk';
        }

        return 'upcoming concerts, the new guitar solo you learned, or your new favorite song';
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('MultipleChoiceScreen', { lesson: 8 });
    }

    _openMap() {
        this.props.navigation.goBack()
    }
}
