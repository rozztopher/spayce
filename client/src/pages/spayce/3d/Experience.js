import * as THREE from "three";
// import { WebXRController } from "three"

import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { Sizes } from "./Sizes";
import { Player } from "./Player";
import { Loaders } from "./Loaders";
import { Raycaster } from "./Raycaster";
import { Shader } from "./Shader";
import { Mirror } from "./Mirror";
import { Environment } from "./Environment";
import { PostProcessing } from "./PostProcessing";
import { Pane } from "tweakpane";
import { CollisionDetector } from "./CollisionDetector";
import { FiniteStateMachine } from "./FiniteStateMachine";
import { MobileControls } from "./MobileControls";
import { DeviceStateManager } from "./DeviceStateManager";
import { Lights } from "./Lights";
import { Room } from "./Room";

export let pane,
  canvas,
  scene,
  lights,
  loaders,
  deviceStateManager,
  environment,
  sizes,
  camera,
  renderer,
  raycaster,
  mirror,
  player,
  finiteStateMachine,
  collisionDetector,
  room,
  postProcessing;

window.addEventListener("SpayceLoadEvent", (e) => {
  pane = new Pane();
  canvas = document.querySelector("canvas.webgl");
  scene = new THREE.Scene();
  lights = new Lights();
  loaders = new Loaders();
  deviceStateManager = new DeviceStateManager();
  // export const shader = new Shader()
  environment = new Environment();
  scene.background = environment.envMap;
  sizes = new Sizes();
  camera = new Camera();
  renderer = new Renderer();
  deviceStateManager.checkForVR();
  raycaster = new Raycaster();
  mirror = new Mirror();
  player = new Player();
  room = new Room(e.detail);
  finiteStateMachine = new FiniteStateMachine();
  collisionDetector = new CollisionDetector();
  postProcessing = new PostProcessing();

  deviceStateManager.executeForDevice();

  //Animate
  const clock = new THREE.Clock();
  let time = Date.now();

  renderer.renderer.setAnimationLoop(() => {
    const elapsedTime = clock.getElapsedTime();

    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    // shader.shader.material.uniforms.uTime.value = elapsedTime

    if (finiteStateMachine.mixer)
      finiteStateMachine.mixer.update(deltaTime * 0.001);

    raycaster.getFirstPersonIntersections();
    raycaster.getLeftControllerIntersections(player.controller1);
    raycaster.getRightControllerIntersections(player.controller2);
    if (player.character && collisionDetector.detectionMesh)
      collisionDetector.updateRaycaster();

    if (player.character) {
      player.updatePlayer(deltaTime * 0.0005);
    }

    if (player.dolly) {
      player.updateDolly();
    }

    camera.mobileControls.updateFiniteStateMachine();

    //Render scene
    renderer.renderer.render(scene, camera.camera);
    // postProcessing.effectComposer.render()
  });
});
