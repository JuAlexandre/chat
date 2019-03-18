import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

class Main extends Component {
    state = {
        name: ''
    };

    onPress = () => {
        if (this.state.name) {
            this.props.navigation.navigate('Chat', {name: this.state.name});
        }
    };

    render() {
        return (
            <View>
                <Text style={styles.title}>Enter your name:</Text>
                <TextInput
                    style={styles.nameInput}
                    placeHolder='Your name'
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}
                />
                <TouchableOpacity onPress={this.onPress}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const offset = 24;
const styles = StyleSheet.create({
    title: {
        marginTop: offset,
        marginLeft: offset,
        fontSize: offset,
    },
    nameInput: {
        height: offset * 2,
        margin: offset,
        paddingHorizontal: offset,
        borderColor: '#111111',
        borderWidth: 1,
    },
    buttonText: {
        marginLeft: offset,
        fontSize: offset,
    },
});

export default Main;