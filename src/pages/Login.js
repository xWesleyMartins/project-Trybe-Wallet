import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addLoginUser as Action } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    changeButton: true,
    redirect: false,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleChangeButton);
  }

  handleChangeButton = () => {
    const { email, password } = this.state;
    const minPassCharacters = 6;
    if (password.length >= minPassCharacters && email.includes('@')
      && email.includes('.com')) {
      this.setState({
        changeButton: false,
      });
    } else {
      this.setState({
        changeButton: true,
      });
    }
  }

  eventButton = () => {
    const { email } = this.state;
    const { addLoginUser } = this.props;
    addLoginUser(email);
    this.setState({ redirect: true });
  }

  render() {
    const { email, password, changeButton, redirect } = this.state;

    return (
      <div>
        Login
        <div>
          <div>
            { redirect && <Redirect to="/carteira" /> }
          </div>
          <label htmlFor="email-input-login">
            email
            <input
              data-testid="email-input"
              name="email"
              type="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="password-input">
            password
            <input
              data-testid="password-input"
              name="password"
              type="password"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>
          <button
            type="button"
            disabled={ changeButton }
            onClick={ this.eventButton }
            name="Entrar"
            value="Entrar"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLoginUser: (email) => dispatch(Action(email)),
});

Login.propTypes = {
  addLoginUser: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
