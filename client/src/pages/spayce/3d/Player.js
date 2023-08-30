import * as THREE from "three";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory";
import {
  camera,
  collisionDetector,
  environment,
  finiteStateMachine,
  loaders,
  raycaster,
  renderer,
  scene,
  room,
} from "./Experience";

// const handsModelPath = "/assets/Hands.gltf"

export class Player {
  constructor() {
    this.currentIntersect = null;
    this.frameCounter = 0;
    this.prevPositionX = null;
    this.prevPositionZ = null;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.isRunning = false;

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.cameraWorldDirection = new THREE.Vector3();

    this.loadPlayer();
    this.setPlayer();
    this.setPlayerHands();
    // this.setDollyForVR()
    this.checkIntersections();
  }

  loadPlayer() {
    loaders.gltfLoader.load("/3D/Character-Animated-4.gltf", (gltf) => {
      this.characterParent = gltf;
      this.character = gltf.scene;

      this.character.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = environment.envMap;
          child.material.envMapIntensity = 2.5;
        }
        // Avoids the mesh from dissapearing
        // child.frustumCulled = false
      });

      // this.character.position.z = -2
      scene.add(this.character);
    });
  }

  setPlayer() {
    // Keydown
    document.addEventListener("keydown", (ev) => {
      // Make sure the keydown event only gets triggered once for the FiniteStateMachine
      if (!ev.repeat) {
        switch (ev.code) {
          case "ArrowUp":
          case "KeyW":
            this.moveForward = true;
            finiteStateMachine.changeAnimation(
              finiteStateMachine.idleAnimation,
              finiteStateMachine.walkForwardAnimation,
              0.2
            );
            break;

          case "ArrowLeft":
          case "KeyA":
            this.moveLeft = true;
            finiteStateMachine.changeAnimation(
              finiteStateMachine.idleAnimation,
              finiteStateMachine.strafeLeftAnimation,
              0.1
            );
            break;

          case "ArrowDown":
          case "KeyS":
            this.moveBackward = true;
            finiteStateMachine.changeAnimation(
              finiteStateMachine.idleAnimation,
              finiteStateMachine.walkBackwardAnimation,
              0.2
            );
            break;

          case "ArrowRight":
          case "KeyD":
            this.moveRight = true;
            finiteStateMachine.changeAnimation(
              finiteStateMachine.idleAnimation,
              finiteStateMachine.strafeRightAnimation,
              0.1
            );
            break;

          case "ShiftLeft":
            this.isRunning = true;
            break;
        }
      }
    });

    // Keyup
    document.addEventListener("keyup", (ev) => {
      switch (ev.code) {
        case "ArrowUp":
        case "KeyW":
          this.moveForward = false;
          finiteStateMachine.changeAnimation(
            finiteStateMachine.walkForwardAnimation,
            finiteStateMachine.idleAnimation,
            0.1
          );
          break;

        case "ArrowLeft":
        case "KeyA":
          this.moveLeft = false;
          finiteStateMachine.changeAnimation(
            finiteStateMachine.strafeLeftAnimation,
            finiteStateMachine.idleAnimation,
            0.2
          );
          break;

        case "ArrowDown":
        case "KeyS":
          this.moveBackward = false;
          finiteStateMachine.changeAnimation(
            finiteStateMachine.walkBackwardAnimation,
            finiteStateMachine.idleAnimation,
            0.2
          );
          break;

        case "ArrowRight":
        case "KeyD":
          this.moveRight = false;
          finiteStateMachine.changeAnimation(
            finiteStateMachine.strafeRightAnimation,
            finiteStateMachine.idleAnimation,
            0.2
          );
          break;

        case "ShiftLeft":
          this.isRunning = false;
          finiteStateMachine.walkForwardAnimation.timeScale = 1;
          break;
      }
    });
  }

  updatePlayer(speed) {
    let playerSpeed = speed;

    // if (camera.controls.isLocked) {
    this.velocity.x -= this.velocity.x * 0.4; //Momentum (lower = more momentum)
    this.velocity.z -= this.velocity.z * 0.4;

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize(); // this ensures consistent movements in all directions

    // Check if player is running
    if (this.isRunning) {
      playerSpeed *= 2;
    }

    if (this.moveForward || this.moveBackward)
      this.velocity.z -= this.direction.z * playerSpeed;
    if (this.moveLeft || this.moveRight)
      this.velocity.x -= this.direction.x * playerSpeed;

    // if (collisionDetector.movementBlocked) {
    //   camera.camera.position.x = Math.round(this.prevPositionX)
    //   camera.camera.position.z = Math.round(this.prevPositionZ)
    // } else {
    //   this.desktopMovement()
    // }

    // if (this.frameCounter === 20) {
    //   this.prevPositionX = camera.camera.position.x
    //   this.prevPositionZ = camera.camera.position.z
    //   this.frameCounter = 0
    // } else {
    //   this.frameCounter++
    // }
    collisionDetector.checkForCollision(this.velocity);

    // }

    this.character.position.x = camera.camera.position.x;
    this.character.position.z = camera.camera.position.z;

    this.character.rotation.copy(camera.camera.rotation);

    camera.camera.getWorldDirection(this.cameraWorldDirection);
    this.cameraWorldDirection.y = 0;
    this.cameraWorldDirection.add(this.character.position);
    this.character.lookAt(this.cameraWorldDirection);
  }

  setPlayerHands() {
    //Left Controller
    this.controller1 = renderer.renderer.xr.getController(0);
    //Right Controller
    this.controller2 = renderer.renderer.xr.getController(1);

    scene.add(this.controller1, this.controller2);

    this.controllerModelFactory = new XRControllerModelFactory();

    this.controllerGrip1 = renderer.renderer.xr.getControllerGrip(0);
    this.controllerGrip1.add(
      this.controllerModelFactory.createControllerModel(this.controllerGrip1)
    );
    scene.add(this.controllerGrip1);

    this.controllerGrip2 = renderer.renderer.xr.getControllerGrip(1);
    this.controllerGrip2.add(
      this.controllerModelFactory.createControllerModel(this.controllerGrip2)
    );
    scene.add(this.controllerGrip2);

    //Add visual line
    const laserHelper = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1),
    ]);

    this.lazer = new THREE.Line(laserHelper);
    this.lazer.scale.z = 5;

    this.controller1.add(this.lazer.clone());
    this.controller2.add(this.lazer.clone());
  }

  handleArtworkClick = (intersect) => {
    if (camera.controls.isLocked) {
      camera.controls.unlock();
    }
    if (
      room.activeItem === null ||
      intersect.object.name !== room.activeItem.name
    ) {
      room.activeItem = intersect.object;
      const event = new CustomEvent("MenuChange", { detail: "Artworks" });
      window.dispatchEvent(event);
      const event2 = new CustomEvent("ActiveItem", { detail: room.activeItem });
      window.dispatchEvent(event2);
    }
  };

  handleInteriorClick = (intersect) => {
    while (!intersect.object.animation_url) {
      intersect.object = intersect.object.parent;
    }
    const event = new CustomEvent("MenuChange", { detail: "Interior" });
    window.dispatchEvent(event);
    if (camera.controls.isLocked) {
      camera.controls.unlock();
    }
    setTimeout(() => {
      if (
        room.activeItem === null ||
        intersect.object.name !== room.activeItem.name
      ) {
        room.activeItem = intersect.object;
        const event2 = new CustomEvent("ActiveItem", {
          detail: room.activeItem,
        });
        window.dispatchEvent(event2);
      }
    }, 500);
  };

  checkIntersections() {
    //First Person View (from the center)
    document.addEventListener("click", () => {
      const intersect = raycaster.firstPersonOptions.currentIntersect;
      if (camera.controls.isLocked && intersect && intersect.object.name) {
        if (intersect.object.name.includes("Frame")) {
          this.handleArtworkClick(intersect);
        } else {
          this.handleInteriorClick(intersect);
        }
      }
    });

    //Left controller in VR
    //EventListener for when user is pressing main button
    this.controller1.addEventListener("selectstart", () => {
      // if (raycaster.leftControllerOptions.currentIntersect) {
      //If statement to check which object is being clicked on
      // if (
      //   raycaster.leftControllerOptions.currentIntersect.object.name ===
      //   "OBJECT"
      // ) {
      //   console.log("Left controller Clicked on OBJECT")
      //   raycaster.object.material.color = new THREE.Color(0xff0000)
      // }
      // }
      this.moveForward = true;
      finiteStateMachine.changeAnimation(
        finiteStateMachine.idleAnimation,
        finiteStateMachine.walkForwardAnimation,
        0.1
      );
    });

    this.controller1.addEventListener("selectend", () => {
      this.moveForward = false;
      finiteStateMachine.changeAnimation(
        finiteStateMachine.walkForwardAnimation,
        finiteStateMachine.idleAnimation,
        0.1
      );
    });

    //Right controller in VR
    this.controller2.addEventListener("selectstart", () => {
      if (raycaster.firstPersonOptions.currentIntersect) {
        if (raycaster.firstPersonOptions.currentIntersect.object.name) {
          room.activeItem =
            raycaster.firstPersonOptions.currentIntersect.object;
          if (room.activeItem.parent.name.includes("frame")) {
            const event = new CustomEvent("MenuChange", { detail: "Artworks" });
            window.dispatchEvent(event);
            if (camera.controls.isLocked) {
              camera.controls.unlock();
            }
            const frame = room.activeItem.parent.children[1];
            frame.thumb = frame.parent.thumb;
            const event2 = new CustomEvent("ActiveItem", { detail: frame });
            window.dispatchEvent(event2);
          } else {
            while (!room.activeItem.name.includes("~interior~")) {
              room.activeItem = room.activeItem.parent;
            }
            const event = new CustomEvent("MenuChange", { detail: "Interior" });
            window.dispatchEvent(event);
            if (camera.controls.isLocked) {
              camera.controls.unlock();
            }
            setTimeout(() => {
              const event2 = new CustomEvent("ActiveItem", {
                detail: room.activeItem,
              });
              window.dispatchEvent(event2);
            }, 500);
          }
        }
      }
    });
  }

  setDollyForVR() {
    //You get the weird bug in desktop mode because both the camera and the dolly are going forward. NO BUENO
    this.dolly = new THREE.Object3D();
    this.dolly.add(camera.camera);
    scene.add(this.dolly);

    this.dummyCam = new THREE.Object3D();
    camera.camera.add(this.dummyCam);
  }

  updateDolly() {
    this.dolly.add(this.controller1);
    this.dolly.add(this.controller2);
    this.dolly.add(this.controllerGrip1);
    this.dolly.add(this.controllerGrip2);

    if (this.moveForward) {
      camera.camera.getWorldDirection(this.cameraWorldDirection);
      this.dolly.position.addScaledVector(this.cameraWorldDirection, 0.004);
      this.dolly.position.y = 0;
    }
  }
}
