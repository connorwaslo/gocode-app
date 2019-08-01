import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import textStyles from "../../styles/Text";
import { scale, verticalScale } from "react-native-size-matters";

export const BlueHeader = (props) => (
    <View style={styles.header}>
        <Text style={textStyles.sectionTitleWhite}>{props.title}</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#14D4F4',
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: verticalScale(33),
        paddingHorizontal: scale(10)
    }
});