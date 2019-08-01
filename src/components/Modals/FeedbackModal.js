import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import textStyles from '../../styles/Text';
import ModalButton from "../Frontend/ModalButton";
import Communications from "react-native-communications";

export default class FeedbackModal extends React.Component {
    state = {
        visible: true
    };

    requestClose = this._requestClose.bind(this);
    sendFeedback = this._sendFeedback.bind(this);

    render() {
        return (
            <Modal
                style={{backgroundColor: 'transparent'}}
                visible={this.state.visible ? this.props.visible : this.state.visible}
                animationType={'slide'}
                onRequestClose={() => this.setState({ visible: false })}
            >
                <View style={styles.tutContainer}>
                    <Text style={textStyles.subsectionTitleWhite}>Would you mind giving us some feedback?</Text>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <ModalButton solid={false} title='No, thanks.' onPress={this.requestClose}/>
                        <ModalButton solid={true} title='Ok, sure!' onPress={this.sendFeedback}/>
                    </View>
                </View>
            </Modal>
        )
    }

    _requestClose() {
        this.setState({
            visible: false
        });
    }

    _sendFeedback() {
        Communications.web('https://www.gocode.courses/feedback.html');

        this.setState({
            visible: false
        });
    }
}

const styles = StyleSheet.create({
    tutBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 0,
        margin: 0
    },
    tutContainer: {
        flex: 0.3,
        backgroundColor: '#8549BA',
        borderRadius: scale(10),
        marginTop: 75,
    },
    modalText: {
        textAlign: 'center',
        padding: 15
    }
});