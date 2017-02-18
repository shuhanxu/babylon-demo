/// <reference path="../lib/babylon.2.4.d.ts"/>
class Game {

  public static Instance: Game;
  private _canvas: HTMLCanvasElement;
  getCanvas(): HTMLCanvasElement {
    return this._canvas;
  }
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  getScene(): BABYLON.Scene {
    return this._scene;
  }
  private _camera: BABYLON.ArcRotateCamera;
  getCamera(): BABYLON.ArcRotateCamera {
    return this._camera;
  }
  private _light: BABYLON.Light;

  constructor(canvasElement: string) {
    Game.Instance = this;
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene(): void {
    this._scene = new BABYLON.Scene(this._engine);

    this._camera = new BABYLON.ArcRotateCamera("camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this._scene);
    this._camera.setTarget(BABYLON.Vector3.Zero());
    this._camera.attachControl(this._canvas, false);

    this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
  }

  animate(): void {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    window.addEventListener("resize", () => {
      this._engine.resize();
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let game : Game = new Game("renderCanvas");
  game.createScene();
  game.animate();
  let editorPreview : EditorPreview = new EditorPreview("renderCanvasEditorPreview");
  editorPreview.createScene();
  editorPreview.animate();
  Materials.Initialize();
  Meshes.Initialize();
  LocalLocks.Initialize();
  Editor.setPreview();

  new GameObject(new BABYLON.Vector3(0, -1, 0), 0, "ground", "green", false);
});
