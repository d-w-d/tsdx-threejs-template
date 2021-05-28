import * as THREE from 'three';

export function angleBetweenVector3s(
  v1: THREE.Vector3,
  v2: THREE.Vector3
): number {
  const dp3: number = dotProduct3(v1, v2);
  const cosTheta = (dp3 / lengthVector3(v1)) * lengthVector3(v2);
  const tryTheta = Math.acos(cosTheta);
  const theta = !!tryTheta ? tryTheta : 0;
  return theta;
}

function lengthVector3(v: THREE.Vector3): number {
  return Math.pow(v.x * v.x + v.y * v.y + v.z + v.z, 0.5);
}

function dotProduct3(v1: THREE.Vector3, v2: THREE.Vector3): number {
  return Math.abs(v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
}

export function distanceBetweenVector3s(
  v1: THREE.Vector3,
  v2: THREE.Vector3
): number {
  const connectVector = new THREE.Vector3(
    v1.x - v2.x,
    v1.y - v2.y,
    v1.z - v2.z
  );
  return lengthVector3(connectVector);
}
