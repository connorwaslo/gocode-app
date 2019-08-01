import React from 'react';
import { Text, Keyboard } from 'react-native';
import DataStorage from '../../../utility/DataStorage';
import textStyles, {TAB_WIDTH} from '../../../styles/Text';
import ProblemContainer from "../ProblemContainer";

export default class ProblemOne extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();

        this.navigate = this._navigate.bind(this);
    }

    render() {
        let theme = DataStorage.theme.toLowerCase();

        return (
            <ProblemContainer
                reqTags={[]}
                disableHeaderLeft={true}
                lessonNum={1}
                lessonModalText={[
                    'We\'re going to be making a blog about ' + theme + ' using HTML.',
                    'HTML is the backbone of the internet! It stands for HyperText Markup Language and creates the' +
                    ' structure and content of websites.',
                    'It won\'t make anything look gorgeous on its own, but it will be your website\'s' +
                    ' foundation.',
                    'Press right by the cursor to input your own custom text.',
                    'To run your code press the white arrow up above!',
                    'Type your name between <h1> and\n</h1> and then press Run.'
                ]}
                errorText={[
                    "Don't forget to write your name between <h1> and </h1>"
                ]}
                codeAbove={
                    <React.Fragment>
                        <Text style={textStyles.code}>&lt;!doctype html&gt;</Text>
                        <Text style={textStyles.code}>&lt;html&gt;</Text>
                        <Text style={[textStyles.code, { marginLeft: TAB_WIDTH }]}>&lt;body&gt;</Text>
                        <Text style={[textStyles.code, { marginLeft: TAB_WIDTH * 2 }]}>&lt;h1&gt;</Text>
                    </React.Fragment>
                }
                codeBelow={
                    <React.Fragment>
                        <Text style={[textStyles.code, { marginLeft: TAB_WIDTH * 2 }]}>&lt;/h1&gt;</Text>
                        <Text style={[textStyles.code, { marginLeft: TAB_WIDTH }]}>&lt;body&gt;</Text>
                        <Text style={textStyles.code}>&lt;/html&gt;</Text>
                    </React.Fragment>
                }
                buttons={[]}
                updateCode={false}
                nav={this.navigate}>

                <React.Fragment>
                    <Text style={textStyles.todoText}>
                        Click right here ^ to run your code!
                    </Text>
                    <Text style={textStyles.todoText}>
                        Click by the cursor to input custom text!
                    </Text>
                    <Text style={textStyles.todoText}>
                        Write your name below &lt;h1&gt; and above{'\n'}&lt;/h1&gt;
                    </Text>
                </React.Fragment>
            </ProblemContainer>
        )
    }

    _navigate() {
        Keyboard.dismiss();

        this.props.navigation.navigate('Problem1Output');
    }
}
