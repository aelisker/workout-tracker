import React from 'react';
import Auth from '../../utils/auth';
import Background from '../../assets/img/gradient.png'

function Header() {

  return (
    <header
      // using css generated gradient instead
      // style={{
      //   backgroundImage: `url(${Background})`
      // }}
      className="flex-row px-1 header-stylin page-header "
    >
      <h1 className="header-left">
        <a href="/" className="d-flex title">
          Workout Tracker
        </a>
      </h1>

      <nav className="header-right">
        {Auth.loggedIn() ? (
          <ul>
            <li>
              <a href="/workout" className="d-flex justify-content-end login-size">New Workout</a>
            </li>
            <li>
              <a href="/myworkouts" className="d-flex justify-content-end login-size">My Workouts</a>
            </li>
            <li>
              <a href="/" onClick={Auth.logout} className="d-flex justify-content-end login-size">Logout</a>
            </li>
          </ul>
        ) : (
            <ul>
              <li>
                <a href="/signup" className="d-flex justify-content-end login-size">
                  Signup
                </a>
              </li>
              <li>
                <a href="/login" className="d-flex justify-content-end login-size" >
                  Login
                </a>
              </li>
            </ul>
          )}
      </nav>
    </header>
  );
}

export default Header;