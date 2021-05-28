import * as THREE from 'three';
import { AbstractSceneEntity } from '../abstract-scene/abstract-scene-entity';
import { ISceneEntity } from '../abstract-scene/models';
export declare class SimpleLight extends AbstractSceneEntity implements ISceneEntity {
    private _light?;
    private _defaultIntensity;
    init(): Promise<THREE.Group>;
    update: (time: number) => void;
    setPower: (intensity?: number | undefined) => void;
    setIsOn(isOn: boolean): void;
}
