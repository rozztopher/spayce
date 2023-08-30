import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {
  finiteStateMachine,
  player,
  room,
  camera
} from "./Experience"
import gsap from "gsap";

export class Loaders {
  constructor() {
    this.setLoaders()
  }

  setLoaders() {
    this.loadingManager = new THREE.LoadingManager(() => {
      //Put everything here what you want to load asynsc
      //room.loadRoom()
      player.setPlayer();
      finiteStateMachine.setFiniteStateMachine(player.characterParent);
      const event = new Event("AssetsLoaded");
      window.dispatchEvent(event);

      // setTimeout(() => {
      //   const button = document.getElementById('enter-spayce-button')
      //   button.addEventListener("click", () => {
      //     camera.controls.lock()
      //   })
      // }, 500)
    })

    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const loadingBar = document.querySelector('.loading-bar')
      const percentage = (itemsLoaded / itemsTotal) * 100;
      if (percentage === 100 && itemsLoaded === 34) {
        setTimeout(() => room.addInteractiveRoomItems(), 5000)
      }

      if (percentage === 100) {
        gsap.timeline().to(".loading-screen-content", {duration: 2, opacity: 0})
        gsap.timeline().to(".loading-screen-content", {delay: 2, duration: 0, display: "none"})
        gsap.timeline().to(".entry-instructions", {delay: 2, duration: 0, display: "block"})
        gsap.timeline().to(".entry-instructions", {delay: 2, duration: 1, opacity: 1})
      }

      if (loadingBar) {
        loadingBar.style.background = `linear-gradient(
          to right, #BA04FC 0%, #6700EB ${percentage}%, rgba(255, 255, 255, 0.18) ${0}%
        )`
      }
    };

    //Textures
    this.textureLoader = new THREE.TextureLoader(this.loadingManager)

    //Models
    this.gltfLoader = new GLTFLoader(this.loadingManager)

    //Env Maps
    this.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)

    this.imageLoader = new THREE.ImageLoader(this.loadingManager);

    this.imageBitmapLoader = new THREE.ImageBitmapLoader(this.loadingManager);

    this.dracoLoader = new DRACOLoader(this.loadingManager);
  }
}