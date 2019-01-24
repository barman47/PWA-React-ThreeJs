import THREE from '../three';

import Horizon from './sceneSubjects/Horizon';
import Light from './sceneSubjects/Light';
import Planets from './sceneSubjects/Planets';


export default (canvas, updateOptsThree, optsThreeGlobal) => {

    const clock = new THREE.Clock();
    //const origin = new THREE.Vector3(0,0,0);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    // const mousePosition = {
    //     x: 0,
    //     y: 0
    // }

    let controlsType = null;
    let objectsPlanets = [];
    let scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = buildControls();
    let typeDevice = "desktop";


//const sceneSubjects = createSceneSubjects(scene);
    createSceneSubjects(scene);


    let optsThree = {
        canvas: canvas,
        objectsPlanets: objectsPlanets,
        scene: scene,
        renderer: renderer,
        camera: camera,
        controls: controls,
        controlsType: controlsType,
        typeDevice: typeDevice
    }


    window.addEventListener('deviceorientation', differentDevice, true);

    function differentDevice(e) {

        if (!e.alpha) {
            typeDevice = "desktop"
        } else {
            typeDevice = "mobile"
        }


        optsThree.typeDevice = typeDevice;

        updateOptsThree(optsThree);

        window.removeEventListener('deviceorientation', differentDevice, true);
        return typeDevice;
    }

//envoie de options three
    updateOptsThree(optsThree);

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#FFF");


        return scene;
    }


    function buildControls() {
        const controls = new THREE.OrbitControls(camera, renderer.domElement);

        //controls.autoRotate = true ;
        controls.autoRotateSpeed = 0.02;
        controls.target.z = 0
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.enableDamping = true;
        controls.maxPolarAngle = Math.PI;
        controls.rotateSpeed = 0.07;
        controls.minDistance = 1;
        controls.maxDistance = 50;
        controlsType = "orbitBase"

        return controls;
    }


    calibrerCompass(optsThree, updateOptsThree)


    // async function setOrientationControls(e) {
    //
    //     if (!e.alpha) {
    //         return;
    //     }
    //
    //     let orientation = Math.round(e.webkitCompassHeading);
    //
    //     console.log("orientation init :" + orientation)
    //
    //
    //     if (orientation != 0) {
    //         if (orientation > 180) {
    //             orientation = 360 - orientation;
    //             orientation = -orientation;
    //             console.log("orientation de base >180 :" + orientation)
    //         }
    //
    //
    //         optsThree.scene.rotation.y = ((2 * Math.PI) / 100) * orientation;
    //         console.log(" optsThree.scene.rotation.y :" + optsThree.scene.rotation.y)
    //         buildOrientationControl(optsThree, updateOptsThree);
    //         window.removeEventListener('deviceorientation', setOrientationControls, true);
    //     }
    // }


    function buildRender({width, height}) {
        const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    function buildCamera({width, height}) {
        const aspectRatio = width / height;
        const fieldOfView = 45;
        const nearPlane = 2;
        const farPlane = 500;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.set(0, 0, 0.1);
        camera.name = "camera"

        return camera;
    }


    function createSceneSubjects(scene) {

        const sceneSubjects = [
            new Light(scene),
            new Planets(scene, objectsPlanets),
            //new SkyStars(scene),
            new Horizon(scene),
            //new SceneSubjecttt(scene)
        ];

        return sceneSubjects;
    }


    function update() {
        const elapsedTime = clock.getElapsedTime();


        // collisionCam(optsThree);
        // TWEEN.update();
        // controls.update();
        renderer.render(scene, camera);

    }

// function updateCameraPositionRelativeToMouse() {
//     camera.position.x += (  (mousePosition.x * 0.01) - camera.position.x ) * 0.01;
//     camera.position.y += ( -(mousePosition.y * 0.01) - camera.position.y ) * 0.01;
//     camera.lookAt(origin);
// }

    function onWindowResize() {
        const {width, height} = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.render(scene, camera);


    }


// function onMouseMove(x, y) {
//     mousePosition.x = x;
//     mousePosition.y = y;
//    // console.log("mousePosition.x : " + mousePosition.x)
// }


//function init(objectsPlanets, renderer, camera, modal, scene, controls) {
//
//
//     document.addEventListener('mousedown', onDocumentMouseDown(objectsPlanets, renderer, camera, modal, scene, controls), false);
//     //document.addEventListener('touchstart', onDocumentTouchStart, false);
//
// }


    return {
        // update,
        onWindowResize,
        update
        // onMouseMove,
    }

}

