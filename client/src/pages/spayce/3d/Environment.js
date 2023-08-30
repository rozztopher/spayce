import { loaders } from "./Experience"

export class Environment {
  constructor() {
    this.setEnvironment()
  }

  setEnvironment() {
    this.envMap = loaders.cubeTextureLoader.load([
      "/galleries/env/px.png",
      "/galleries/env/nx.png",
      "/galleries/env/py.png",
      "/galleries/env/ny.png",
      "/galleries/env/pz.png",
      "/galleries/env/nz.png",
    ])
  }
}
