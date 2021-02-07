import { SET_ALERT } from '../actions';
import { ALERT } from '../consts';

const initialState = {
  text: null,
  style: ALERT.SUCCESS
}

const alert = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, text: action.text, style: action.style };
    default:
      return state;
  }
}

export default alert;