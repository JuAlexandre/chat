import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

import Fire from '../Fire';

class Chat extends Component {
    state = {
        messages: []
    };

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
        Fire.off();
    }

    get user() {
        return {
            name: this.props.navigation.state.params.name,
            _id: Fire.uid,
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

export default Chat;