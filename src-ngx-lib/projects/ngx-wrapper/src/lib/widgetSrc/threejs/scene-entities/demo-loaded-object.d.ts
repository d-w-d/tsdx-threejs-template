import * as THREE from 'three';
import { AbstractSceneEntity } from '../abstract-scene/abstract-scene-entity';
import { ISceneEntity } from '../abstract-scene/models';
export declare class DemoLoadedObject extends AbstractSceneEntity implements ISceneEntity {
    _loadedObject?: THREE.Object3D;
    _isInternalLightsOn: boolean;
    init(): Promise<THREE.Group>;
    update: (time: number) => void;
    toggleInternalLights: () => void;
}
