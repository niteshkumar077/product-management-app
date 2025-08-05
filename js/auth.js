import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = signupForm.email.value;
            const password = signupForm.password.value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), { email: user.email });
                
              
                await Swal.fire({
                    title: 'Success!',
                    text: 'Account created! Redirecting to login...',
                    icon: 'success',
                    timer: 2000, 
                    showConfirmButton: false
                });
                window.location.href = 'login.html';

            } catch (error) {
                
                Swal.fire({
                    title: 'Signup Failed',
                    text: error.message,
                    icon: 'error'
                });
            }
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            try {
                await signInWithEmailAndPassword(auth, email, password);
                window.location.href = 'dashboard.html';
            } catch (error) {
                
                Swal.fire({
                    title: 'Login Failed',
                    text: error.message,
                    icon: 'error'
                });
            }
        });
    }
});