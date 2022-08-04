// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURR_INFOS } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],

};
const wallet = (state = INITIAL_STATE, action) => {
  // const { currencies } = action;
  switch (action.type) {
  case CURR_INFOS: return { ...state, currencies: action.payload };
  default: return state;
  }
};
export default wallet;
