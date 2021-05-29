import {
  buttonBackgroundColor,
  buttonClickedBackgroundColor,
  buttonFontFamily,
  buttonTextColor,
  buttonPadding,
  buttonCursorType,
  buttonCssUrl,
  buttonFadeInSpecs,
} from '../utils/constants';
import { addGlobalStyles } from './add-global-styles';

/**
 * Function to mutate buttons by injecting them with properties
 * common to all html buttons; append to container when ready
 */
export const injectCommonButtonProperties = (
  button: HTMLElement,
  container: HTMLElement,
  onClickCB: () => void
) => {
  // --->>>

  // Add to global styles
  addGlobalStyles();

  // Start loading the remote fonts style sheet; mutate button on completion
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.onload = () => {
    // console.log('Loaded css url for fonts');
    mutateButton();
  };
  link.onerror = () => {
    console.log('Failed to load css url for fonts; continuing anyway...');
    mutateButton();
  };
  link.href = buttonCssUrl;
  document.head.append(link);

  // Callback to mutate button
  function mutateButton() {
    // Positioning
    button.style.position = 'absolute';
    button.style.setProperty('padding', buttonPadding);

    // Colors
    button.style.setProperty('color', buttonTextColor);
    button.style.setProperty('background-color', buttonBackgroundColor);

    // Font stuff
    button.style.setProperty('font-family', buttonFontFamily);
    button.style.setProperty('font-size', '20px');

    // Setup fade-in effect
    button.style.setProperty(
      'animation',
      `global-fade-in ${buttonFadeInSpecs}`
    );

    // Cursor behavior
    // Prevent text in button from being selectable
    // See here: https://stackoverflow.com/a/4407335/8620332
    button.style.setProperty('cursor', buttonCursorType);
    button.style.setProperty('-webkit-touch-callout', 'none');
    button.style.setProperty('-webkit-user-select', 'none');
    button.style.setProperty('-khtml-user-select', 'none');
    button.style.setProperty('-moz-user-select', 'none');
    button.style.setProperty('-ms-user-select', 'none');
    button.style.setProperty('user-select', 'none');

    // Properties related to click effect
    button.style.setProperty('transition', 'background-color 50ms ease-in-out');
    button.addEventListener('click', function() {
      button.style.setProperty(
        'background-color',
        buttonClickedBackgroundColor
      );
      setTimeout(() => {
        button.style.setProperty('background-color', buttonBackgroundColor);
        onClickCB();
      }, 200);
    });

    // Make visible
    container.append(button);
  }
};
