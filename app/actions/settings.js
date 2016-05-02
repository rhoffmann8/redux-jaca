export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS';
export const APPLY_SETTINGS = 'APPLY_SETTINGS';

export function toggleSettings() {
  return {
    type: TOGGLE_SETTINGS
  };
}

export function applySettings(settings) {
  return {
    type: APPLY_SETTINGS,
    settings
  };
}