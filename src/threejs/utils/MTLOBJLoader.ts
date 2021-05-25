import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { resizeThreeJsObject } from './resizeThreeJsObject';
import { enshadowChildren } from './enshadowChildren';
import { centerOnBoundingBox } from './centerOnBoundingBox';

/**
 * Wrapper around OBJLoader and MTLLoader letting me just specify
 * urls to the obj and mtl files, a scaling factor, and a callback to use
 * on the resulting threeJs object
 */
export function MTLOBJLoader(
  mtlUrl: string,
  objUrl: string,
  cbOnReady: (obj: THREE.Object3D) => void,
  targetRadius?: number,
  isCenteredOnBoundingBox?: boolean,
  isShadowShown?: boolean
): void {
  new MTLLoader().load(mtlUrl, function(_mtlParseResult) {
    // --->>>

    const objLoader = new OBJLoader();
    objLoader.load(
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
