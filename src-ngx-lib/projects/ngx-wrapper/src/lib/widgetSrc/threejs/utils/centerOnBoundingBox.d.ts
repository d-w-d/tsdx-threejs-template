import * as THREE from 'three';
/**
 * Function to center object on its bounding box
 *
 * An object created in blender may not have its origin at the object's
 * physical center, and this can be annoying when, say, you want to rotate
 * that object. This function will shift the object relative to its parent
 * coordinate system so that its center is at the parent's origin; that means
 * you can then e.g. rotate the parent to get a realistic/useful rotation effect
 * on this object
 */
export declare function centerOnBoundingBox(object: THREE.Object3D): void;
