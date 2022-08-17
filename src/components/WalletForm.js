import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencyAPI, currExpenses } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currencyAPI());
  }

 handleChange = ({ target }) => {
   const { name, value } = target;
   this.setState({
     [name]: value,
   });
 }

handleSubmit = async () => {
  const getResponseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseJson = await getResponseAPI.json();
  const { expenses } = this.props;
  const { value, description, currency, method, tag } = this.state;
  const expensesOBJ = {
    id: expenses && expenses.length,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates: responseJson,
  };
  this.setState({ value: '', description: '' });
  const { dispatch } = this.props;
  dispatch(currExpenses(expensesOBJ));
}

render() {
  const { currencies } = this.props;
  const { value, description, currency, method, tag } = this.state;
  return (
    <div>
      WalletForm
      <form>
        <label htmlFor="value-input">
          Valor
          <input
            data-testid="value-input"
            type="text"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição
          <input
            data-testid="description-input"
            type="textarea"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda
          <select
            id="currency-input"
            data-testid="currency-input"
            type="text"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((currencyParam) => (
              <option
                value={ currencyParam }
                key={ currencyParam }
              >
                { currencyParam }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          <select
            data-testid="method-input"
            id="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currenciesAction: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
