import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/home");
                // You may want to handle user state here
            })
            .catch((error) => {
                console.error('Login Error:', error.message);
                // You may want to show error to the user
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Login to FocusApp</h3>
                <form onSubmit={onLogin}>
                    <div className="mt-4">
                        <label className="block" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block">Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button 
                            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                        >
                            Login
                        </button>
                        <NavLink 
                            to="/signup" 
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Sign up
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
