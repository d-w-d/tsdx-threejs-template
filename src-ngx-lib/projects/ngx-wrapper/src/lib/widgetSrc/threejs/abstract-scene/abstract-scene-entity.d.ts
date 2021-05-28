import * as THREE from 'three';
/**
 * Base class that any entity must extend in order that its threeJs group
 * might get added to the threeJs scene owned by the manager
 */
export declare abstract class AbstractSceneEntity {
    protected _sceneEntityGroup: THREE.Group;
    getSceneEntityGroup: () => THREE.Group;
}
