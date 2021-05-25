/**
 * Simple function to ensure all children receive and cast shadows
 */
export function enshadowChildren(object: THREE.Object3D) {
  object.traverse(child => {
    if (child.type === 'Mesh') {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}
