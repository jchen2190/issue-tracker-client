import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
    // const location = useLocation()

    return (
        <div className="d-flex container justify-content-center align-items-center">
            <div className="row">
                <div className="col">
                    Item 1
                </div>
                <div className="col">
                    Item 2
                </div>
                <div className="col">
                    Item 3
                </div>
                <div className="col">
                    Item 4
                </div>
            </div>
        </div>
    );
}

export default Home;