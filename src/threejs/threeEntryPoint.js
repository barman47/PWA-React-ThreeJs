import SceneManager from './planetarium/SceneManager';


export default (container, updateOptsThree, optsThreeGlobal) => {
    const canvas = createCanvas(document, container);
    const sceneManager = new SceneManager(canvas, updateOptsThree, optsThreeGlobal);

    let alphaVal;
    window.addEventListener('deviceorientation', setOrientationControls, true);

    function setOrientationControls(e) {
        alphaVal = e.alpha;
        window.removeEventListener('deviceorientation', setOrientationControls, true);
    }

    bindEventListeners();
    render();

    function createCanvas(document, container) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        return canvas;
    }


    function bindEventListeners() {
        window.onresize = resizeCanvas;
        // window.onmousemove = mouseMove;
        window.onmousedown = mouseDown;
        window.ontouchstart = mouseDown;

        resizeCanvas();
    }

    function resizeCanvas() {
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        sceneManager.onWindowResize()
    }

    // function mouseMove({screenX, screenY}) {
    //
    //   //  console.log( " clientX:" + canvas.clientX )
    //     sceneManager.onMouseMove(screenX-canvasHalfWidth, screenY-canvasHalfHeight);
    // }


    function mouseDown(e) {

        let mouseX;
        let mouseY;
        if (!alphaVal) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        } else {
            mouseX = (e.targetTouches[0] ? e.targetTouches[0].pageX : e.changedTouches[e.changedTouches.length - 1].pageX)
            mouseY = (e.targetTouches[0] ? e.targetTouches[0].pageY : e.changedTouches[e.changedTouches.length - 1].pageY);
        }
        sceneManager.onMouseDown(mouseX, mouseY);
    }

    function render(time) {
        requestAnimationFrame(render);
        sceneManager.update();
    }
}