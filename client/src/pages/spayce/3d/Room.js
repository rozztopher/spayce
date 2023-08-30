import { loaders, scene, raycaster, collisionDetector } from "./Experience";
import * as THREE from "three";
import {
  getExtension,
  imageFormats,
  videoFormats,
  threeDimensionalFormats,
} from "../../../utils/Formats";
import { updateSpace, getSpaceById } from "../../../utils/dbFunctions";
import { gatewayURL } from "../../../clients/ipfsClient";

export class Room {
  constructor(spayce) {
    this.room = null;
    this.interior = [];
    this.frames = [];
    this.loadRoom(spayce);
    this.activeItem = null;

    window.addEventListener("AddItem", (e) => {
      this.add3dAsset(e.detail);
    });

    window.addEventListener("SelectInterior", (e) => {
      this.setActiveInterior(e.detail);
    });

    window.addEventListener("RemoveItem", () => {
      this.removeActiveItem();
    });

    window.addEventListener("PositionChange", (e) => {
      this.changePosition(e.detail);
    });

    window.addEventListener("RotationChange", (e) => {
      this.changeRotation(e.detail);
    });

    window.addEventListener("ScaleChange", (e) => {
      this.changeScale(e.detail);
    });

    window.addEventListener("AddArtwork", (e) => {
      this.addArtwork(e.detail);
    });

    window.addEventListener("RemoveArtwork", (e) => {
      this.removeArtwork();
    });

    window.addEventListener("SaveRoom", (e) => {
      this.saveRoom(e);
    });

    window.addEventListener("ArtworkMenuLoaded", (e) => {
      this.getArtworkNames();
    });

    window.addEventListener("InteriorMenuLoaded", (e) => {
      this.getInteriorAssetNames();
    });

    window.addEventListener("ClearActiveItem", () => {
      this.activeItem = null;
    });

    window.addEventListener("SetActiveItem", (e) => {
      this.setActiveItem(e.detail);
    });
  }

  loadRoom = async (spayce) => {
    const concreteTexture = loaders.textureLoader.load(
      "/galleries/ConcreteBake.jpg"
    );
    concreteTexture.flipY = false;
    concreteTexture.encoding = THREE.sRGBEncoding;

    const woodTexture = loaders.textureLoader.load("/galleries/WoodBake.jpg");
    woodTexture.flipY = false;
    woodTexture.encoding = THREE.sRGBEncoding;

    const concreteMaterial = new THREE.MeshBasicMaterial({
      map: concreteTexture,
    });

    const woodMaterial = new THREE.MeshBasicMaterial({
      map: woodTexture,
    });

    let src = ""
    let path = ""
    if(spayce.architecture) {
      const split = spayce.architecture.animation_url.split("ipfs://")[1]
      src = gatewayURL + split
      path = split.split("/")[0]
    } else {
      const url = new URL(window.location.href);
      const space = await getSpaceById(url.searchParams.get("spayce"))
      const split = space.architecture.animation_url.split("ipfs://")[1]
      src = gatewayURL + split
      path = split.split("/")[0]
    }

    console.log(src)
    await loaders.gltfLoader.load("/galleries/newyork.gltf", (gltf) => {
    // await loaders.gltfLoader.load(src, (gltf) => {

      this.room = gltf.scene;
      const concrete = this.room.getObjectByName("Concrete");
      concrete.material = concreteMaterial;

      const floor = this.room.getObjectByName("Floor");
      floor.material = woodMaterial;

      const beams = this.room.getObjectByName("Beams");
      beams.material = woodMaterial;

      collisionDetector.setCollisionDetector(
        this.room.getObjectByName("NavMesh")
      );

      const frames = [];
      this.room.children.forEach((child) => {
        if (child.name.includes("Frame")) {
          frames.push(child);
        }
      });
      if (spayce.interior) {
        this.loadInterior(spayce.interior);
      }
      if (spayce.frames) {
        this.loadFrames(spayce.frames);
      }
      frames.forEach((frame) => {
        raycaster.group.add(frame);
      });
      scene.add(this.room);
    });
  };

  addInteractiveRoomItems = () => {
    this.interior.forEach((item) => {
      raycaster.group.add(item);
    });
    this.room.children.forEach((child) => {
      if (child.name.includes("frame")) {
        raycaster.group.add(child);
      }
    });
  };

