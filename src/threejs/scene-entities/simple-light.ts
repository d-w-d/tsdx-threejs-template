import * as THREE from "three";

import {
  AbstractSceneEntity,
  ISceneEntity,
} from "../abstract-scene/abstract-scene-entity";

export class SimpleLight extends AbstractSceneEntity implements ISceneEntity {
  async init() {
    return new Promise<THREE.Group>((resolve) => {
      //

      console.log(">>>>", THREE);

      const light = new THREE.AmbientLight(0x333333, 0.3);
      light.userData.isAmbientLight = true;
      this._sceneEntityGroup.add(light);
      resolve(this._sceneEntityGroup);
    });
  }

  update = (time: number) => {
    this._sceneEntityGroup.position.x += time * 0;
  };
}
