import React from 'react';
import Auth from '../../utils/auth';

function Header() {

    // const {
    //   currentWorkout,
    //   setCurrentWorkout,
    //   setContactSelected
    // } = props;

    return (
        <header className="flex-row px-1 header-stylin header-color ">
        <div>
        <h1>
          <a  href="/" className="d-flex justify-content-center">
            <span role="img" > </span> Workout Tracker
          </a>

          {Auth.loggedIn() ? (
                <>
                <div>
                  <a href="/" onClick={Auth.logout}  className="d-flex justify-content-end login-size">Logout</a>
                </div>
                </>
              ) : (
                <div>
                    <a  href="/signup" className="d-flex justify-content-end login-size">
                        <span role="img" > </span> Signup / 
                    </a>                    
                    <a  href="/login" className="d-flex justify-content-end login-size" >
                        <span role="img" > </span> Login
                    </a>


                </div>
              )}
        </h1>

        </div>
      
          </header>
    );
    }

    export default Header;