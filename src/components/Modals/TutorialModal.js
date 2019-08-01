import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

export default class TutorialModal extends React.Component {
    constructor() {
        super();

        this.state = {
            visible: true
        }
    }

    // TODO: Make this pretty so that it integrates better onto screens
    render() {
        return (
            <Modal
                style={{backgroundColor: 'transparent'}}
                visible={this.state.visible ? this.props.visible : this.state.visible}
                animationType={'slide'}
                onRequestClose={() => this.setState({ visible: false })}
                onBackdropPress={() => this.setState({ visible: false })}
            >
                <View style={styles.tutContainer}>
                    <Text style={{fontWeight: 'bold', textAlign: 'center'}}>TUTORIAL</Text>
                    <Text style={styles.modalText}>
                        {this.props.msg}
                    </Text>
                </View>
            </Modal>
        )
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
        flex: 0.2,
        borderRadius: 7,
        backgroundColor: 'lightblue',
        marginTop: 75,
    },
    modalText: {
        textAlign: 'center',
        padding: 15
    }
});