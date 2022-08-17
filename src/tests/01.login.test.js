import React from "react";
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen } from '@testing-library/react';
import App from '../App';
import Login from "../pages/Login";
import userEvent from "@testing-library/user-event";

describe('Login Test', () => {

  test('Testing Renderizing Login elements', () => {
    renderWithRouterAndRedux(<Login />);

    const loginBTN = screen.getByRole('button', {name: /Entrar/i});
    expect(loginBTN).toBeInTheDocument();

    const inputEmail = screen.getByTestId("email-input");
    expect(inputEmail).toBeInTheDocument();
    
    const inputPass = screen.getByTestId('password-input')
    expect(inputPass).toBeInTheDocument();
   
  });

  test('Testing App elements', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const inputEmail = screen.getByTestId("email-input");
    const inputPass = screen.getByTestId('password-input');
    const loginBTN = screen.getByRole('button', {name: /Entrar/i});
    
    userEvent.type(inputEmail, 'teste@testcom')
    userEvent.type(inputPass, '123456')
    expect(loginBTN).toBeDisabled();
    
    userEvent.type(inputEmail, 'teste@test.com')
    userEvent.type(inputPass, '12345')
    expect(loginBTN).toBeDisabled();
    
    userEvent.type(inputEmail, 'teste@test.com')
    userEvent.type(inputPass, '123456')
    expect(loginBTN).toBeEnabled();
    
    userEvent.type(inputEmail, 'teste@test.com')
    userEvent.type(inputPass, '123456')
    userEvent.click(loginBTN)
    expect(history.location.pathname).toBe('/carteira')

  });
  
})