export const threeDimensionalFormats = ['gltf', 'glb', 'fbx']

export const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif']

export const videoFormats = ['mp4', 'mov', 'webm']

export const getExtension = (file) => {
    const regex = /(?:\.([^.]+))?$/;
    return regex.exec(file)[1]
}