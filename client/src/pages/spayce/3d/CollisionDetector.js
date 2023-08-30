import * as THREE from "three"
import { camera, player } from "./Experience"

export class CollisionDetector {
  constructor() {
    this.raycaster = new THREE.Raycaster()
    this.currentIntersect = null
    this.movementBlocked = false

    this.frameCounter = 0
    this.prevPositionX = null
    this.prevPositionZ = null
  }

  setCollisionDetector(mesh) {
    this.detectionMesh = mesh
  }

  updateRaycaster() {
    //Raycaster pointing down
    this.raycaster.ray.set(camera.camera.position, new THREE.Vector3(0, -1, 0))

    const intersects = this.raycaster.intersectObject(this.detectionMesh)

    if (intersects.length) {
      if (!this.currentIntersect) {
        //Player on detectionMesh
        console.log("Free movement")
        this.movementBlocked = false
      }

      this.currentIntersect = intersects[0]
    } else {
      if (this.currentIntersect) {
        //Player off detectionMesh
        console.log("Movement blocked")
        this.movementBlocked = true
      }

      this.currentIntersect = null
    }
  }

  checkForCollision(velocity) {
    if (this.movementBlocked) {
      camera.camera.position.x = Math.round(this.prevPositionX)
      camera.camera.position.z = Math.round(this.prevPositionZ)

      if (player.dolly) {
        player.dolly.position.x = Math.round(this.prevPositionX)
        player.dolly.position.z = Math.round(this.prevPositionZ)
      }
    } else {
      //Desktop
      camera.controls.moveRight(-velocity.x)
      camera.controls.moveForward(-velocity.z)

      //Mobile
      camera.mobileControls.updateCamera()

      //VR
      if (player.dolly) {
        player.updateDolly()
      }
    }

    if (this.frameCounter === 20) {
      this.prevPositionX = camera.camera.position.x
      this.prevPositionZ = camera.camera.position.z
      this.frameCounter = 0
    } else {
      this.frameCounter++
    }
  }
}