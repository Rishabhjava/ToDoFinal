import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const [currentView, setCurrentView] = useState("logIn");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin =  (e) => {
        console.log('why stuck?');
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/");
                // You may want to handle user state here
            })
            .catch((error) => {
                console.error('Login Error:', error.message);
                // You may want to show error to the user
            });
    };

    const handleSignup =  async (e) => {
        e.preventDefault();
        try {
            console.log('hello');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            changeView("logIn"); // Adjust the route as needed
        } catch (error) {
            console.error("Signup Error:", error.code, error.message);
        }
    };

    const changeView = (view) => {
        setCurrentView(view);
    };

    

    const renderCurrentView = () => {
        switch(currentView) {
            case "signUp":
                return (
                    <form>
                        <h2>Sign Up</h2>
                        <fieldset>
                            <legend>Create Account</legend>
                            <ul>
                                <li>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} required/>
                                </li>
                                <li>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
                                </li>
                            </ul>
                        </fieldset>
                        <button onClick={(e) => handleSignup(e)}>Sign Up!</button>
                        <button type="button" onClick={() => changeView('logIn')}>Have an Account?</button>
                    </form>
                );
            case "logIn":
                return (
                    <form>
                        <h2>Welcome Back!</h2>
                        <fieldset>
                            <legend>Log In</legend>
                            <ul>
                                <li>
                                    <label htmlFor="username">Email:</label>
                                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} required/>
                                </li>
                                <li>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
                                </li>
                            </ul>
                        </fieldset>
                        <button onClick={(e) => handleLogin(e)}>Login</button>
                        <button type="button" onClick={() => changeView('signUp')}>Create an Account</button>
                    </form>
                );
            
            default:
                return null;
        }
    };

    return (
        <section id="entry-page">
            {renderCurrentView()}
        </section>
    );
}

export default Login;
