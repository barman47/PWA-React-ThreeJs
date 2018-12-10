import SceneManager from './planetarium/SceneManager';


export default container => {
    const canvas = createCanvas(document, container);
    const sceneManager = new SceneManager(canvas);


    let canvasHalfWidth;
    let canvasHalfHeight;

    bindEventListeners();
    render();

    function createCanvas(document, container) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        return canvas;
    }


    function bindEventListeners() {
        window.onresize = resizeCanvas;
        window.onmousemove = mouseMove;
        window.onmousedown = mouseDown;
        resizeCanvas();
    }

    function resizeCanvas() {
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        canvasHalfWidth = Math.round(canvas.offsetWidth/2);
        canvasHalfHeight = Math.round(canvas.offsetHeight/2);


        sceneManager.onWindowResize()

    }

    function mouseMove({screenX, screenY}) {

      //  console.log( " clientX:" + canvas.clientX )
        sceneManager.onMouseMove(screenX-canvasHalfWidth, screenY-canvasHalfHeight);
    }
    function mouseDown(e) {


        let mouseX = e.clientX ;
        let mouseY = e.clientY ;


        sceneManager.onMouseDown(mouseX, mouseY);
    }

    function render(time) {
        requestAnimationFrame(render);
        sceneManager.update();
    }




    //click


}