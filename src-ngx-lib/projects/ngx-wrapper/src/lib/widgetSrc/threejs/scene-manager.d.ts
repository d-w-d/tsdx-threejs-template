import { AbstractSceneManager } from './abstract-scene/abstract-scene-manager';
import { ISceneManager } from './abstract-scene/models';
/**
 * Implement a scene for this app with 'real' entities
 */
export declare class SceneManager extends AbstractSceneManager implements ISceneManager {
    private isRotating;
    private demoInterval;
    private toggleLightsButton;
    private toggleHelpersButton;
    private _directionalLight?;
    private _isDirectionalLightOn;
    private _demoLoadedObject;
    constructor(containerId: string);
    toggleLights: () => void;
    updateCamera: (time: number) => void;
    toggleRotation: () => void;
}
