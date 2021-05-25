/**
 * A simple ascii-art wrapper for error messaging in order to convey
 * just how tragic your errors are
 */
export function asciiError(msg: string) {
  console.clear();
  return `

   ______________________________    . \\  | / .
  /                            / \\     \\ \\ / /
 |                            | ==========  - -
  \\____________________________\\_/     / / \\ \\
  ______________________________      \\  | / | \\
 /                            / \\     \\ \\ / /.   .
|                            | ==========  - -
 \\____________________________\\_/     / / \\ \\    /
   ______________________________   / |\\  | /  .
  /                            / \\     \\ \\ / /
 |                            | ==========  -  - -
  \\____________________________\\_/     / / \\ \\
                                     .  / | \\  .

  Are you trying to wreak havoc!?!

  ${msg}

  Idiot.

  `;
}
