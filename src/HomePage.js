import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        Hi
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

export { HomePage };