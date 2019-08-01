import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

export default class OutputModal extends React.Component {
    constructor() {
        super();

        this.triggerOverlay = this._triggerOverlay.bind(this);

        this.state = {
            visible: true
        }
    }

    render() {
        return (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <Modal
                    style={{backgroundColor: 'transparent'}}
                    visible={this.props.visible}
                    animationType={'slide'}
                >
                    <View style={styles.tutContainer}>
                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>GOOD JOB!</Text>
                        {this._renderText()}
                        <Button title='View Website' onPress={this.triggerOverlay}/>
                    </View>
                </Modal>
            </View>
        )
    }

    _renderText() {
        return this.props.msg.map((str, i) => {
            return (
                <Text key={i} style={styles.modalText}>
                    {str}
                </Text>
            )
        })
    }

    _triggerOverlay() {
        this.setState({ visible: false });
        this.props.triggerOverlay();
    }

    _isVisible() {
        if (this.props.visible) {
            return true;
        }

        return false;
    }
}

const styles = StyleSheet.create({
    tutBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'purple'
    },
    tutContainer: {
        flex: 0.8,
        borderRadius: 7,
        backgroundColor: 'lightblue',
        marginTop: 75,
    },
    modalText: {
        textAlign: 'center',
        padding: 15
    },
    blurCode: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
});