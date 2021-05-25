import * as THREE from "three";

import {
  AbstractSceneEntity,
  ISceneEntity,
} from "../abstract-scene/abstract-scene-entity";

export class DirectionalLight
  extends AbstractSceneEntity
  implements ISceneEntity
{
  async init() {
    return new Promise<THREE.Group>((resolve) => {
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(10, 10, 10);
      light.lookAt(0, 0, 0);
      light.castShadow = true;
      this._sceneEntityGroup.add(light);
      const helper = new THREE.DirectionalLightHelper(light, 5);
      helper.userData.isHelper = true;
      this._sceneEntityGroup.add(light);
      this._sceneEntityGroup.add(helper);
      resolve(this._sceneEntityGroup);
    });
  }

  update = (time: number) => {
    this._sceneEntityGroup.position.x += time * 0;
  };
}
