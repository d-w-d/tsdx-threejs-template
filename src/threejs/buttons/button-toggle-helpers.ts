import { injectCommonButtonProperties } from './inject-common-button-properties';

/**
 *
 * @param container
 */
export const buttonToggleHelpers = (
  container: HTMLElement,
  onClickCB: () => void
): HTMLElement => {
  // --->>>

  // Warning
  if (!container) throw new Error('Canvas Container is Falsy!');

  // Set properties unique to this button
  const button = document.createElement('div');
  button.innerText = 'Toggle Helpers';
  button.style.setProperty('top', '10px');
  button.style.setProperty('right', '10px');

  // Set properties common to all buttons; append to container when ready
  injectCommonButtonProperties(button, container, onClickCB);

  // Finish him
  return button;
};
