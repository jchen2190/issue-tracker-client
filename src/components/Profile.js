import { useContext } from 'react';
import AuthContext from "../AuthContext";
import { Link } from 'react-router-dom';

function Profile() {
    const { authorize, username, onLogOut } = useContext(AuthContext);

    return (
        <div className="d-flex justify-content-center ">
            { authorize ? 
                <div >
                    <h1 >Welcome {username}</h1>
                    {/* <h2 >This is issues assigned to you:</h2> */}
                    <div>
                        {/* List of issues */}
                    </div>
                    <button onClick={onLogOut} className="btn btn-outline-primary"> Log Out </button>
                </div>
                : <h4 className="mt-5"><Link to="/login">Log in</Link> to see your profile</h4>
            }
        </div>
    )
}

export default Profile;