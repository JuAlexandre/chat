import React, {Component} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import Fire from '../Fire';

class Chat extends Component {
    state = {messages: []};

    static navigationOptions = ({navigation}) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    componentDidMount() {
        Fire.shared.on(message => {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message)
            }))
        })
    }

    componentWillUnmount() {
        Fire.shared.off();
    }

    get user() {
        return {
            name: this.props.navigation.state.params.name,
            _id: Fire.shared.uid,
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={Fire.shared.send}
                    user={this.user}
                />
                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={80} />
            </View>
        )
    }
}

const styles = StyleSheet.create({});

export default Chat;