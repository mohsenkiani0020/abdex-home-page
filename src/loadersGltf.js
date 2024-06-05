import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export async function loadModel(gltfPath) {
    const loader = new GLTFLoader();

    const gltf = await loadGltf(gltfPath, loader);

    return gltf.scene;

}

async function loadGltf(gltfPath, loader) {

    return new Promise((resolve, reject) => {

        loader.load(gltfPath, (gltf) => {

            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                }
            })

            resolve(gltf);

        }, undefined, reject);

    });

}