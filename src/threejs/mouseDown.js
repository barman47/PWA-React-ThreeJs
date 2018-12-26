import SceneManager, {buildOrientationControl} from './planetarium/SceneManager';
import {onDocumentMouseDown} from "./planetarium/sceneActions/Raycaster";
import THREE from "./three";

var TWEEN = require('@tweenjs/tween.js');

export default (updateOptsThree, optsThreeGlobal) => {

    bindEventListeners();


    function bindEventListeners() {

        window.onmousedown = mouseDown;
        window.ontouchstart = mouseDown;


    }

    let alphaVal;
    window.addEventListener('deviceorientation', setOrientationControls, true);

    function setOrientationControls(e) {
        alphaVal = e.alpha;
        window.removeEventListener('deviceorientation', setOrientationControls, true);
    }

    async function mouseDown(e) {

        let mouseX;
        let mouseY;
        if (!alphaVal) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        } else {
            mouseX = (e.targetTouches[0] ? e.targetTouches[0].pageX : e.changedTouches[e.changedTouches.length - 1].pageX)
            mouseY = (e.targetTouches[0] ? e.targetTouches[0].pageY : e.changedTouches[e.changedTouches.length - 1].pageY);
        }


        if (optsThreeGlobal.controlsType === "orientation") {
            console.log(" controlsType : " + optsThreeGlobal.controlsType)
            optsThreeGlobal.controls = await SceneManager.buildControls();
            updateOptsThree(optsThreeGlobal)
        }
        onDocumentMouseDown(mouseX, mouseY, updateOptsThree, optsThreeGlobal)

    }

    function render(time) {
        requestAnimationFrame(render);
        update();
    }


    function update() {

        TWEEN.update();
        optsThreeGlobal.controls.update();
        optsThreeGlobal.renderer.render(optsThreeGlobal.scene, optsThreeGlobal.camera);

    }


}
