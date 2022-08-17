import React from "react";
import userEvent from "@testing-library/user-event";
// import { within } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
// import mockData from './helpers/mockData';


const INITIAL_STATE = {
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY', 
      'CHF', 
      'AUD',
      'CNY', 
      'ILS', 
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [],
  }
};

describe('Testing Wallet', () => {
  test('walletFormTest', async () => {
      renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const coinValueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    // console.log(currencyInput);
    const payMethodInput =  screen.getByTestId('method-input');
    const tagInput =  screen.getByTestId('tag-input');
    const addDespesa = screen.getByRole('button', {name: /Adicionar despesa/i});
    
    // console.log(coinValueInput);
    // console.log(currencyInput);
    expect(currencyInput).toBeInTheDocument()
    expect(payMethodInput).toBeInTheDocument()
    expect(tagInput).toBeInTheDocument()
    userEvent.type(coinValueInput, '1');
    userEvent.type(descriptionInput, 'teste');
    await waitFor(() => expect(screen.getByText('USD')).toBeInTheDocument());
    // userEvent.selectOptions(currencyInput, 'USD');
    // // userEvent.selectOptions(screen.getByTestId('currency-input'), 'USD')
    // // fireEvent.selectOptions(currencyInput, 'USD');
    // userEvent.selectOptions(payMethodInput, 'Cartão de débito');
    // userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(addDespesa);
    await waitFor(() => expect(screen.getByText('USD')).toBeInTheDocument());
    const coinValue = screen.getByRole('cell', { name: /1\.00/i });
    expect(coinValue).toBeInTheDocument();

    const descriptionValue = screen.getByRole('cell', { name: /teste/i });
    expect(descriptionValue).toBeInTheDocument();

    const currencyValue = screen.getByRole('cell', { name: /USD/i });
    expect(currencyValue).toBeInTheDocument();

    const methodValue = screen.getByRole('cell', { name: /Cartão de débito/i });
    expect(methodValue).toBeInTheDocument();
    
    const tagValue = screen.getByRole('cell', { name: /Lazer/i });
    expect(tagValue).toBeInTheDocument();
    
 
    // expect(descriptionInput).toBeInTheDocument()
    // expect(currencyInput).toBeInTheDocument()
    // expect(payMethodInput).toBeInTheDocument()
    // expect(payMethodInput).toBeInTheDocument()
    // expect(tagInput).toBeInTheDocument()
    // expect(addDespesa).toBeInTheDocument()
  
    
  });

  // test('Um campo para selecionar em qual moeda será registrada a despesa', async () => {
  //   // renderWithRouterAndRedux(<Wallet />, '/carteira');
  //   const { store } = renderWithRouterAndRedux(<Wallet />, '/carteira');
  //   console.log(store.getState());
  //   const moeda = await screen.findByRole('combobox', {
  //     name: /moeda/i,
  //   });
   
  //   const moedas = within(moeda).getAllByRole('option');
  //   const moedasMap = moedas.map((moeda) => moeda.value);
  //   const moedasEsperadas = [
  //     'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
  //     'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE',
  //   ];
  //   expect(moedasMap).toEqual(moedasEsperadas);
  //   expect(mockAPI).toBeCalled();
  //   expect(mockAPI).toBeCalledWith('https://economia.awesomeapi.com.br/json/all%27');
  //   expect(moeda).toBeInTheDocument();
  // });
})