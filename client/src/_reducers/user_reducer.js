import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

export default function (previousState = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...previousState, loginSuccess: action.payload };
      break;

    case REGISTER_USER:
      return { ...previousState, registerSuccess: action.payload };
      break;

    case AUTH_USER:
      return { ...previousState, userData: action.payload };
      break;

    default:
      return previousState;
  }
}
