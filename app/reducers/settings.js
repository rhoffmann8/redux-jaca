import { APPLY_SETTINGS, TOGGLE_SETTINGS } from '../actions/settings';

export default function settings(state = {
  isOpen: true,
  host: 'localhost',
  port: 8081,
  user: '',
  theme: 'default',
  timestamps: false
}, action) {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return Object.assign({}, state, {
        isOpen: !state.isOpen
      });
    case APPLY_SETTINGS:
      return {
        ...action.settings,
        isOpen: false
      };
    default:
      return state;
  }
}