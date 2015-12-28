import expect from 'expect';
import * as actions from '../src/actions';

describe('actions', () => {
  it ('should create an action to toggle settings', () => {
    const expectedAction = {
      type: actions.TOGGLE_SETTINGS,
    };
    expect(actions.toggleSettings()).toEqual(expectedAction);
  });

  it ('should create an action to apply settings', () => {
    const settings = {
      name: 'TestUser',
      host: 'localhost',
      port: '8081',
      theme: 'default'
    };
    const expectedAction = {
      type: actions.APPLY_SETTINGS,
      settings
    };
    const action = actions.applySettings(settings);
    expect(action).toEqual(expectedAction);
    Object.keys(settings).forEach((key) => {
      expect(action.settings[key]).toEqual(settings[key]);
    });
  });

  it ('should create an action to init', () => {
    const userInfo = {
      loggedIn: false,
      name: undefined
    };
    const expectedAction = {
      type: actions.EVENT_INIT,
      userInfo
    };
    const action = actions.init(userInfo);
    expect(action).toEqual(expectedAction);
    Object.keys(userInfo).forEach(key => {
      expect(action.userInfo[key]).toEqual(userInfo[key]);
    })
  });
});