// Coloque aqui suas actions
export const USER = 'USER';
export const CURR_INFOS = 'CURR_INFOS'; //  OBS: Curr = Currencies or Currency
export const CURR_DATA = 'CURR_DATA';
export const EXPENSES = 'EXPENSES_INFOS';

export const addLoginUser = (payload) => ({
  type: USER,
  payload,
});

export const walletCurrency = (payload) => ({
  type: CURR_INFOS,
  payload,
});

const currencyData = (payload) => ({
  type: CURR_DATA,
  payload,
});

export const currExpenses = (expenses) => ({ type: 'EXPENSES_INFOS',
  expenses,
});

export const currencyAPI = () => async (dispatch) => {
  try {
    const API = 'https://economia.awesomeapi.com.br/json/all';
    const getResponseAPI = await fetch(API);
    const responseJson = await getResponseAPI.json();
    delete responseJson.USDT;

    dispatch(currencyData(responseJson));

    dispatch(walletCurrency(Object.keys(responseJson).filter((currencie) => (
      currencie !== 'USDT'))));
  } catch (error) {
    console.log(error);
  }
};

// export const currExpenses = (expenses) => ({ type: 'EXPENSES',
//   expenses,
// });
