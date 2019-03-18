import firebase from 'firebase';

import {firebaseConfig} from './firebaseConfig';

class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    static get ref() {
        return firebase.database().ref('messages');
    }

    static get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    static get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    static off() {
        Fire.off();
    }

    init = () => firebase.initializeApp(firebaseConfig);

    observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                return firebase.auth().signInAnonymously();
            } catch ({message}) {
                alert(message);
            }
        }
    };

    on = callback => Fire.ref.on('child_added', snapshot => callback(this.parse(snapshot)));

    parse = snapshot => {
        const {timestamp: numberStamp, text, user} = snapshot.val();
        const {key: _id} = snapshot;
        const timestamp = new Date(numberStamp);

        return {_id, timestamp, text, user};
    };

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const {text, user} = messages[i];
            const message = {text, user, timestamp: Fire.timestamp};
            this.append(message);
        }
    };

    append = message => Fire.ref.push(message);
}

Fire.shared = new Fire();
export default Fire;