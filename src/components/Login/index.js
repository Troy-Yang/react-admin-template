import React from 'react';
import Logo from '../../images/logo.png';
import { authenticationService } from '../../services';
import './index.css';

class Login extends React.Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
      loading: false,
      submitted: false,
      error: ''
    };

    authenticationService.logout();

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    if (!(username && password)) {
      return;
    }
    
    this.setState({ 
      submitted: true,
      loading: true,
      error: ''
     });
     authenticationService.login(username, password)
      .then(
        user => {
          const { from } = this.props.location.state || { from: { pathname: "/" } };
          this.props.history.push(from);
        },
        error => this.setState({ error, loading: false })
      );
  }

  render() {
    const { username, password, submitted, loading, error } = this.state;
    return (
      <div>
        <div className="modal-backdrop fade in"></div>
        <div className="modal-dialog modal-login">
          <div className="modal-content">
            <div className="modal-header">
              <div className="avatar">
                <img src={Logo} alt="Avatar"></img>
              </div>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                  <input type="text" className="form-control" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}></input>
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                  <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
                </div>
                <div className="form-group">
                  <input type="submit" className="btn btn-primary btn-lg btn-block login-btn" value="Login" disabled={!this.validateForm() || loading}></input>
                  {loading &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
                </div>
                {error &&
                  <div className="alert alert-danger error-message" role="alert">{error}</div>
                }
              </form>
            </div>
            <div className="modal-footer">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;