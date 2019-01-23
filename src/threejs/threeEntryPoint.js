import SceneManager from './planetarium/SceneManager';


export default (container, updateOptsThree, optsThreeGlobal) => {
    const canvas = createCanvas(document, container);
    const sceneManager = new SceneManager(canvas, updateOptsThree, optsThreeGlobal);

    bindEventListeners();
    render();

    function createCanvas(document, container) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        return canvas;
    }


    function bindEventListeners() {
        window.onresize = resizeCanvas;
        // // window.onmousemove = mouseMove;
        // window.onmousedown = mouseDown;
        // window.ontouchstart = mouseDown;

        resizeCanvas();
    }

    function resizeCanvas() {
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        sceneManager.onWindowResize()
    }


    function render(time) {
        requestAnimationFrame(render);
        sceneManager.update();
    }
}