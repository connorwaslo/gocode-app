import React from 'react';
import { View, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
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
        let top = Dimensions.get('window').height / 2;
        let bottom = Dimensions.get('window').height / 6;

        return (
                <Modal
                    style={{backgroundColor: 'transparent', flex: 1}}
                    visible={this._isVisible()}
                    animationType={'slide'}
                    onRequestClose={this.triggerOverlay}
                >
                    <View style={styles.tutContainer}>
                        <Text style={[textStyles.subsectionTitle, { paddingBottom: verticalScale(5) }]}>Error!</Text>
                        <Text style={textStyles.bodyText}>{this.props.msg}</Text>

                        <View style={{ flex: 2 }}/>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: verticalScale(15) }}>
                            <Button type='primary' disabled={false} title='Next' onPress={this.triggerOverlay}/>
                        </View>
                    </View>
                </Modal>
        )
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
        borderColor: '#E53B3B',
        borderWidth: 2,
        backgroundColor: '#F0F0F0',
        marginTop: Dimensions.get('window').height / 2,
        paddingHorizontal: scale(10)
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