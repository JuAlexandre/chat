import firebase from 'firebase';

class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    init = () => {
        firebase.initializeApp({
            apiKey: "AIzaSyALOO1DON5DE1HbXfXvqS02pu2jkrk9Saw",
            authDomain: "com-jualexandre-chat.firebaseapp.com",
            databaseURL: "https://com-jualexandre-chat.firebaseio.com",
            projectId: "com-jualexandre-chat",
            storageBucket: "com-jualexandre-chat.appspot.com",
            messagingSenderId: "890413690126"
        });
    };

    observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({message}) {
                alert(message);
            }
        }
    };

    get ref() {
        return firebase.database().ref('messages');
    }

    on = callback => {
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    parse = snapshot => {
        console.log('snapshot', snapshot);
        console.log('snapshot val', snapshot.val());
        const {timestamp: numberStamp, text, user} = snapshot.val();
        const {key: _id} = snapshot;
        const timestamp = new Date(numberStamp);
        return {_id, timestamp, text, user};
    };

    off() {
        this.ref.off();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const {text, user} = messages[i];
            const message = {text, user, timestamp: this.timestamp};
            this.append(message);
        }
    };

    append = message => this.ref.push(message);
}

Fire.shared = new Fire();
export default Fire;