import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import DataStorage from "../../utility/DataStorage";
import { BlueHeader } from "./MenuHeaders";
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../Frontend/Button';
import textStyles from '../../styles/Text';
import * as SecureStore from 'expo-secure-store';

const Goal = (props) => (
    <React.Fragment>
        <TouchableOpacity {...props}>
            <View style={styles.goal}>
                <Text style={[textStyles.sectionTitle, { textAlign: 'left' }]}>{props.title}</Text>
                <View style={{ position: 'absolute', right: scale(10), alignItems: 'center' }}>
                    <Icon name={props.selected ? 'md-radio-button-on' : 'md-radio-button-off'}
                          style={{ color: '#777777' }} size={verticalScale(40)}/>
                </View>
            </View>
        </TouchableOpacity>
        <View style={styles.lineBreak}/>
    </React.Fragment>
);

export default class GoalSelect extends React.Component {
    constructor() {
        super();

        this.submitGoal = this._submitGoal.bind(this);

        this.state = {
            goal: '',
            selected: -1
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <BlueHeader title='How interested are you?'/>

                <View style={{ flex: 8 }}>
                    <Goal title='Curious'
                          onPress={() => this._setGoal('Curious', 0)}
                          selected={this.state.selected === 0}/>
                    <Goal title='Interested'
                          onPress={() => this._setGoal('Interested', 1)}
                          selected={this.state.selected === 1}/>
                    <Goal title='Amateur'
                          onPress={() => this._setGoal('Amateur', 2)}
                          selected={this.state.selected === 2}/>
                    <Goal title='Professional'
                          onPress={() => this._setGoal('Professional', 3)}
                          selected={this.state.selected === 3}/>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Button type='primary' title='Next' disabled={this.state.selected === -1} onPress={this.submitGoal}/>
                    </View>
                </View>
            </View>
        )
    }

    _setGoal(selection, num) {
        this.setState({
            goal: selection,
            selected: num
        });
    }

    _submitGoal() {
        DataStorage.goal = this.state.goal;

        SecureStore.setItemAsync('goal', this.state.goal)
            .then(() => {
                const {navigate} = this.props.navigation;

                navigate('Root');
            })
    }
}

const styles = StyleSheet.create({
    goal: {
        height: verticalScale(110),
        marginHorizontal: scale(15),
        paddingHorizontal: scale(10),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    lineBreak: {
        marginHorizontal: scale(10),
        borderBottomWidth: verticalScale(2),
        borderTopWidth: 0
    }
});