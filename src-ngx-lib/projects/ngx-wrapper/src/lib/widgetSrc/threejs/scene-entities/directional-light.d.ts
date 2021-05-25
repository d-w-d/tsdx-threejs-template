import * as THREE from "three";
import { AbstractSceneEntity, ISceneEntity } from "../abstract-scene/abstract-scene-entity";
export declare class DirectionalLight extends AbstractSceneEntity implements ISceneEntity {
    init(): Promise<THREE.Group>;
    update: (time: number) => void;
}
