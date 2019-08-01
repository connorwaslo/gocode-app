import React, {Component} from 'react';
import {ScrollView, KeyboardAvoidingView, Animated, SafeAreaView, View, Keyboard, TouchableOpacity, Platform} from 'react-native';
import InputLine from '../Input/InputLine';
import AutoTagKeyboard from "../Input/Keyboards/AutoTagKeyboard";
import Cursor from "../Input/Cursor";
import DataStorage from "../../utility/DataStorage";
import LessonModal from "../Modals/LessonModal";
import ErrorModal from '../Modals/ErrorModal';
import LessonHeader from '../Frontend/LessonHeader';
import styles from '../../styles/Lessons';
import {TAB_WIDTH} from '../../styles/Text';
import {verticalScale} from 'react-native-size-matters';
import Overlay from "../Frontend/Overlay";

export default class ProblemContainer extends Component {
    constructor(props) {
        super(props);

        this._run = this._run.bind(this);
        this._nextLesson = this._nextLesson.bind(this);
        this.pressButton = this._pressButton.bind(this);
        this.changeContent = this._changeContent.bind(this);
        this.setSelection = this._setSelection.bind(this);
        this.setLine = this._setLine.bind(this);
        this.tab = this._tab.bind(this);

        this.openHint = this._openHint.bind(this);
        this.triggerOverlay = this._triggerOverlay.bind(this);
        this.triggerErrorOverlay = this._triggerErrorOverlay.bind(this);

        this.showCursor = this._showCursor.bind(this);

        this.htmlCode = ``;
        this.errorText = "";
        this.finalCode = [];

        if (DataStorage.openLesson === 5 || props.text)
            this.line = 0;
        else
            this.line = -1;

        this.paddingInput = new Animated.Value(-40);

        this.INPUT_LINES = 1;

        const {reqTags} = this.props;

        // TODO: Replace requiredTags with props
        this.requiredTags = reqTags;

        this.state = {
            focusedLine: props.text ? 1 : 0,
            focus: true,
            content: props.text ? ['Input Text'] : [],
            text: props.text ? props.text : [],
            selection: {},
            updater: 0,
            modalVisible: true,
            hasError: false,
            showCursor: !props.text,
            showTabMenu: false
        }
    }

    componentDidMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', () => this.keyboardWillShow());
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', () => this.keyboardWillHide());

        DataStorage.openLesson = this.props.lessonNum - 1;