  loadInterior = (items) => {
    if (Object.keys(items).length > 0) {
      Object.keys(items).forEach((key) => {
        const item = items[key];
        const ext = getExtension(item.animation_url);
        if (imageFormats.includes(ext)) {
          this.loadImageAsset(item);
        } else if (videoFormats.includes(ext)) {
          this.loadVideoAsset(item);
        } else if (threeDimensionalFormats.includes(ext)) {
          this.load3dAsset(item);
        } else {
          this.loadImageAsset(item);
        }
      });
    }
  };

  loadFrames = (items) => {
    const names = [];
    if (Object.keys(items).length > 0) {
      Object.keys(items).forEach((key) => {
        const item = items[key];
        this.room.children.forEach((obj) => {
          if (obj.name === key) {
            loaders.imageBitmapLoader.load(
              item,
              (imageBitmap) => {
                names.push(item);
                const scale = imageBitmap.width / imageBitmap.height;
                obj.scale.x = scale;
                const texture = new THREE.CanvasTexture(imageBitmap);
                texture.encoding = THREE.sRGBEncoding;
                const material = new THREE.MeshBasicMaterial({ map: texture });
                obj.material = material;
                obj.image_url = item;
                this.frames.push(obj);
              },
              undefined,
              function (err) {
                console.log(err);
              }
            );
          }
        });
      });
    }
    const event = new CustomEvent("InteriorNamesReceived", { detail: names });
    window.dispatchEvent(event);
  };

  loadImageAsset = (item) => {
    const geometry = new THREE.PlaneGeometry(item.scale.x, item.scale.y);
    var texture = new THREE.TextureLoader().load(item.src);

    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: texture,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(item.pos.x, item.pos.y, item.pos.z);
    plane.rotation.set(item.rot._x, item.rot._y, item.rot._z);
    plane.name = "~interior~" + item.name;
    plane.src = item.src;
    plane.thumb = item.thumb;

    this.interior.push(plane);
    scene.add(plane);
  };

  loadVideoAsset = (item) => {
    const video = document.createElement("video");
    video.src = item.src;
    video.load();
    video.play();

    const texture = new THREE.VideoTexture(video);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    texture.crossOrigin = "anonymous";

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(item.scale.x, item.scale.y),
      new THREE.MeshBasicMaterial({ map: texture })
    );
    mesh.name = "~interior~" + item.name;
    mesh.src = item.src;
    mesh.thumb = item.thumb;

