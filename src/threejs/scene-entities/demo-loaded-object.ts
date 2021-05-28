import * as THREE from 'three';

import { MTLOBJLoader } from '../utils/MTLOBJLoader';
import { FBXLoader } from '../utils/FBXLoader';
import { AbstractSceneEntity } from '../abstract-scene/abstract-scene-entity';
import { ISceneEntity } from '../abstract-scene/models';

export class DemoLoadedObject extends AbstractSceneEntity
  implements ISceneEntity {
  // ~~~>>>

  _loadedObject?: THREE.Object3D;
  _isInternalLightsOn = true;

  async init() {
    // --->>>

    return new Promise<THREE.Group>(resolve => {
      // --->>>

      const onObjectLoad = (loadedObject: THREE.Object3D) => {
        // --->>>

        // Set internal handle and register object
        this._loadedObject = loadedObject;
        this._sceneEntityGroup.add(loadedObject);

        // Rotations to correct object orientation
        this._sceneEntityGroup.rotateX(Math.PI / 2);

        // Create helper box around loaded object
        const helperBox = new THREE.BoxHelper(loadedObject, 0xffff00);
        helperBox.userData.isHelper = true;
        this._sceneEntityGroup.add(helperBox);

        // Add helper sphere to origin of group to illustrate it
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(1),
          new THREE.MeshPhongMaterial({ color: 'white', opacity: 0.1 })
        );
        sphere.userData.isHelper = true;
        this._sceneEntityGroup.add(sphere);

        // Add helperBox to all children of loadedObject
        loadedObject.traverse(child => {
          child.visible = true;
          if (false) {
            // Block to add box to every child; bit overwhelming
            const helperBox = new THREE.BoxHelper(child, 0xffff00);
            helperBox.userData.isHelper = true;
            this._sceneEntityGroup.add(helperBox);
          }

          // If child is a directional light, then give it a helper
          // See dev notes on why all this scaling logic is needed
          if (child.type === 'DirectionalLight') {
            let s = getObjectMeanScale(loadedObject);
            const directionalLightClone: THREE.DirectionalLight = child.clone() as any;
            const { x, y, z } = directionalLightClone.position;
            const newDirectionalLight = new THREE.DirectionalLight();
            newDirectionalLight.position.set(x * s, y * s, z * s);
            newDirectionalLight.intensity = directionalLightClone.intensity;
            const helper = new THREE.DirectionalLightHelper(
              newDirectionalLight as any,
              5,
              'pink'
            );
            helper.userData.isHelper = true;
            this._sceneEntityGroup.add(helper);
          }
        });

        resolve(this._sceneEntityGroup);
      };

      // Test loader-wrappers for MTL-OBJ and FBX files
      if (!true) {
        MTLOBJLoader(
          'https://raw.githubusercontent.com/d-w-d/tsdx-threejs-template/main/images/low-poly-well.mtl',
          'https://raw.githubusercontent.com/d-w-d/tsdx-threejs-template/main/images/low-poly-well.obj',
          // 'https://threejs.org/examples/models/obj/male02/male02_dds.mtl',
          // 'https://threejs.org/examples/models/obj/male02/male02.obj',
          onObjectLoad,
          5,
          true,
          true
        );
      } else {
        FBXLoader(
          'https://raw.githubusercontent.com/d-w-d/tsdx-threejs-template/main/images/low-poly-well.fbx',
          onObjectLoad,
          // 1,
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

  toggleInternalLights = () => {
    this._isInternalLightsOn = !this._isInternalLightsOn;
    this._loadedObject!.traverse(child => {
      // console.log('>>> ', child.type);
      if (child.type === 'DirectionalLight') {
        //
        child.visible = this._isInternalLightsOn;
      }
    });
  };
}

function getObjectMeanScale(object: THREE.Object3D) {
  return (object.scale.x + object.scale.x + object.scale.x) / 3;
}
