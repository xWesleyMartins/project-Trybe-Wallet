// Coloque aqui suas actions
export const USER = 'USER';
export const CURR_INFOS = 'CURR_INFOS'; //  OBS: Curr = Currencies or Currency

export const addLoginUser = (payload) => ({
  type: USER,
  payload,
});

export const walletCurrency = (payload) => ({
  type: CURR_INFOS,
  payload,
});

const API = 'https://economia.awesomeapi.com.br/json/all';

export const currencyAPI = () => async (dispatch) => {
  const getResponseAPI = await fetch(API);
  const responseJson = await getResponseAPI.json();
  // console.log(responseJson);
  // console.log(Object.keys(responseJson));
  dispatch(walletCurrency(Object.keys(responseJson).filter((currencie) => (
    currencie !== 'USDT'))));
};
