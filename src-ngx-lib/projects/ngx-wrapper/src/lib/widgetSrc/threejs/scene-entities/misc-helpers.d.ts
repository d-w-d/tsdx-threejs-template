import * as THREE from 'three';
import { AbstractSceneEntity } from '../abstract-scene/abstract-scene-entity';
import { ISceneEntity } from '../abstract-scene/models';
export declare class MiscHelpers extends AbstractSceneEntity implements ISceneEntity {
    init(): Promise<THREE.Group>;
    update: (time: number) => void;
}
