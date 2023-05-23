import { useContext } from 'react';
import AuthContext from "../AuthContext";
import { Link } from 'react-router-dom';
import { formatTime } from './formatTime';

function Profile() {
    const { authorize, user, watchlist, onLogOut } = useContext(AuthContext);

    return (
        <div className="d-flex justify-content-center ">
            { authorize ? 
                <div >
                    <h1 >Welcome {user}</h1>
                    {/* <h2 >This is issues assigned to you:</h2> */}
                    <div>
                        {/* List of issues */}
                    </div>
                    <h2>Your Watchlist:</h2>
                    <div>
                        { watchlist.length > 0 ?
                            watchlist.map((task) => (
                                <Link to={`/tasklist/${task._id}`} key={task._id}>
                                    <div className="bg-light col mb-4 p-3 rounded shadow">
                                        <div className="row text-nowrap">
                                            <div className="col-4 col-md-3 col-lg-2">Status:</div>
                                            <div className="col-8 col-md-9 col-lg-10"><span className={task.status}>{task.status}</span></div>
                                        </div>
                                        <div className="row text-nowrap">
                                            <div className="col-4 col-md-3 col-lg-2">Subject:</div>
                                            <p className="col-8  col-md-9 col-lg-10 text-truncate">{task.subject}</p>
                                        </div>
                                        <div className="row text-nowrap">
                                            <div className="col-4 col-md-3 col-lg-2">Description:</div>
                                            <p className="col-8  col-md-9 col-lg-10 text-truncate">{task.description}</p>
                                        </div>
                                        <div className="row text-nowrap">
                                            <div className="col-4 col-md-3 col-lg-2">Created by:</div>
                                            <p className="col-8 col-md-9 col-lg-10"><em>{task.author}</em> on {formatTime(task.created)}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                            :
                            <div>You have no issues on your watchlist! Start adding by clicking the favorite icon! </div>
                        }
                    </div>
                    <button onClick={onLogOut} className="btn btn-outline-primary"> Log Out </button>
                </div>
                : <h4 className="mt-5"><Link to="/login">Log in</Link> to see your profile</h4>
            }
        </div>
    )
}

export default Profile;