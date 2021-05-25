import * as THREE from 'three';
/**
 * Function to scale an object so that the child with the largest bounding-sphere radius
 * will end up with a bounding sphere radius equal to the supplied targetRadius
 */
export declare function resizeThreeJsObject(object: THREE.Object3D, targetRadius: number): void;
