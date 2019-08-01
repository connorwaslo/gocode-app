import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { scale, verticalScale } from 'react-native-size-matters';
import Button from '../Frontend/Button';
import textStyles from '../../styles/Text';

export default class LessonModal extends React.Component {
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
                    visible={this._isVisible()}
                    animationType={'slide'}
                    onRequestClose={this.triggerOverlay}
                    onBackdropPress={this.triggerOverlay}
                >
                    <View style={styles.tutContainer}>
                        <Text style={textStyles.subsectionTitle}>Tutorial</Text>
                        <ScrollView style={{ flex: 10 }}>
                            {this._renderText()}
                        </ScrollView>
                        <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                            <Button type='primary' disabled={false} title='Next' onPress={this.triggerOverlay}/>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    _renderText() {
        return this.props.msg.map((str, i) => {
            let text = '';
            let code = false;
            if (str.substring(0, 1) === '~') {
                text = str.substring(1, str.length);
                code = true;
            } else {
                text = str;
            }
            return (
                <View key={i} style={code ? styles.codeView : styles.textView}>
                    <Text style={code ? textStyles.tutorialCode : textStyles.bodyText}>
                        {text}
                    </Text>
                </View>
            )
        })
    }

    _triggerOverlay() {
        this.setState({ visible: false });
        this.props.triggerOverlay();
    }

    _isVisible() {
        return this.props.visible;
    }
}

const styles = StyleSheet.create({
    tutContainer: {
        flex: 1,
        borderRadius: 7,
        borderColor: '#000000',
        borderWidth: 2,
        backgroundColor: '#F0F0F0',
        marginTop: 75
    },
    textView: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10)
    },
    codeView: {
        backgroundColor: '#DDDDDD',
        marginHorizontal: scale(25),
        paddingHorizontal: scale(10)
    }
});