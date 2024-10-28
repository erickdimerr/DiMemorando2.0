import React from 'react';
import '../styles/login.css';

const Login = () => {
    return (
        <div className='containerLogin'>
            <div className="login-box">
                <div className="profile-pic">
                    <img src="./src/image/channels4_profile.jpg" alt="Profile" />
                </div>
                <h1 className='letterMemorando'>DiMemorando</h1>
                <form>
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;