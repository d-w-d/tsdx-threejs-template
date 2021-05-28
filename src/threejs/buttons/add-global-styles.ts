/**
 *
 */

let isGlobalStylesSet = false;

export const addGlobalStyles = () => {
  // --->>>

  // Only set once
  if (isGlobalStylesSet) return;

  //
  const globalStyle = document.createElement('style');
  globalStyle.innerHTML = `
    @keyframes global-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `;

  document.head.append(globalStyle);

  //
};