export async function buildOrientationControl(optsThreeGlobal, updateOptsThree) {

    console.log(" je met le controle en mode Orientation Device ")
    optsThreeGlobal.controlsType = "orientation"
    optsThreeGlobal.controls = await new THREE.DeviceOrientationControls(optsThreeGlobal.camera, true);
    optsThreeGlobal.controls.connect();
    optsThreeGlobal.controls.update();

    console.log(" orientation : ", optsThreeGlobal)
    updateOptsThree(optsThreeGlobal);


}

export function buildOrbitControls(optsThreeGlobal, updateOptsThree) {

    console.log(" je met le controle en mode Orbit Device ")
    optsThreeGlobal.controlsType = "orbit"


    console.log("dispose")
    optsThreeGlobal.controls.dispose()
    optsThreeGlobal.controls = new THREE.OrbitControls(optsThreeGlobal.camera, optsThreeGlobal.renderer.domElement);
    optsThreeGlobal.controls.autoRotateSpeed = 0.02;
    optsThreeGlobal.controls.target.z = 0
    optsThreeGlobal.controls.enablePan = false;
    optsThreeGlobal.controls.enableZoom = true;
    optsThreeGlobal.controls.enableDamping = true;
    optsThreeGlobal.controls.maxPolarAngle = Math.PI;
    optsThreeGlobal.controls.rotateSpeed = 0.07;
    optsThreeGlobal.controls.minDistance = 1;
    optsThreeGlobal.controls.maxDistance = 50;
    optsThreeGlobal.controls.connect();
    optsThreeGlobal.controls.update();
    console.log("testtttt controle = ", optsThreeGlobal.controls)

    console.log(" orbit : ", optsThreeGlobal)
    updateOptsThree(optsThreeGlobal);


}

export function collisionCam(optsThreeGlobal) {


    //console.log("optsThreeGlobal dans collision = ", optsThree)
    var vector = new THREE.Vector3(); // create once and reuse it!
    var cameraDirection = optsThreeGlobal.camera.getWorldDirection(vector);

    var ray = new THREE.Raycaster(optsThreeGlobal.camera.getWorldPosition(vector), cameraDirection);

    var intersects = ray.intersectObjects(optsThreeGlobal.objectsPlanets, true);

    //console.log(" intersects.length :" + intersects.length)
    if (intersects.length > 0) {
        console.log(intersects[0].distance);
        if (intersects[0].distance < 7) {
            console.log("__________------------ collision")
            //focusZoomVal.stop();
        }
    }
}


export function calibrerCompass(optsThreeGlobal, updateOptsThree) {


    window.addEventListener('deviceorientation', setOrientationControls, true);

    console.log("optsThreeGlobal :", optsThreeGlobal)

    function setOrientationControls(e) {

        if (!e.alpha) {
            window.removeEventListener('deviceorientation', setOrientationControls, true);
            return;
        }

        let orientation = Math.round(e.webkitCompassHeading);

        console.log("orientation init :" + orientation)


        if (orientation !== 0) {
            if (orientation > 180) {
                orientation = 360 - orientation;
                orientation = -orientation;
                console.log("orientation de base >180 :" + orientation)
            }


            optsThreeGlobal.scene.rotation.y = ((2 * Math.PI) / 100) * orientation;
            console.log(" optsThree.scene.rotation.y :" + optsThreeGlobal.scene.rotation.y)
            if (optsThreeGlobal.controlsType !== "orientation") {
                buildOrientationControl(optsThreeGlobal, updateOptsThree);
            } else {
                updateOptsThree(optsThreeGlobal);
            }

            window.removeEventListener('deviceorientation', setOrientationControls, true);
        }
    }


}
