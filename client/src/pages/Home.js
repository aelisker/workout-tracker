import React from 'react';

function Home(props) {

    const {

      setContactSelected
    } = props;

    return (
        <header className="flex-row px-1 header-stylin">
        <div className = "row ">
        <div className = "column ">
        <h3>
          <div data-testid="link" href="/"> Strength Training
          </div>
        </h3>
        <h4>
          <a data-testid="link" href="/"> Curls
          </a>
        </h4>
        <h4>
          <a data-testid="link" href="/"> Bench Press
          </a>
        </h4>
        <h4>
          <a data-testid="link" href="/"> Flies
          </a>
        </h4>
        <h4>
          <a data-testid="link" href="/"> Squats
          </a>
        </h4>
        <h4>
          <a data-testid="link" href="/"> Leg Extensions
          </a>
        </h4>
        <h4>
          <a data-testid="link" href="/"> Push-ups
          </a>
        </h4>
        <h4>
          <a data-testid="link" href="/"> Chin-ups
          </a>
        </h4>
        <h4>
          <a data-testid="link" href="/"> Sit-ups
          </a>
        </h4>
        </div>
        <div className="column">




        <h3>
          <div data-testid="link" href="/"> Aerobic Exercise
          </div>
        </h3>
        <h4>
          <a data-testid="link" href="/"> Running
          </a>
        </h4>
        <h4>
          <a data-testid="link" href="/"> Walking
          </a>
        </h4>
        <h4>
          <a data-testid="link" href="/"> Swimming
          </a>
        </h4>
        <h4>
          <a data-testid="link" href="/"> Biking
          </a>
        </h4>

       
        </div>
        </div>

          </header>
    );
    }

    export default Home;