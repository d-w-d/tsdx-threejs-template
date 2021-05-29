import * as THREE from 'three';

import { AbstractSceneManager } from './abstract-scene/abstract-scene-manager';
import { DemoLoadedObject } from './scene-entities/demo-loaded-object';
import { MiscHelpers } from './scene-entities/misc-helpers';
import { SimpleLight } from './scene-entities/simple-light';
import { Square } from './scene-entities/square';
import { DirectionalLight } from './scene-entities/directional-light';
import { ISceneManager } from './abstract-scene/models';
import { buttonToggleLights } from './buttons/button-toggle-lights';
import { buttonToggleHelpers } from './buttons/button-toggle-helpers';
import { buttonToggleRotation } from './buttons/button-toggle-rotation';

/**
 * Implement a scene for this app with 'real' scene entities
 */
export class SceneManager extends AbstractSceneManager
  implements ISceneManager {
  // ~~~>>>

  private isRotating = false;
  private demoInterval: NodeJS.Timeout;
  private toggleLightsButton: HTMLElement | undefined;
  private toggleRotationButton: HTMLElement | undefined;
  private toggleHelpersButton: HTMLElement | undefined;
  private _directionalLight?: DirectionalLight;
  private _isDirectionalLightOn = true;
  private _demoLoadedObject: DemoLoadedObject;

  constructor(containerId: string) {
    // --->>>

    super(containerId);

    // Create scene entities that need a handle
    this._directionalLight = new DirectionalLight();
    this._demoLoadedObject = new DemoLoadedObject();

    // Register all scene entities
    this.registerSceneEntities([
      this._directionalLight,
      this._demoLoadedObject,
      new SimpleLight(),
      new MiscHelpers(),
      new Square(1),
    ]);

    // Logic to run before scene initialization
    this._preInitHook = () => {};

    // Logic to run after scene initialization
    this._postInitHook = () => {
      // --->>>

      // Add buttons
      this.toggleLightsButton = buttonToggleLights(this._container!, () => {
        this._isDirectionalLightOn = !this._isDirectionalLightOn;
        this._directionalLight?.setIsOn(this._isDirectionalLightOn);
        this._demoLoadedObject.toggleInternalLights();
      });
      this.toggleLightsButton.hasChildNodes();

      this.toggleRotationButton = buttonToggleRotation(
        this._container!,
        this.toggleRotation
      );
      this.toggleRotationButton.hasChildNodes();

      this.toggleHelpersButton = buttonToggleHelpers(
        this._container!,
        this.toggleHelpersVisibility
      );
      this.toggleHelpersButton.hasChildNodes();
    };

    // Set initial camera position
    this._initialViewingVector = new THREE.Vector3(6, 15, 9);

    // Add listeners, subscriptions, etc.
    // !BE SURE TO ADD CORRESPONDING TERMINATORS TO this.destroyHook()!
    this.demoInterval = setInterval(() => {
      // console.log('>>> This is a demo listener that needs to be removed at end');
    }, 1000);

    this._destroyHook = () => {
      clearInterval(this.demoInterval);
    };
  }

  // Overwrite protected method to update camera
  _updateCamera = (time: number) => {
    // -------------------------->>>

    // return;
    if (!this.isRotating) return;

    // Logic for random rotation
    // This illustrates some important concepts for controlling camera
    const f = 0.5;
    const c = 1.111;
    const x = 10 * Math.sin(time * 1.1 * f) + c;
    const y = 10 * Math.cos(time * 1.1 * f * 2 + Math.PI) + c;
    const z = 10 * Math.sin(time * 1.1 * f + Math.PI * 0.5) + c;
    this._camera.position.x = x;
    this._camera.position.y = y;
    this._camera.position.z = z;

    // Logic to prevent camera reorientation at zenith
    // Allows world to go upside down; nauseating
    const presentLookVector = new THREE.Vector3(0, 0, -1);
    presentLookVector.applyQuaternion(this._camera.quaternion);
    this._camera.up.copy(presentLookVector);
    this._camera.lookAt(0, 0, 0);
  };

  public toggleRotation = () => {
    this.isRotating = !this.isRotating;
    // Reset camera
    if (this.isRotating) {
      this._controls!.enabled = false;
    } else {
      this._camera.position.copy(this._initialViewingVector);
      this._camera.up.copy(new THREE.Vector3(0, 0, 1));
      this._controls!.enabled = true;
    }
  };
}
