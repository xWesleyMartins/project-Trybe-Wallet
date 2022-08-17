import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';


// const INITIAL_STATE = {
//   wallet: {
//     currencies: [
//       'USD',
//       'CAD',
//       'GBP',
//       'ARS',
//       'BTC',
//       'LTC',
//       'EUR',
//       'JPY', 
//       'CHF', 
//       'AUD',
//       'CNY', 
//       'ILS', 
//       'ETH',
//       'XRP',
//       'DOGE',
//     ],
//     expenses: [],
//   }
// };

describe('Testing Wallet', () => {
  test('walletFormTest', async () => {
      renderWithRouterAndRedux(<Wallet />);

    const coinValueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const payMethodInput =  screen.getByTestId('method-input');
    const tagInput =  screen.getByTestId('tag-input');
    const addDespesa = screen.getByRole('button', {name: /Adicionar despesa/i});
    
    // expect(currencyInput).toBeInTheDocument()
    // expect(payMethodInput).toBeInTheDocument()
    // expect(tagInput).toBeInTheDocument()
    userEvent.type(coinValueInput, '1');
    userEvent.type(descriptionInput, 'teste');

    await waitFor(() =>
      expect(screen.getByText('USD')).toBeInTheDocument());

    userEvent.selectOptions(currencyInput, 'USD')    
    userEvent.selectOptions(payMethodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Lazer');    
    userEvent.click(addDespesa);

    await waitFor(() => expect(screen.getByText('1.00')).toBeInTheDocument());
    const coinValue = screen.getByText('1.00');
    expect(coinValue).toBeInTheDocument();

    const descriptionValue = screen.getByText('teste');
    expect(descriptionValue).toBeInTheDocument();

    const currencyValue = screen.getByText('USD');
    expect(currencyValue).toBeInTheDocument();

    const methodValue = screen.getAllByText('Cartão de débito');
    expect(methodValue[1]).toBeInTheDocument();
    
    const tagValue = screen.getAllByText('Lazer');
    expect(tagValue[1]).toBeInTheDocument();

    const DeletDespesa = screen.getByRole('button', {name: /Excluir/i});
    userEvent.click(DeletDespesa);


    expect(coinValue).not.toBeInTheDocument()
    expect(descriptionValue).not.toBeInTheDocument()
    // expect(currencyValue).not.toBeInTheDocument()
    expect(methodValue[1]).not.toBeInTheDocument()
    expect(tagValue[1]).not.toBeInTheDocument()
  });
})