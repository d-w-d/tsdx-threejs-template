import { AbstractSceneManager, ISceneManager } from "./abstract-scene/abstract-scene-manager";
/**
 * Implement a scene for this app with 'real' entities
 */
export declare class SceneManager extends AbstractSceneManager implements ISceneManager {
    private isRotating;
    constructor(containerId: string);
    updateCamera: (time: number) => void;
    toggleRotation: () => void;
}
