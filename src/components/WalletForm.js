import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencyAPI } from '../redux/actions/index';

class WalletForm extends Component {
  // stete = {
  //   tag: 'Alimentação'
  // }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currencyAPI());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        WalletForm
        <form>
          <label htmlFor="value-input">
            <input
              data-testid="value-input"
              type="text"
            />
          </label>
          <label htmlFor="description-input">
            <input
              data-testid="description-input"
              type="textarea"
            />
          </label>
          <label htmlFor="currency-input">
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              type="text"
            >
              { currencies.map((currency) => (
                <option key={ currency }>{ currency }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currenciesAction: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
