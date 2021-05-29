import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { ISceneEntity } from './models';
/**
 * This abstract class is to be inherited by the SceneManager instance.
 * The idea is to place all the usual/boilerplate code for setting up
 * a threeJs scene and running it here, so that the only place you
 * need to implement the specifics of your scene is in your
 * SceneManager instance.
 *
 * By convention, properties/methods that are not intended/expected to be used
 * outside this class are prefixed with '_'
 *
 */
export declare abstract class AbstractSceneManager {
    protected _containerId: string;
    protected _isWorldFlippable: boolean;
    protected _scene: THREE.Scene;
    protected _renderer?: THREE.WebGLRenderer;
    protected _canvas: HTMLCanvasElement;
    protected _requestAnimationFrameId: undefined | number;
    protected _clock: THREE.Clock;
    protected _initialViewingVector: THREE.Vector3;
    protected _isSceneReady: boolean;
    protected _isRendering: boolean;
    protected _isHelpersShown: boolean;
    protected _isInit: boolean;
    protected _container: HTMLElement | null;
    protected _fps: number;
    protected _camera: THREE.PerspectiveCamera;
    protected _controls?: OrbitControls | TrackballControls;
    protected _sceneEntities: ISceneEntity[];
    protected _preInitHook: () => void;
    protected _postInitHook: () => void;
    protected _destroyHook: () => void;
    _updateCamera: (time: number) => void;
    constructor(_containerId: string, _isWorldFlippable?: boolean);
    init(): Promise<void>;
    protected registerSceneEntities: (sceneEntities: ISceneEntity[]) => void;
    /**
     * This method lets you show/hide the objects within in your scene
     * designated as 'helpers'. It relies on the practice of setting the property `userData.isHelper = true`
     * on any object you want to be classified as a helper
     */
    setHelpersVisibility: () => void;
    toggleHelpersVisibility: () => void;
    setFramesPerSecond(newFps: number): void;
    private _updateCameraAspect;
    destroy: () => void;
    private _update;
    private _render;
    private _startRendering;
    private _stopRendering;
}
