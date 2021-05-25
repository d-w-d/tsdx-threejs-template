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
export function centerOnBoundingBox(object: THREE.Object3D) {
  // ----------------------------------------------------->>>

  // Get center of boundingBox
  const boundingBox = new THREE.Box3().setFromObject(object);
  const [x2, y2, z2] = boundingBox.getCenter(new THREE.Vector3()).toArray();

  // Move object to where center was
  const [x1, y1, z1] = object.position.clone().toArray();
  object.position.set(x1 - x2, y1 - y2, z1 - z2);
}
