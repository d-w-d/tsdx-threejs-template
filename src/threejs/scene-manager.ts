import * as THREE from "three";

import {
  AbstractSceneManager,
  ISceneManager,
} from "./abstract-scene/abstract-scene-manager";
import { DemoObjLoader } from "./scene-entities/demo-obj-loader";
import { MiscHelpers } from "./scene-entities/misc-helpers";
import { SimpleLight } from "./scene-entities/simple-light";
import { Square } from "./scene-entities/square";
import { DirectionalLight } from "./scene-entities/directional-light";

/**
 * Implement a scene for this app with 'real' entities
 */
export class SceneManager
  extends AbstractSceneManager
  implements ISceneManager
{
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>

  private isRotating = false;

  constructor(containerId: string) {
    // -------------------------->>>

    super(containerId);

    this.addSceneEntities([
      new DemoObjLoader(),
      new MiscHelpers(),
      new SimpleLight(),
      new Square(1),
      new DirectionalLight(),
    ]);

    // Logic to run after scene initialization
    this.preInitHook = () => {};

    // Logic to run after scene initialization
    this.postInitHook = () => {
      // this._orbitControls!.enabled = false;
    };

    // Set initial camera position
    this._initialViewingVector = new THREE.Vector3(6, 15, 9);
  }

  updateCamera = (time: number) => {
    // -------------------------->>>

    if (!this.isRotating) return;

    // Logic for random rotation
    // This illustrates some important concepts for controlling camera
    const f = 0.5;
    const c = 0;
    const x = 10 * Math.sin(time * f) + c;
    const y = 10 * Math.cos(time * f * 2 + Math.PI) + c;
    const z = 10 * Math.sin(time * f + Math.PI * 0.5) + c;
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

  toggleRotation = () => {
    this.isRotating = !this.isRotating;
    // Reset camera
    if (this.isRotating) {
      this._orbitControls!.enabled = false;
    } else {
      this._camera.position.copy(this._initialViewingVector);
      this._camera.up.copy(new THREE.Vector3(0, 0, 1));
      this._orbitControls!.enabled = true;
    }
  };
}
