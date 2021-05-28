import * as THREE from 'three';

import { AbstractSceneEntity } from '../abstract-scene/abstract-scene-entity';
import { ISceneEntity } from '../abstract-scene/models';

export class DirectionalLight extends AbstractSceneEntity
  implements ISceneEntity {
  // ~~~>>>

  _light?: THREE.DirectionalLight;

  async init() {
    return new Promise<THREE.Group>(resolve => {
      // Create light
      this._light = new THREE.DirectionalLight(0xffffff, 1);
      this._light.position.set(10, 10, 10);
      this._light.lookAt(0, 0, 0);
      this._light.castShadow = true;
      this._sceneEntityGroup.add(this._light);

      // Add light helper
      const helper = new THREE.DirectionalLightHelper(
        this._light.clone(),
        5,
        'cyan'
      );
      helper.userData.isHelper = true;
      helper.visible = true;
      helper.userData.name = 'my-directional-light-helper';

      this._sceneEntityGroup.add(this._light);
      this._sceneEntityGroup.add(helper);
      // console.log('=============', this._light, this._light.clone(), helper);
      resolve(this._sceneEntityGroup);
    });
  }

  update = (_time: number) => {
    // this._sceneEntityGroup.position.x += time * 0;
    // this._sceneEntityGroup.rotateZ(_time * 0 + 0.001);
  };

  setIsOn(isOn: boolean) {
    this._light!.visible = isOn;
  }
}
