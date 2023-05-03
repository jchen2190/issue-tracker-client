import React, { useState } from 'react';
import Login from './LogIn';
import SignUp from './SignUp';

function User() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div>
            {
                currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm} />
            }
        </div>
    );
}

export default User;