const firebase = require ('firebase');
require('firebase/firestore')

export class Firebase {


    constructor(){

        this._config = { 
        apiKey: "AIzaSyALALm4UJTTnHjQdA-MhAbdVg9TgyvdXaw",
        
        authDomain: "zip-zap-53deb.firebaseapp.com",
    
        projectId: "zip-zap-53deb",
    
        storageBucket: "zip-zap-53deb.appspot.com",
    
        messagingSenderId: "180495616663",
        
        storageBucket: 'gs://zip-zap-53deb.appspot.com'
        }
        this.init();

    }

    init(){

       if(!window._initializedFirebase){

        firebase.initializeApp(this._config);

        firebase.firestore().settings({

            timestampsInSnapshots: true

        });

        window._initializedFirebase = true;

       }
        

    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();
    }

    initAuth(){

        return new Promise ((s,f) =>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result=>{

                let token = result.credential.accessToken;
                let user = result.user;
                

                s({
                    user,
                    token
                })
            }).catch(err=>{
                f(err);
            })

        });

    }
}