    this.interior.push(mesh);
    scene.add(mesh);
  };

  load3dAsset = (item) => {
    loaders.gltfLoader.load(item.animation_url, (gltf) => {
      const asset = gltf.scene;
      asset.scale.set(item.scale.x, item.scale.y, item.scale.z);
      asset.position.set(item.pos.x, item.pos.y, item.pos.z);
      asset.rotation.set(item.rot._x, item.rot._y, item.rot._z);
      asset.image_url = item.image_url;
      asset.animation_url = item.animation_url;
      asset.name = "~interior~" + item.name;
      this.interior.push(asset);
      setTimeout(() => {
        raycaster.group.add(asset);
      }, 1000);
      scene.add(asset);
    });
  };

  add3dAsset = (item) => {
    loaders.gltfLoader.load(item.animation_url, (gltf) => {
      const asset = gltf.scene;
      asset.name = "~interior~" + item.name;
      asset.image_url = item.image_url;
      asset.animation_url = item.animation_url;
      const event = new CustomEvent("ActiveItem", { detail: asset });
      window.dispatchEvent(event);
      this.interior.push(asset);
      this.activeItem = asset;
      setTimeout(() => {
        raycaster.group.add(asset);
      }, 1000);
      scene.add(asset);
    });
  };

  isNewFrame = (name) => {
    const bool = true;
    this.frames.forEach((frame) => {
      if (frame.name === name) {
        bool = false;
      }
    });
    return bool;
  };

  addArtwork = (item) => {
    loaders.imageBitmapLoader.load(
      item.image_url,
      (imageBitmap) => {
        const scale = imageBitmap.width / imageBitmap.height;
        this.activeItem.scale.x = scale;
        const texture = new THREE.CanvasTexture(imageBitmap);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        this.activeItem.material = material;
        this.activeItem.image_url = item.image_url;
        const event = new CustomEvent("ActiveItem", {
          detail: this.activeItem,
        });
        window.dispatchEvent(event);
        if (this.isNewFrame(item.name)) this.frames.push(this.activeItem);
      },
      undefined,
      function (err) {
        console.log(err);
      }
    );
  };

  removeArtwork = () => {
    const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
    delete this.activeItem.image_url;
    delete this.activeItem.animation_url;
    this.activeItem.material = material;
  };

  removeActiveItem = () => {
    raycaster.group.remove(this.activeItem);
    if (this.activeItem.children) {
      this.activeItem.children.forEach((child) => {
        scene.remove(child);
      });
    }
    for (let i = 0; i < this.interior.length; i++) {
      if (this.interior[i].name === this.activeItem.name) {
        this.interior.splice(i, 1);
      }
    }
    scene.remove(this.activeItem);
  };

  changePosition = (pos) => {
    const currentPos = this.activeItem.position;
    const newPos = {
      x: pos.x ? pos.x : parseFloat(currentPos.x),
      y: pos.y ? pos.y : parseFloat(currentPos.y),
      z: pos.z ? pos.z : parseFloat(currentPos.z),
    };
    this.activeItem.position.set(newPos.x, newPos.y, newPos.z);
  };

  changeRotation = (rot) => {
    const currentRot = this.activeItem.rotation;
    const newRot = {
      x: rot.x ? rot.x : parseFloat(currentRot.x),
      y: rot.y ? rot.y : parseFloat(currentRot.y),
      z: rot.z ? rot.z : parseFloat(currentRot.z),
    };
    this.activeItem.rotation.set(newRot.x, newRot.y, newRot.z);
  };

  changeScale = (scale) => {
    const currentScale = this.activeItem.scale;
    const newScale = {
      x: scale.x ? scale.x : parseFloat(currentScale.x),
      y: scale.x ? scale.x : parseFloat(currentScale.y),
      z: scale.x ? scale.x : parseFloat(currentScale.z),
    };
    this.activeItem.scale.set(newScale.x, newScale.y, newScale.z);
  };

  saveRoom = async (e) => {
    console.log(e.detail);
    const newName = e.detail.name;
    const id = e.detail.id;
    const frames = {};
    const interior = {};
    scene.traverse((obj) => {
      if (obj.name.includes("~interior~")) {
        const interiorKey = obj.name.split("~interior~")[1];
        interior[interiorKey] = {
          name: interiorKey,
          pos: obj.position,
          rot: obj.rotation,
          scale: obj.scale,
          image_url: obj.image_url,
          animation_url: obj.animation_url,
        };
      } else if (obj.name.includes("FrameCanvas")) {
        frames[obj.name] = obj.image_url;
      }
    });
    await updateSpace(id, {
      name: newName,
      frames: frames,
      interior: interior,
    });
  };

  setActiveInterior = (name) => {
    this.interior.forEach((item) => {
      if (item.name.includes(name)) {
        this.activeItem = item;
        const event = new CustomEvent("ActiveItem", { detail: item });
        window.dispatchEvent(event);
      }
    });
  };

  getArtworkNames = () => {
    const names = [];
    this.frames.forEach((item) => {
      Object.keys(item).forEach(key => names.push(item[key]))
    });
    const event = new CustomEvent("ArtworkNamesReceived", { detail: names });
    window.dispatchEvent(event);
  };

  getInteriorAssetNames = () => {
    const names = [];
    this.interior.forEach((item) => {
      const name = item.name.split("~interior~")[1];
      if (!names.includes(name)) {
        names.push(item.animation_url);
      }
    });
    const event = new CustomEvent("InteriorNamesReceived", { detail: names });
    window.dispatchEvent(event);
  };

  setActiveItem = (url) => {
    this.frames.forEach((item) => {
      if (item.image_url === url) {
        this.activeItem = item;
      }
    });
    this.interior.forEach((item) => {
      if (item.animation_url === url) {
        this.activeItem = item;
        const event = new CustomEvent("ActiveItem", {
          detail: this.activeItem,
        });
        window.dispatchEvent(event);
      }
    });
  };
}
