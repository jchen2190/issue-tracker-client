import React from 'react';

function LogOut() {

    async function LogOutUser(req, res) {
        console.log(req.session);
        try {
            res.clearCookie("connect.sid", {
                path: "/",
                httpOnly: true,
                secure: false,
                maxAge: null
            })
            // Clear the session from the server
            req.session.destroy();
    
            // send the client to the log in page
            res.redirect("/logIn");
        } catch (error) {
            console.log(`logOutUser error: ${error}`);
        }
    }

    LogOutUser();

    return (
        <div>
            You have logged out.
        </div>
    )
}

export default LogOut