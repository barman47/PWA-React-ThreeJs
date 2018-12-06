import SceneManager from './planetarium/SceneManager';



export default container => {
    const canvas = createCanvas(document, container);
    const sceneManager = new SceneManager(canvas);


    // let canvasHalfWidth;
    // let canvasHalfHeight;

    bindEventListeners();
    render();
    init();

    function createCanvas(document, container) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        return canvas;
    }




    function bindEventListeners() {
        window.onresize = resizeCanvas;
        //window.onmousemove = mouseMove;
        resizeCanvas();
    }

    function resizeCanvas() {
        canvas.style.width = '100%';
        canvas.style.height= '100%';

        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        // canvasHalfWidth = Math.round(canvas.offsetWidth/2);
        // canvasHalfHeight = Math.round(canvas.offsetHeight/2);

        sceneManager.onWindowResize()
    }

    // function mouseMove({screenX, screenY}) {
    //     sceneManager.onMouseMove(screenX-canvasHalfWidth, screenY-canvasHalfHeight);
    // }

    function render(time) {
        requestAnimationFrame(render);
        sceneManager.update();
    }


    let modal = document.getElementById('myModal');

    function init( ) {

        //
        // document.getElementById("btnAgenda").addEventListener('click', AddInputAgenda, false);
        // document.getElementById("btn-navigation").addEventListener('mousedown', mouseDown, false);
        // document.getElementById("btn-navigation").addEventListener('mouseup', mouseUp, false);
        // document.getElementById("btnRecherche").addEventListener('mouseup', BtnRecherche, false);
        //
        //
        //
        // // Get the <span> element that closes the modal
        // const closeModal = document.getElementsByClassName("close")[0];
        // closeModal.addEventListener('mousedown',CloseModal, false);
        //
        // //click
        // document.addEventListener('mousedown', onDocumentMouseDown , false);
        // document.addEventListener('touchstart', onDocumentTouchStart, false);


    }

}