        if (DataStorage.openLesson === 5) {
            this.setState({
                content: ['Input Text', 'Input Text'],
                text: ['<head>\n</head>'],
                showCursor: false
            });
        }
    }

    componentWillUnmount() {
        this.keyboardWillHideSub.remove();
        this.keyboardWillShowSub.remove();
    }

    keyboardWillShow() {
        Animated.timing(this.paddingInput, {
            duration: 200,
            toValue: verticalScale(-25),
        }).start();

        this._removeCursor();
        this.setState({
            showTabMenu: true
        });
    }

    keyboardWillHide() {
        Animated.timing(this.paddingInput, {
            duration: 400,
            toValue: -80
        }).start();

        if (DataStorage.openLesson !== 5)
            this._showCursor();

        this.setState({
            showTabMenu: false
        });
    }

    render() {
        return (
                <View style={{flex: 1}}>
                    <LessonHeader disableLeft={this.props.disableHeaderLeft} pressMap={this.props.openMap}
                                  pressTut={this.openHint} run={this._run}/>

                    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={verticalScale(40)}
                                          style={{flex: 1}}>
                        <LessonModal
                            visible={this.state.modalVisible}
                            msg={this.props.lessonModalText}
                            triggerOverlay={this.triggerOverlay}
                        />

                        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                            <View style={styles.todoView}>
                                {this.props.children}
                            </View>
                        </TouchableOpacity>

                        <ScrollView keyboardShouldPersistTaps='never' style={styles.codeContainer}>
                            <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                                {this.props.codeAbove}
                            </TouchableOpacity>

                            <View style={{
                                flex: 1,
                                marginLeft: DataStorage.lesson === -1 ? TAB_WIDTH * 3 : 0
                            }}>
                                <InputLine ref="inputRef"
                                           focus={false}
                                           content={this.state.content[0]}
                                           text={this.state.text[0]}
                                           changeContent={(text) => {
                                               this._changeContent(text, 1)
                                           }}
                                           append={(text) => this._appendContent(text, 1)}
                                           line={0}
                                           setLine={this.setLine}
                                           setSelection={this.setSelection}
                                           isFocused={(line) => this.setState({lineFocused: line})}/>
                            </View>

                            {this._renderCursor()}

                            <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                                {this.props.codeBelow}
                            </TouchableOpacity>
                        </ScrollView>

                        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                            <View style={{flex: 10}}/>
                        </TouchableOpacity>

                        <AutoTagKeyboard pressButton={this.pressButton}
                                         tab={this.tab}
                                         padding={this.paddingInput}
                                         showTabMenu={this.state.showTabMenu}
                                         buttons={this.props.buttons}/>

                        {this._showError()}
                        {this._drawOverlay()}
                    </KeyboardAvoidingView>
                </View>
        )
    }

    _renderCursor() {
        if (DataStorage.lesson === -1 && this.line < this.INPUT_LINES - 1) {
            return <Cursor pressCursor={() => this._pressButton("Input Text")} tab={TAB_WIDTH * 3}/>;
        }

        if (this.state.showCursor) {
            return <Cursor pressCursor={() => this._pressButton("Input Text")} tab={0}/>;
        }

        return <View/>
    }

    _triggerOverlay() {
        let alt = !this.state.modalVisible;
        this.setState({modalVisible: alt});
    }

    _triggerErrorOverlay() {
        let alt = !this.state.hasError;
        this.setState({hasError: alt});
    }

    _drawOverlay() {
        if (this.state.modalVisible || this.state.hasError)
            return <Overlay/>
    }

    _run() {
        // Aggregate code into one variable
        let codeArr = this.state.text;
        let allCode = "";

        // Clear the array from past attempts
        this.finalCode.splice(0, this.finalCode.length);

        let str;
        for (let i = 0; i < codeArr.length; i++) {
            str = codeArr[i];

            this.finalCode.push(str);
        }

        this.finalCode.forEach((str) => {
            allCode += str
        });

        this._testCode(allCode);
    }

    async _testCode(_code) {
        // Replace “ or ” with "
        const code = _code.replace(/[“”]/g, '"');

        // Split code at \n and then replace 2 spaces with ~t
        let splitCode;

        if (code.includes('\n')) {
            splitCode = code.split('\n');

            for (let i = 0; i < splitCode.length; i++) {
                splitCode[i] = splitCode[i].replace(/\s\s/g, '~t');
            }
        } else {
            splitCode = [code.replace(/\s\s/g, '~t')];
        }

        // Get array for finding tags
        let foundTags = [];
        let reqCodeTabless = [];

        for (let i = 0; i < this.requiredTags.length; i++) {
            foundTags.push(false);
            reqCodeTabless.push(this.requiredTags[i].replace(/~t/g, ''));
        }

        for (let k = 0; k < splitCode.length; k++) {
            if (splitCode[k].trim().length < 1) {
                this.errorText = "Don't forget to type something!";
                this.setState({hasError: true});

                this.finalCode.splice(0, this.finalCode.length);

                return;
            }

            // Make sure the required tags exist (Except in this case where there are no required tags)
            // Check each splitCode line and THEN check each requiredTag
            for (let i = 0; i < splitCode.length; i++) {

                // Check each requiredTag
                for (let j = 0; j < this.requiredTags.length; j++) {

                    // If included
                    if (splitCode[i].includes(reqCodeTabless[j]))
                        foundTags[j] = true;
                }
            }

            for (let i = 0; i < splitCode.length; i++) {
                for (let j = 0; j < this.requiredTags.length; j++) {
                    if (!splitCode[i].includes(this.requiredTags[j]) && !foundTags[j]) {

                        // Check and see if it's because of the number of tabs
                        let count = (splitCode[i].match(/~t/g) || []).length;
                        let reqCount = (this.requiredTags[j].match(/~t/g) || []).length;

                        let tablessCode = splitCode[i].replace(/~t/g, '');

                        if (!foundTags[j]) {

                            // Check and see if the required tag is there minus the tab symbols
                            if (!tablessCode.includes(reqCodeTabless[j])) {
                                // If it's not because of the number of tabs
                                this.errorText = "Be sure to include " + this.requiredTags[j].replace(/~t/g, '');
                                this.setState({hasError: true});

                                this.finalCode.splice(0, this.finalCode.length);

                                return;
                            } else {
                                if (this.requiredTags[j].includes('~t')) {
                                    if (count !== reqCount) {
                                        this.errorText = "Make sure to tab over correctly!";
                                        this.setState({hasError: true});

                                        this.finalCode.splice(0, this.finalCode.length);

                                        return;
                                    }
                                }
                            }
                        }


                    } else {
                        // Check and see if the number of tabs matches anyways
                        let count = (splitCode[i].match(/~t/g) || []).length;
                        let reqCount = (this.requiredTags[j].match(/~t/g) || []).length;

                        if (this.requiredTags[j].includes('~t')) {
                            if (count !== reqCount) {
                                this.errorText = "Make sure to tab over correctly!";
                                this.setState({hasError: true});

                                this.finalCode.splice(0, this.finalCode.length);

                                return;
                            }
                        }
                    }
                }
            }

            //Make sure that something is typed between the tags
            for (let i = 0; i < splitCode.length; i++) {
                for (let j = 0; j < this.requiredTags.length; j++) {
                    if (splitCode[i].trim().includes('><')) {
                        // Check to make sure this doesn't include html, body, or head tags
                        if (!splitCode[i].trim().includes('html><') && !splitCode[i].trim().includes('body><') && !splitCode[i].trim().includes('head><')) {
                            this.errorText = "Don't forget to type something between opening and closing tags!";
                            this.setState({ hasError: true });

                            this.finalCode.splice(0, this.finalCode.length);

                            return;
                        }
                    }
                }
            }
        }

        // If there's no error... continue!
        if (this.state.hasError === true)
            this.setState({hasError: false});

        this.htmlCode = code;

        if (DataStorage.lesson < this.props.lessonNum - 1) {
            DataStorage.lesson = this.props.lessonNum - 1;
            console.log('Save lesson progress ' + (this.props.lessonNum - 1));

            // If code is updated
            if (this.props.updateCode) {
                if (DataStorage.lesson === 6)
                    DataStorage.code = this.htmlCode + '~!';
                else
                    DataStorage.code += this.htmlCode + '~!';
            }

            if (this.props.lessonNum === 1) {
                DataStorage.code = this.htmlCode;
            } else {
                console.log('Code: ' + DataStorage.code);
                DataStorage._editLesson(DataStorage.lesson);
                DataStorage._editCode(DataStorage.code);
            }
        }

        this._nextLesson();
    }

    _showError() {
        return <ErrorModal visible={this.state.hasError}
                           msg={this.errorText}
                           close={() => this.setState({hasError: false})}
                           triggerOverlay={this.triggerErrorOverlay}
        />
    }

    _nextLesson() {
        this.props.nav();
        this.htmlCode = '';
    }

    _pressButton(tag) {
        let tempContent = this.state.content.slice();
        let tempText = this.state.text.slice();

        if (this.line < this.INPUT_LINES - 1 && tag !== "Delete") {
            // Make sure that content only added on cursor press
            if (tag === "Input Text") {
                this.line++;
                tempContent.push(tag);
                tempText.push("");

                if (this.refs.inputRef) {
                    this.setState({
                        content: tempContent,
                        text: tempText
                    });
                }
            }
        }

        if (this.line <= this.INPUT_LINES && tag !== "Delete") {
            let selA = this.state.selection.start;
            let selB;

            if (this.state.selection.end - this.state.selection.start > 0) {
                selB = this.state.selection.end;
            } else {
                selB = selA;
            }

            if (tag === "<") {
                tempText[this.line] = tempText[this.line].substring(0, selA) + '<' + tempText[this.line].substring(selB, tempText[this.line].length);
            } else if (tag === ">") {
                tempText[this.line] = tempText[this.line].substring(0, selA) + '>' + tempText[this.line].substring(selB, tempText[this.line].length);
            } else if (tag === "/") {
                tempText[this.line] = tempText[this.line].substring(0, selA) + '/' + tempText[this.line].substring(selB, tempText[this.line].length);
            } else if (tag === '"') {
                tempText[this.line] = tempText[this.line].substring(0, selA) + '"' + tempText[this.line].substring(selB, tempText[this.line].length);
            } else if (tag === ";") {
                tempText[this.line] = tempText[this.line].substring(0, selA) + ';' + tempText[this.line].substring(selB, tempText[this.line].length);
            } else if (tag === "=") {
                tempText[this.line] = tempText[this.line].substring(0, selA) + '=' + tempText[this.line].substring(selB, tempText[this.line].length);
            }

            if (this.refs.inputRef) {
                this.setState({
                    text: tempText
                });
                this.forceUpdate();
            }

            let newLine;

            newLine = this.state.focusedLine + 1;

            if (this.refs.inputRef) {
                this.setState({
                    focusedLine: newLine
                });
            }

            let update = this.state.updater + 1;
            this.setState({
                updater: update
            });
        }
    }

    _setSelection(sel) {
        this.setState({
            selection: sel
        });
    }

    _setLine(line) {
        this.setState({
            focusedLine: line
        });
    }

    _tab() {
        console.log('Current line: ' + this.line);
        let tempText = this.state.text.slice();
        //console.log('tempText: ' + tempText);

        let selA = this.state.selection.start;
        let selB;

        if (this.state.selection.end - this.state.selection.start > 0) {
            selB = this.state.selection.end;
        } else {
            selB = selA;
        }

        tempText[this.line] = tempText[this.line].substring(0, selA) + '  ' + tempText[this.line].substring(selB, tempText[this.line].length);

        if (this.refs.inputRef) {
            this.setState({
                text: tempText
            });
            this.forceUpdate();
        }

        let newLine;

        newLine = this.state.focusedLine + 1;

        if (this.refs.inputRef) {
            this.setState({
                focusedLine: newLine
            });
        }

        let update = this.state.updater + 1;
        this.setState({
            updater: update
        });
    }

    _changeContent(text, line) {
        let temp = this.state.text.slice();

        // Check to see if text includes an em dash -- if so, replace it with two hyphens
        if (text.includes('—')) {
            text = text.replace(/[—]/g, '--');
        }

        temp[line - 1] = text;

        this.setState({
            text: temp
        });

        let up = this.state.update + 1;
        this.setState({
            updater: up
        });
    }

    _removeCursor() {
        this.setState({
            showCursor: false
        });
    }

    _showCursor() {
        if (this.line < this.INPUT_LINES - 1) {
            this.setState({
                showCursor: true
            });

            let update = this.state.updater + 1;
            this.setState({
                updater: update
            });
        }
    }

    _openHint() {
        this.setState({
            modalVisible: true
        });
    }
}