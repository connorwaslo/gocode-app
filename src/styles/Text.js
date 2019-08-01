import { StyleSheet } from 'react-native';
import { scale, verticalScale } from "react-native-size-matters";

export const TAB_WIDTH = scale(18);

export default StyleSheet.create({
    sectionTitle: {
        color: '#4C4C4C',
        fontFamily: 'quicksand',
        fontSize: verticalScale(34),
        lineHeight: verticalScale(34)
    },
    sectionTitleWhite: {
        color: '#FFFFFF',
        fontFamily: 'quicksand',
        fontSize: verticalScale(34),
        lineHeight: verticalScale(31),
        paddingTop: verticalScale(3),
        textAlign: 'center'
    },
    mcQuestion: {
        color: '#1CB0F6',
        fontFamily: 'quicksand-medium',
        fontSize: verticalScale(34),
        lineHeight: verticalScale(34),
        textAlign: 'center'
    },
    mcAnswer: {
        color: '#4C4C4C',
        fontFamily: 'quicksand-medium',
        fontSize: verticalScale(26),
        lineHeight: verticalScale(39),
        textAlign: 'left'
    },
    mcAnswerCode: {
        color: '#4C4C4C',
        fontFamily: 'source-code',
        fontSize: verticalScale(21),
        lineHeight: verticalScale(39),
        textAlign: 'left'
    },
    subsectionTitle: {
        color: '#4C4C4C',
        fontFamily: 'quicksand-medium',
        fontSize: verticalScale(26),
        lineHeight: verticalScale(39),
        textAlign: 'center'
    },
    subsectionTitleLeft: {
        color: '#4C4C4C',
        fontFamily: 'quicksand-medium',
        fontSize: verticalScale(26),
        lineHeight: verticalScale(39),
        textAlign: 'left'
    },
    subsectionTitleWhite: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-medium',
        fontSize: verticalScale(26),
        lineHeight: verticalScale(39),
        textAlign: 'center'
    },
    subsectionText: {
        color: '#4C4C4C',
        fontFamily: 'quicksand',
        fontSize: verticalScale(26),
        lineHeight: verticalScale(39),
        textAlign: 'center'
    },
    textInput: {
        color: '#4C4C4C',
        fontFamily: 'quicksand',
        fontSize: verticalScale(26),
        lineHeight: verticalScale(30),
    },
    bodyTitle: {
        color: '#4C4C4C',
        fontFamily: 'quicksand-bold',
        fontSize: verticalScale(19),
        lineHeight: verticalScale(29),
    },
    bodyText: {
        color: '#4C4C4C',
        fontFamily: 'quicksand',
        fontSize: verticalScale(17),
        lineHeight: verticalScale(26),
        textAlign: 'center'
    },
    caption: {
        color: '#4C4C4C',
        fontFamily: 'quicksand-medium',
        fontSize: verticalScale(17),
        lineHeight: verticalScale(23)
    },
    button: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-bold',
        textAlign: 'center',
        fontSize: verticalScale(17),
        lineHeight: verticalScale(23)
    },
    flatButton: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-bold',
        textAlign: 'center',
        fontSize: verticalScale(23),
        lineHeight: verticalScale(26)
    },
    shortCutButton: {
        color: '#4C4C4C',
        fontFamily: 'quicksand-bold',
        textAlign: 'center',
        fontSize: verticalScale(17),
        lineHeight: verticalScale(23)
    },
    disabledButton: {
        color: 'rgba(0, 0, 0, 0.2)',
        fontFamily: 'quicksand-bold',
        textAlign: 'center',
        fontSize: verticalScale(17),
        lineHeight: verticalScale(23)
    },
    tutorialCode: {
        color: '#4C4C4C',
        fontFamily: 'source-code',
        fontSize: verticalScale(17),
        lineHeight: verticalScale(26),
        textAlign: 'left'
    },
    code: {
        color: '#4C4C4C',
        fontFamily: 'source-code',
        fontSize: verticalScale(17),
        lineHeight: verticalScale(26)
    },
    draggableCode: {
        color: '#FFFFFF',
        fontFamily: 'source-code',
        fontSize: verticalScale(23),
        lineHeight: verticalScale(26),
        textAlign: 'left'
    },
    todoText: {
        color: '#4C4C4C',
        fontFamily: 'quicksand-bold',
        fontSize: verticalScale(17),
        lineHeight: verticalScale(26),
        textAlign: 'center'
    },
    coins: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-bold',
        fontSize: verticalScale(24)
    }
})