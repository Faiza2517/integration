import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <main className="dashboard-main">
            <div className="dashboard-main-body">
                <div className="card basic-data-table">
                    <div className="card-body py-80 px-32 text-center">
                        <img src="/assets/images/error.jpg" alt="Error" className="mb-24" style={{height:'300px'}}/>
                        <h6 className="mb-16">Page not Found</h6>
                        <p className="text-secondary-light">Sorry, the page you are looking for doesn’t exist.</p>
                        <Link to="/Profile" className="btn btn-primary-600 radius-8 px-20 py-11">Back to Sign In</Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Error;

