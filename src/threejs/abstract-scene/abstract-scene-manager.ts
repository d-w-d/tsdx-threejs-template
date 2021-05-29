import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { asciiError } from '../utils/asciiError';
import { ISceneEntity } from './models';

const initialCameraParams = {
  aspectRatio: 2,
  fieldOfView: 60,
  nearPlane: 0.1, // Wow! Beware: changing this causes/fixes flickering/artifact-ing !!!
  farPlane: 13500,
};

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
export abstract class AbstractSceneManager {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>

  protected _scene: THREE.Scene = new THREE.Scene();
  protected _renderer?: THREE.WebGLRenderer;
  protected _canvas: HTMLCanvasElement = document.createElement('canvas');
  protected _requestAnimationFrameId: undefined | number;
  protected _clock = new THREE.Clock(false);
  protected _initialViewingVector: THREE.Vector3 = new THREE.Vector3(
    10,
    10,
    10
  );
  protected _isSceneReady = false;
  protected _isRendering = false;
  protected _isHelpersShown = false;
  protected _isInit = false;
  protected _container: HTMLElement | null = null;
  protected _fps = 60;
  protected _camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    initialCameraParams.fieldOfView,
    initialCameraParams.aspectRatio,
    initialCameraParams.nearPlane,
    initialCameraParams.farPlane
  );
  protected _controls?: OrbitControls | TrackballControls;
  protected _sceneEntities: ISceneEntity[] = [];
  protected _preInitHook: () => void = () => {};
  protected _postInitHook: () => void = () => {};
  protected _destroyHook: () => void = () => {};
  _updateCamera: (time: number) => void = () => {};

  constructor(
    protected _containerId: string,
    protected _isWorldFlippable = false
  ) {}

  public async init() {
    // ------>>>

    // Init only once
    if (!!this._isInit) return;
    this._isInit = true;

    // Enable superclass constructor to adjust settings prior to initialization sequence
    this._preInitHook();

    // Get container and add fitting canvas to it
    this._container = document.getElementById(this._containerId);
    if (!this._container) {
      throw new Error('No container found with id: ' + this._containerId);
    }
    this._canvas.style.width = '100%';
    this._canvas.style.height = '100%';
    this._container.append(this._canvas);
    this._container.style.setProperty('position', 'relative');

    // React to resize events on window
    // this._updateCameraAspect = this.updateCameraAspect.bind(this);
    window.addEventListener('resize', this._updateCameraAspect);

    // Build Renderer
    const DPR: number = window.devicePixelRatio ? window.devicePixelRatio : 1;
    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true,
      alpha: true,
    });
    this._renderer.setPixelRatio(DPR);
    this._renderer.sortObjects = false; // This prevents pesky rendering-disruption effect
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.outputEncoding = THREE.GammaEncoding;

    // Init camera position and orientation
    this._camera.position.copy(this._initialViewingVector);
    this._camera.up = new THREE.Vector3(0, 0, 1); // Vector defining up direction of camera
    this._camera.lookAt(0, 0, 0);

    // Define and configure orbitControls
    // Do NOT attempt to create controls until
    // dependencies are set, or you'll get erratic behavior.
    // OrbitControls => Can't flip upside down
    // TrackballControls => Can flip upside down
    this._controls = !this._isWorldFlippable
      ? new OrbitControls(this._camera, this._renderer.domElement)
      : new TrackballControls(this._camera, this._renderer.domElement);
    if (this._controls instanceof OrbitControls) {
      this._controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      this._controls.dampingFactor = 0.25;
    } else if (this._controls instanceof TrackballControls) {
      this._controls.rotateSpeed = 10.0;
      this._controls.zoomSpeed = 1.2;
      this._controls.panSpeed = 0.8;
      this._controls.keys = ['65', '83', '68']; // a s d
    } else {
      throw Error('Poor Logic');
    }

    // Initiate Scene Entities
    if (!this._sceneEntities.length)
      throw new Error(asciiError('You have no scene entities!'));
    await Promise.all(
      this._sceneEntities.map(async sceneEntity => {
        const initiatedSceneEntityGroup: THREE.Group = await sceneEntity.init();
        if (
          !initiatedSceneEntityGroup ||
          !initiatedSceneEntityGroup.children.length
        )
          throw new Error(
            asciiError(`
            -----------------------------------------------------------------------------
            The scene entity "${sceneEntity.constructor.name}" has empty sceneEntityGroup
            after initialization!!!
            -----------------------------------------------------------------------------
            `)
          );
        this._scene.add(initiatedSceneEntityGroup);
        return;
      })
    );

    // Run updater methods
    this.setHelpersVisibility();
    this._updateCameraAspect();

    // Begin Animation
    this._startRendering();

    // Enable superclass constructor to adjust settings after to initialization sequence
    this._postInitHook();
  }

  protected registerSceneEntities = (sceneEntities: ISceneEntity[]) => {
    sceneEntities.forEach(el => this._sceneEntities.push(el));
  };

  /**
   * This method lets you show/hide the objects within in your scene
   * designated as 'helpers'. It relies on the practice of setting the property `userData.isHelper = true`
   * on any object you want to be classified as a helper
   */
  public setHelpersVisibility = () => {
    this._scene.traverse(child => {
      return child.userData.isHelper && (child.visible = this._isHelpersShown);
    });
  };

  public toggleHelpersVisibility = () => {
    this._isHelpersShown = !this._isHelpersShown;
    this.setHelpersVisibility();
  };

  public setFramesPerSecond(newFps: number) {
    if (newFps <= 0 || newFps > 100) return;
    this._fps = newFps;
  }

  private _updateCameraAspect = () => {
    // Not sure where/how, but canvas' style width/height
    // gets altered and needs to be reset to 100%
    this._canvas.style.width = '100%';
    this._canvas.style.height = '100%';
    const width = this._canvas.offsetWidth || 1;
    const height = this._canvas.offsetHeight || 1;
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this._renderer!.setSize(width, height);
  };

  public destroy: () => void = () => {
    window.removeEventListener('resize', this._updateCameraAspect);
    this._stopRendering();
    this._destroyHook();
  };

  private _update() {
    // Get time
    const elapsedTime = this._clock.getElapsedTime();

    // Loop through scene entities and trigger their update methods
    this._sceneEntities.forEach(el => el.update(elapsedTime));

    // Update camera
    this._updateCamera(elapsedTime);

    // Needed for TrackballControls
    this._controls?.update();

    // Finish loop
    if (!this._camera || !this._renderer) throw new Error('Poor Logic');
    if (!!this._requestAnimationFrameId) {
      this._renderer.render(this._scene, this._camera);
    }
  }

  private _render = () => {
    if (!this._isRendering) return;
    setTimeout(() => {
      this._requestAnimationFrameId = requestAnimationFrame(this._render);
      this._update();
    }, 1000 / this._fps);
  };

  private _startRendering = () => {
    console.log('Starting animation...');
    this._isRendering = true;
    this._clock.start();
    this._render();
  };

  private _stopRendering = () => {
    console.log('Stopping animation...');
    this._isRendering = false;
    this._clock.stop();
  };
}
