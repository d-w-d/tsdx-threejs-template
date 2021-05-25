import * as THREE from "three";
import { AbstractSceneEntity, ISceneEntity } from "../abstract-scene/abstract-scene-entity";
export declare class Square extends AbstractSceneEntity implements ISceneEntity {
    private sideLength;
    constructor(sideLength: number);
    init(): Promise<THREE.Group>;
    update: (time: number) => void;
}
