// loaders.js

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export async function load(objPath, mtlPath) {

    const loader = new OBJLoader();
    const materials = await loadMtl(mtlPath);

    const object = await loadObj(objPath, loader);
    loader.setMaterials(materials);
    object.scale.set(0.005, 0.005, 0.005);

    return object;
}

async function loadMtl(mtlPath) {

    const materials = {};
    const mtlLoader = new MTLLoader();

    return new Promise((resolve, reject) => {
        mtlLoader.load(mtlPath, (mtl) => {
            mtl.preload();
            Object.keys(mtl.materials).forEach(materialName => {
                materials[materialName] = mtl.materials[materialName];
            });
            resolve(materials);
        }, undefined, reject);
    });
}

async function loadObj(objPath, loader) {

    return new Promise((resolve, reject) => {
        loader.load(objPath, (object) => {
            resolve(object);
        }, undefined, reject);
    });
}





// export default function load(mtlPath,objPath,scene){
//     const mtlLoader = new MTLLoader();
//     mtlLoader.load(mtlPath, function (materials) {
//         materials.preload();
//
//         const objLoader = new OBJLoader();
//         // console.log(materials,"basic materials");
//         objLoader.setMaterials(materials);
//
//         objLoader.load(objPath, function (object) {
//             object.scale.x = 0.005;
//             object.scale.y = 0.005;
//             object.scale.z = 0.005;
//
//             const box = new THREE.Box3().setFromObject(object);
//             const center = box.getCenter(new THREE.Vector3());
//
//             object.position.x = 20;
//             object.position.y = 1;
//             object.position.z = -center.z;
//
//
//             // axesHelper.position.set(0,0,0);
//             console.log(object, "object old");
//         });
//     });
// }