// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmQYhgarzhiVq7j6UIIeVIW5D_dlbNPsM",
authDomain: "movie-app-853cc.firebaseapp.com",
databaseURL: "https://movie-app-853cc-default-rtdb.firebaseio.com",
projectId: "movie-app-853cc",
storageBucket: "movie-app-853cc.appspot.com",
messagingSenderId: "623442156041",
appId: "1:623442156041:web:cefdda0a1310d3c5e8b6d8",
measurementId: "G-0P764PF4PV"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

submitData.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;

    //sign up user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ... user.uid
            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user created successfully');
                    
                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage);
        });

    // log in user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...

            // save log in details into real time database
            var lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user logged in successfully');
                    const a=document.querySelector(".gayab");
                    a.classList.remove("gayab");
                    a.classList.add("jinda");
                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

   // sign out user
    signOut(auth).then(() => {
           // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
});
