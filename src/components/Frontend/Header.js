import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {scale, verticalScale} from "react-native-size-matters";
import textStyles from "../../styles/Text";
import DataStorage from "../../utility/DataStorage";

const HeaderButton = (props) => (
    <View style={props.style}>
        <TouchableOpacity onPress={props.onPress}>
            <View style={{ flex: 1}}>
                <Image source={props.src} style={props.imgStyle}/>
            </View>
            <View style={{ position: 'absolute', right: scale(5), bottom: verticalScale(7) }}>
                <Text style={textStyles.coins}>{props.coins}</Text>
            </View>
        </TouchableOpacity>
    </View>
);

export const MapHeader = (props) => (
    <View style={headerStyles.container}>
        <View style={headerStyles.titleContainer}>
            <Text style={[headerStyles.title, headerStyles.titleText]}>{props.title}</Text>
        </View>
        <HeaderButton src={require('../../res/images/profile_icon.png')}
                      style={headerStyles.profileContainer}
                      imgStyle={headerStyles.profileIcon}
                      onPress={props.onPressProfile}/>
        <HeaderButton src={require('../../res/images/coin_icon.png')}
                      coins={DataStorage.lesson}
                      style={headerStyles.treasureContainer}
                      imgStyle={headerStyles.coinIcon}
                      onPress={props.onPressProfile}/>
    </View>
);

const headerStyles = StyleSheet.create({
    container: {
        height: verticalScale(80),
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0D47A1'
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(15)
    },
    titleText: {
        color: '#FFFFFF',
        fontFamily: 'quicksand-medium',
        fontSize: verticalScale(29),
        textAlign: 'center'
    },
    profileContainer: {
        position: 'absolute',
        left: scale(15),
        bottom: verticalScale(5)
    },
    treasureContainer: {
        position: 'absolute',
        right: scale(14),
        bottom: verticalScale(5)
    },
    profileIcon: {
        width: verticalScale(41.4),
        height: verticalScale(45)
    },
    coinIcon: {
        width: verticalScale(48.6),
        height: verticalScale(45),
        marginRight: scale(25)
    }
});