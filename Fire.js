import firebase from 'firebase';
import 'firebase/firestore';

import {firebaseConfig} from './firebaseConfig';

class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    static get ref() {
        return firebase.firestore().collection('messages');
    }

    static get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    static off() {
        Fire.off();
    }

    init = () => firebase.initializeApp(firebaseConfig);

    observeAuth = () => firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            try {
                return firebase.auth().signInAnonymously();
            } catch ({message}) {
                alert(message);
            }
        }
    });

    on = callback => Fire.ref.orderBy('createdAt', 'asc').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                callback(this.parse(change.doc))
            }
        })
    });

    parse = message => {
        const {createdAt, text, user} = message.data();
        const {id: _id} = message;

        return {_id, createdAt: Date(createdAt), text, user};
    };

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const {text, user} = messages[i];
            const message = {text, user, createdAt: new Date()};
            this.append(message);
        }
    };

    append = message => Fire.ref.add(message);
}

Fire.shared = new Fire();
export default Fire;