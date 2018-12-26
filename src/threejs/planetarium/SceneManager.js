import THREE from '../three';

import Horizon from './sceneSubjects/Horizon';
import Light from './sceneSubjects/Light';
import Planets from './sceneSubjects/Planets';
import {onDocumentMouseDown} from "./sceneActions/Raycaster";

var TWEEN = require('@tweenjs/tween.js');


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
    const objectsPlanets = [];
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    let controls = buildControls();


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
        controls.minPolarAngle = 0.8;
        controls.maxPolarAngle = Math.PI;
        controls.dampingFactor = 0.07;
        controls.rotateSpeed = 0.07;
        controlsType = "orbit"

        return controls;
    }

    window.addEventListener('deviceorientation', setOrientationControls, true);

    function setOrientationControls(e) {

        if (!e.alpha) {
            //orientation control pas possible
            return;

        }
        buildOrientationControl(optsThreeGlobal, updateOptsThree);
        window.removeEventListener('deviceorientation', setOrientationControls, true);
    }


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
        const fieldOfView = 60;
        const nearPlane = 4;
        const farPlane = 100;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.set(0.1, 0, 0);
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

    let focusZoomVal = null;

    async function collisionCam() {

        //clearText();

        //console.log("optsThreeGlobal dans collision = ", optsThree)

        var vector = new THREE.Vector3(); // create once and reuse it!
        var cameraDirection = optsThree.camera.getWorldDirection(vector);


        var ray = new THREE.Raycaster(optsThree.camera.getWorldPosition(vector), cameraDirection);

        var intersects = ray.intersectObjects(optsThree.objectsPlanets, true);
        if (intersects.length > 0) {
            console.log(intersects[0].distance);
            console.log("focusZoomVal : " + focusZoomVal)
            if (intersects[0].distance < 7 && focusZoomVal) {
                console.log("__________------------ collision")
                focusZoomVal.stop();
                focusZoomVal = null;
            }
        }

        //appendText(hits);

    }


    function update() {
        const elapsedTime = clock.getElapsedTime();


        collisionCam();
        TWEEN.update();
        controls.update();
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


    }


// function onMouseMove(x, y) {
//     mousePosition.x = x;
//     mousePosition.y = y;
//    // console.log("mousePosition.x : " + mousePosition.x)
// }

    async function onMouseDown(mouseX, mouseY, updateOptsThree) {

        console.log("before control : ", optsThreeGlobal)

        if (controlsType === "orientation") {
            console.log(" controlsType : " + optsThreeGlobal.controlsType)
            controls = await buildControls();
            updateOptsThree(optsThreeGlobal)
        }
        console.log("after controls : ", optsThreeGlobal)
        onDocumentMouseDown(mouseX, mouseY, updateOptsThree, optsThreeGlobal)
    }


//function init(objectsPlanets, renderer, camera, modal, scene, controls) {
//
//
//     document.addEventListener('mousedown', onDocumentMouseDown(objectsPlanets, renderer, camera, modal, scene, controls), false);
//     //document.addEventListener('touchstart', onDocumentTouchStart, false);
//
// }


    return {
        update,
        onWindowResize,
        onMouseDown,
        buildControls,
        setOrientationControls
        // onMouseMove,
    }

}

export async function buildOrientationControl(optsThreeGlobal, updateOptsThree) {
    console.log(" je met le controle en mode Orientation Device ")
    optsThreeGlobal.controlsType = "orientation"
    optsThreeGlobal.controls = await new THREE.DeviceOrientationControls(optsThreeGlobal.camera, true);
    // optsThreeGlobal.controls.connect();


    updateOptsThree(optsThreeGlobal);
    console.log(" orientation : ", optsThreeGlobal)


}
