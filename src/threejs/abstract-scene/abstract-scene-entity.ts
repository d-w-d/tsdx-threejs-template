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
