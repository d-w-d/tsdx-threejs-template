import * as THREE from 'three';
import { FBXLoader as Loader } from 'three/examples/jsm/loaders/FBXLoader';
import { centerOnBoundingBox } from './centerOnBoundingBox';
import { enshadowChildren } from './enshadowChildren';
import { resizeThreeJsObject } from './resizeThreeJsObject';

export function FBXLoader(
  fbxUrl: string,
  cbOnReady: (obj: THREE.Object3D) => void,
  targetRadius?: number,
  isCenteredOnBoundingBox?: boolean,
  isShadowShown?: boolean
) {
  // ----------------->>>

  new Loader().load(
    fbxUrl,
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
}
