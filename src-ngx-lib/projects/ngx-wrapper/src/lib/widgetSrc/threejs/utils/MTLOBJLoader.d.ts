import * as THREE from 'three';
/**
 * Wrapper around OBJLoader and MTLLoader letting you just specify
 * urls to the obj and mtl files, a scaling factor, and a callback to use
 * on the resulting threeJs object
 * Patterns taken from: https://threejs.org/examples/webgl_loader_obj_mtl.html
 */
export declare function MTLOBJLoader(mtlUrl: string, objUrl: string, cbOnReady: (obj: THREE.Object3D) => void, targetRadius?: number, isCenteredOnBoundingBox?: boolean, isShadowShown?: boolean): void;
