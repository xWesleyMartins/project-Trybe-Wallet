import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        Header
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">
            { expenses.reduce((valorAnterior, valorAcumulado) => {
              const value = valorAnterior
              + Number(valorAcumulado.value)
                * valorAcumulado.exchangeRates[valorAcumulado.currency].ask;
              return Number(value.toFixed(2));
            }, 0)}

          </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = { email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
