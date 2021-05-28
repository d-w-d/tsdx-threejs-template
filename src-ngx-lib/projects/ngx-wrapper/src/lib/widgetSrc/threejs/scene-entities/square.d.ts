import * as THREE from 'three';
import { AbstractSceneEntity } from '../abstract-scene/abstract-scene-entity';
import { ISceneEntity } from '../abstract-scene/models';
export declare class Square extends AbstractSceneEntity implements ISceneEntity {
    private sideLength;
    constructor(sideLength: number);
    init(): Promise<THREE.Group>;
    update: (time: number) => void;
}
