import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { STATUSBAR_HEIGHT } from "./Constants";

let width = Dimensions.get('window').width;

export default StyleSheet.create({
    lessonContainer: {
        flex: 10
    },
    lineContainer: {
        flexDirection: 'row'
    },
    lineNumber: {
        flex: 1
    },
    lineInput: {
        flex: 10,
        fontFamily: 'monospace'
    },
    codeContainer: {
        paddingLeft: scale(30)
    },
    bold: {
        fontWeight: 'bold'
    },
    blurCode: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    run: {
        position: 'absolute',
        bottom: verticalScale(20),
        left: (width / 2) - ((scale(225) / 2)),
        right: (width / 2) - ((scale(225) / 2))
    },
    runButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10
    },
    todoView: {
        paddingHorizontal: scale(20),
        marginVertical: verticalScale(20)
    },
    codeOutputContainer: {
        paddingHorizontal: scale(20)
    }
});
