import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removExpenses } from '../redux/actions/index';

// Ref: (table) https://www.w3schools.com/html/html_tables.asp

class Table extends Component {
  removeExpenseBtn = (expense) => {
    const { removeExpenses } = this.props;
    removeExpenses(expense);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        Table
        <table>
          <thead>
            <tr>
              <th>expenses.Descrição</th>
              <th>expenses.Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {expenses.map((expense) => {
            const moeda = expense.exchangeRates[expense.currency];
            return (
              <tbody key={ expense.id }>
                <tr>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{moeda.name}</td>
                  <td>{Number(moeda.ask).toFixed(2)}</td>
                  <td>{Number(expense.value * moeda.ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.removeExpenseBtn(expense) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeExpenses: (removeExpense) => (
    dispatch(removExpenses(removeExpense))
  ),
});
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
