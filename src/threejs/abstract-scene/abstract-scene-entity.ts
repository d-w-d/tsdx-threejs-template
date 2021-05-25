import * as THREE from 'three';

/**
 * Base class that any entity must extend in order that its threeJs group
 * might get added to the threeJs scene owned by the manager
 */
export abstract class AbstractSceneEntity {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>

  protected _sceneEntityGroup: THREE.Group = new THREE.Group();
  public getSceneEntityGroup = () => this._sceneEntityGroup;
}

/**
 * The interface that any scene entity must implement in order that it can get added
 * to the scene
 *
 * NOTES:
 * - init: method to declare three geometries, add them to entity's group, and
 * - update: function of time tracked by the SceneManager that determines the state
 * of the threeJs meshes, lights, etc. within the scene entity's THREE.Group
 */
export interface ISceneEntity extends AbstractSceneEntity {
  init: () => Promise<THREE.Group>;
  update: (time: number) => void;
}
