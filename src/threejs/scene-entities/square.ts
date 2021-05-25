import * as THREE from "three";

import {
  AbstractSceneEntity,
  ISceneEntity,
} from "../abstract-scene/abstract-scene-entity";

export class Square extends AbstractSceneEntity implements ISceneEntity {
  //

  constructor(private sideLength: number) {
    super();
  }

  async init() {
    return new Promise<THREE.Group>((resolve) => {
      this._sceneEntityGroup.add(
        new THREE.Mesh(
          new THREE.BoxGeometry(
            this.sideLength,
            this.sideLength,
            this.sideLength
          ),
          new THREE.MeshPhongMaterial()
        )
      );
      this._sceneEntityGroup.position.z = -10;
      resolve(this._sceneEntityGroup);
    });
  }

  update = (time: number) => {
    this._sceneEntityGroup.position.x += time * 0;
  };
}
