import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';

import { resizeThreeJsObject } from './resizeThreeJsObject';
import { enshadowChildren } from './enshadowChildren';
import { centerOnBoundingBox } from './centerOnBoundingBox';

/**
 * Wrapper around OBJLoader and MTLLoader letting you just specify
 * urls to the obj and mtl files, a scaling factor, and a callback to use
 * on the resulting threeJs object
 * Patterns taken from: https://threejs.org/examples/webgl_loader_obj_mtl.html
 */
export function MTLOBJLoader(
  mtlUrl: string,
  objUrl: string,
  cbOnReady: (obj: THREE.Object3D) => void,
  targetRadius?: number,
  isCenteredOnBoundingBox?: boolean,
  isShadowShown?: boolean
): void {
  // --->>>

  const manager = new THREE.LoadingManager();
  manager.addHandler(/\.dds$/i, new DDSLoader());
  new MTLLoader(manager).load(mtlUrl, function(materials) {
    // --->>>

    materials.preload();
    new OBJLoader().setMaterials(materials).load(
      objUrl,
      object => {
        if (!!targetRadius) resizeThreeJsObject(object, targetRadius);
        if (!!isCenteredOnBoundingBox) centerOnBoundingBox(object);
        if (!!isShadowShown) enshadowChildren(object);
        cbOnReady(object); // Signal object readiness
      },
      xhr => {
        // Called when loading is in progress
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      error => {
        console.log('Loading error occurred:', error.message);
      }
    );
  });
}
