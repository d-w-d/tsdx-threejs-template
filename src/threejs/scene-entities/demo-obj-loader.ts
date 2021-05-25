import * as THREE from "three";

import { MTLOBJLoader } from "../utils/MTLOBJLoader";
import { FBXLoader } from "../utils/FBXLoader";
import {
  AbstractSceneEntity,
  ISceneEntity,
} from "../abstract-scene/abstract-scene-entity";

export class DemoObjLoader extends AbstractSceneEntity implements ISceneEntity {
  // ~~~>>>

  async init() {
    // --->>>

    return new Promise<THREE.Group>((resolve) => {
      // --->>>

      const onObjectLoad = (loadedThreeJsObject: THREE.Object3D) => {
        // --->>>

        // Add loaded object and rotate whole group
        this._sceneEntityGroup.add(loadedThreeJsObject);
        this._sceneEntityGroup.rotateX(Math.PI / 2);

        // Create helper box around loaded object
        const helperBox = new THREE.BoxHelper(loadedThreeJsObject, 0xffff00);
        helperBox.userData.isHelper = true;
        this._sceneEntityGroup.add(helperBox);

        // Add helper sphere to origin of group to illustrate it
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(1),
          new THREE.MeshPhongMaterial({ color: "white", opacity: 0.5 })
        );
        sphere.userData.isHelper = true;
        this._sceneEntityGroup.add(sphere);

        // Add helperBox to all children of loadedObject
        loadedThreeJsObject.traverse((child) => {
          child.visible = true;
          const helperBox0 = new THREE.BoxHelper(child, 0xffff00);
          helperBox0.userData.isHelper = true;
          this._sceneEntityGroup.add(helperBox0);
        });

        resolve(this._sceneEntityGroup);
      };

      // Test loader-wrappers for MTL-OBJ and FBX files
      if (!true) {
        MTLOBJLoader(
          "https://d-w-d.github.io/tsdx-threejs-react-boilerplate/images/low-poly-well.mtl",
          "https://d-w-d.github.io/tsdx-threejs-react-boilerplate/images/low-poly-well.obj",
          // 'https://d-w-d.github.io/tsdx-threejs-react-boilerplate/images/monster-confrontation.mtl',
          // 'https://d-w-d.github.io/tsdx-threejs-react-boilerplate/images/monster-confrontation.obj',
          onObjectLoad,
          10,
          true,
          true
        );
      } else {
        FBXLoader(
          "https://d-w-d.github.io/tsdx-threejs-react-boilerplate/images/low-poly-well.fbx",
          // 'https://d-w-d.github.io/tsdx-threejs-react-boilerplate/images/monster-confrontation.fbx',
          onObjectLoad,
          0.05,
          true,
          true
        );
      }
    });
  }

  update = (time: number) => {
    this._sceneEntityGroup.rotateY(time * 0 + 0.001);
  };
}
