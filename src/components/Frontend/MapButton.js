import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import DataStorage from '../../utility/DataStorage';

export default class MapButton extends React.Component {
    render() {
        if (DataStorage.lesson === 0) {
            if (this.props.num === 1) {
                return (
                    <TouchableOpacity onPress={this.props.onPress} style={this.props.style.pos}>
                        <View style={this.props.style.shape}/>
                    </TouchableOpacity>
                )
            }

            return (
                <TouchableOpacity onPress={this.props.onPress} style={this.props.style.pos}>
                    <View style={this.props.style.unavailable}/>
                </TouchableOpacity>
            )
        } else {
            if (DataStorage.lesson === this.props.num - 1) {
                return (
                    <TouchableOpacity onPress={this.props.onPress} style={this.props.style.pos}>
                        <View style={this.props.style.shape}/>
                    </TouchableOpacity>
                )
            }

            return (
                <TouchableOpacity onPress={DataStorage.lesson >= this.props.num ? this.props.onPress : () => {}} style={this.props.style.pos}>
                    <View style={DataStorage.lesson >= this.props.num ? this.props.style.completed : this.props.style.unavailable}/>
                </TouchableOpacity>
            )
        }
    }
}