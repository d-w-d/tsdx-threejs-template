import * as THREE from 'three';
/**
 * Wrapper around OBJLoader and MTLLoader letting me just specify
 * urls to the obj and mtl files, a scaling factor, and a callback to use
 * on the resulting threeJs object
 */
export declare function MTLOBJLoader(mtlUrl: string, objUrl: string, cbOnReady: (obj: THREE.Object3D) => void, targetRadius?: number, isCenteredOnBoundingBox?: boolean, isShadowShown?: boolean): void;
