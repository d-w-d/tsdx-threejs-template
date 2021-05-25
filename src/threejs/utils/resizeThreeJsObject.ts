import * as THREE from 'three';

/**
 * Function to scale an object so that the child with the largest bounding-sphere radius
 * will end up with a bounding sphere radius equal to the supplied targetRadius
 */
export function resizeThreeJsObject(object: THREE.Object3D, targetRadius: number) {
  // --------------------------------------------------------------------------->>>

  let biggestSphereRadius: number = Math.pow(10, -10);
  object.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.geometry.computeBoundingSphere(); // Need to run this, else `child.geometry.boundingSphere.radius` will be undefined
      if (
        !!child.geometry &&
        !!child.geometry.boundingSphere &&
        child.geometry.boundingSphere.radius > biggestSphereRadius
      ) {
        biggestSphereRadius = child.geometry.boundingSphere.radius;
      }
    }
  });
  const s = targetRadius / biggestSphereRadius;
  object.scale.set(s, s, s);
}
