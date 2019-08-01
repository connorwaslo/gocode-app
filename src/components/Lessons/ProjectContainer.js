import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, Text, Animated, View, Keyboard, TouchableOpacity } from 'react-native';
import InputLine from '../Input/InputLine';
import AutoTagKeyboard from "../Input/Keyboards/AutoTagKeyboard";
import Cursor from "../Input/Cursor";
import DataStorage from "../../utility/DataStorage";
import LessonModal from "../Modals/LessonModal";
import ErrorModal from '../Modals/ErrorModal';
import LessonHeader from '../Frontend/LessonHeader';
import styles from '../../styles/Lessons';
import textStyles, {TAB_WIDTH} from '../../styles/Text';
import { scale, verticalScale } from 'react-native-size-matters';
import {NavigationActions} from "react-navigation";
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
        this.tabLeft = this._tabLeft.bind(this);

        this.openHint = this._openHint.bind(this);
        this.triggerOverlay = this._triggerOverlay.bind(this);
        this.triggerErrorOverlay = this._triggerErrorOverlay.bind(this);

        this.showCursor = this._showCursor.bind(this);

        this.htmlCode = ``;
        this.errorText = "";
        this.finalCode = [];

        this.tabs = [0];
        if (DataStorage.lesson === 0)
            this.tabs = [3];

        this.line = -1;

        this.paddingInput = new Animated.Value(-40);

        this.INPUT_LINES = 1;

        const { reqTags, reqTabs } = this.props;

        // TODO: Replace requiredTags with props
        this.requiredTags = reqTags;
        this.requiredTabs = reqTabs;

        this.state = {
            focusedLine: 0,
            focus: true,
            content: [],
            text: [],
            tags: [],
            selection: {},
            updater: 0,
            modalVisible: true,
            hasError: false,
            showCursor: true,
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
                text: ['<head>', '</head>'],
                showCursor: false
            });

            this.tabs.push(0);
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
            <View style={{ flex: 1}}>
                <LessonHeader disableLeft={this.props.disableHeaderLeft} pressMap={this.props.openMap}
                              pressTut={this.openHint} run={this._run}/>

                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={verticalScale(40)} style={{ flex: 1 }}>
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

                    {/* TODO: Replace Texts with prop */}
                    <ScrollView keyboardShouldPersistTaps='never' style={styles.codeContainer}>
                        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                            {this.props.codeAbove}
                        </TouchableOpacity>

                        <View style={{ flex: 1, marginLeft: TAB_WIDTH * this.tabs[0] }}>
                            <InputLine ref="inputRef"
                                       focus={false}
                                       content={this.state.content[0]}
                                       text={this.state.text[0]}
                                       changeContent={(text) => {this._changeContent(text, 1)}}
                                       tag={this.state.tags[0]}
                                       append={(text) => this._appendContent(text, 1)}
                                       line={0}
                                       setLine={this.setLine}
                                       setSelection={this.setSelection}
                                       isFocused={(line) => this.setState({ lineFocused: line })}/>
                        </View>
                        {this._secondInput()}

                        {this._renderCursor()}

                        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                            {this.props.codeBelow}
                        </TouchableOpacity>
                    </ScrollView>

                    <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                        <View style={{ flex: 10 }}/>
                    </TouchableOpacity>

                    <AutoTagKeyboard pressButton={this.pressButton} tab={this.tab} tabLeft={this.tabLeft}
                                     padding={this.paddingInput} showTabMenu={this.state.showTabMenu}/>

                    {this._showError()}
                    {this._drawOverlay()}
                </KeyboardAvoidingView>
            </View>
        )
    }

    _secondInput() {
        if (DataStorage.openLesson === 5) {
            return (
                <View style={{ flex: 1, marginLeft: TAB_WIDTH * this.tabs[1] }}>
                    <InputLine ref="inputRef"
                               focus={false}
                               content={this.state.content[1]}
                               text={this.state.text[1]}
                               changeContent={(text) => {this._changeContent(text, 1)}}
                               tag={this.state.tags[1]}
                               append={(text) => this._appendContent(text, 1)}
                               line={1}
                               setLine={this.setLine}
                               setSelection={this.setSelection}
                               isFocused={(line) => this.setState({ lineFocused: line })}/>
                </View>
            )
        }
    }

    _renderCursor() {
        if (DataStorage.lesson === 0 && this.line < this.INPUT_LINES - 1)
            return <Cursor pressCursor={() => this._pressButton("Input Text")} tab={TAB_WIDTH * 3}/>;

        if (this.state.showCursor)
            return <Cursor pressCursor={() => this._pressButton("Input Text")} tab={this.tabs[this.line] * TAB_WIDTH}/>;

        return <View/>
    }

    _triggerOverlay() {
        let alt = !this.state.modalVisible;
        this.setState({ modalVisible: alt });
    }

    _triggerErrorOverlay() {
        let alt = !this.state.hasError;
        this.setState({ hasError: alt });
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

    async _testCode(code) {
        if (code.trim().length < 1) {
            this.errorText = "Don't forget to type something!";
            this.setState({ hasError: true });

            this.finalCode.splice(0, this.finalCode.length);

            return;
        }

        // Make sure the required tags exist (Except in this case where there are no required tags)
        for (let i = 0; i < this.requiredTags.length; i++) {
            if (!code.includes(this.requiredTags[i])) {
                this.errorText = "Be sure to include " + this.requiredTags[i];
                this.setState({ hasError: true });

                this.finalCode.splice(0, this.finalCode.length);

                return;
            }
        }

        // Make sure that the correct number of tags happens
        for (let i = 0; i < this.requiredTabs.length; i++) {
            if (this.tabs[i] !== this.requiredTabs[i]) {
                this.errorText = "Make sure to use the tab button correctly!";
                this.setState({ hasError: true });

                this.finalCode.splice(0, this.finalCode.length);

                return;
            }
        }

        // If there's no error... continue!
        if (this.state.hasError === true)
            this.setState({ hasError: false });

        this.htmlCode = code;

        if (DataStorage.lesson < this.props.lessonNum) {
            DataStorage.lesson = this.props.lessonNum;

            // If code is updated
            if (this.props.updateCode)
                DataStorage.code += this.htmlCode + ',';

            if (DataStorage.lesson !== 0) {
                DataStorage._editLesson(this.props.lessonNum - 1);
                DataStorage._editCode(DataStorage.code);
            } else {
                DataStorage.code = this.htmlCode;
            }
        }

        this._nextLesson();
    }

    // TODO: Replace msg with error prop
    _showError() {
        return <ErrorModal visible={this.state.hasError}
                           msg={this.errorText}
                           close={() => this.setState({ hasError: false }) }
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
        let tempTag = this.state.tags.slice();

        if (this.line < this.INPUT_LINES - 1 && tag !== "Delete") {
            // Make sure that content only added on cursor press
            if (tag === "Input Text") {
                this.line++;
                tempContent.push(tag);
                tempText.push("");
                tempTag.push(false);

                if (this.refs.inputRef) {
                    this.setState({
                        content: tempContent,
                        text: tempText,
                        tags: tempTag
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
                tempTag.push(false);
            } else if (tag === ">") {
                tempText[this.line] = tempText[this.line].substring(0, selA) + '>' + tempText[this.line].substring(selB, tempText[this.line].length);
                tempTag.push(false);
            } else if (tag === "/") {
                tempText[this.line] = tempText[this.line].substring(0, selA) + '/' + tempText[this.line].substring(selB, tempText[this.line].length);
                tempTag.push(false);
            }

            if (this.refs.inputRef) {
                this.setState({
                    text: tempText,
                    tags: tempTag
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
        this.tabs[this.state.focusedLine]++;

        let update = this.state.updater + 1;
        this.setState({
            updater: update
        });
    }

    _tabLeft() {
        if (this.tabs[this.state.focusedLine] > 0) {
            this.tabs[this.state.focusedLine]--;

            let update = this.state.updater + 1;
            this.setState({
                updater: update
            });
        }
    }

    _changeContent(text, line) {
        let temp = this.state.text.slice();
        temp[line - 1] = text;

        this.setState({
            text: temp
        });

        let up = this.state.update + 1;
        this.setState({
            updater: up
        })
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