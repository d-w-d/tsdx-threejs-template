import { SceneManager } from './threejs/scene-manager';

let threejsScene;

/**
 * Create threeJs canvas and inject into container
 */
export function init(containerId = 'threejs-canvas-container') {
  // --->>>

  // Get div to contain canvas
  const canvasContainer = document.getElementById(containerId);
  if (!canvasContainer) throw new Error("Can't find div of id " + containerId);

  threejsScene = new SceneManager(containerId);
  threejsScene.init();
}

/**
 * React-component wrapper
 */
export { TsdxThreejsTemplate } from './react-component';
