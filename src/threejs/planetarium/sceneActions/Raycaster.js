import THREE from './../../three';
import * as Navigation from '../sceneActions/Navigation'
import EarthPlanet from './../sceneSubjects/Earth'


//
// export function onDocumentTouchStart(event, objectsPlanets, renderer, camera, modal, scene, controls) {
//
//     //event.preventDefault();
//
//     event.clientX = event.touches[0].clientX;
//     event.clientY = event.touches[0].clientY;
//     onDocumentMouseDown(event);
// }


let currentObj = null

export function onDocumentMouseDown(mouseX, mouseY, updateOptsThree, optsThreeGlobal) {


    //console.log("evenet touche : " + event.touches[0].clientX )
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    console.log("optsThreeGlobal : ", optsThreeGlobal)

    //event.preventDefault();
    mouse.x = (mouseX / optsThreeGlobal.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(mouseY / optsThreeGlobal.renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, optsThreeGlobal.camera);
    let intersects = raycaster.intersectObjects(optsThreeGlobal.objectsPlanets, true);

    //console.log("position camera : " + optsThreeGlobal.camera.position.x + " - " + optsThreeGlobal.camera.position.y)
    if (intersects.length > 0) {
        let namePlanet = intersects[0].object.parent.name;
        switchValue(namePlanet, optsThreeGlobal, currentObj);
        updateOptsThree(optsThreeGlobal);

    }


}

let focusZoomVal = null;
let accueil = true;
let earthExist = false;

// {camera, modal, scene, controls}
export function switchValue(choix, optsThreeGlobal, currentObj) {

    // fermer le modal quand on appui sur la navette
    // if (modal.style.display = "block") {
    //     modal.style.display = "none"
    // }


    // retour sur la planete terre
    if (choix === "Back") {

        optsThreeGlobal.controls.autoRotate = false;

        if (currentObj != null) {

            let objX = currentObj.position.x
            let objZ = currentObj.position.z;

            let directX;
            let directZ;

            if (objX > 0) {
                directX = -0.1;
            } else {
                directX = 0.1;
            }

            if (objZ > 0) {
                directZ = -0.1;
            } else {
                directZ = 0.1;
            }

            Navigation.unfocusTarget(optsThreeGlobal.controls);

            setTimeout(function () {
                Navigation.unfocusZoom(directX, directZ, optsThreeGlobal.camera)
            }, 500);
            console.log(choix + " : Retour a la casa !  ")

            if (optsThreeGlobal.camera.position.x < 0.15 || optsThreeGlobal.camera.position.z < 0.15) {
                setTimeout(function () {

                    if (earthExist) {
                        let earth = optsThreeGlobal.scene.getObjectByName("Earth");
                        optsThreeGlobal.scene.remove(earth)
                        // console.log("- Suppr : " + earth.name)
                        earthExist = false
                    }
                }, 3000);
            }


            if (!accueil) {
                console.log(" addBtnAccueilBack :" + accueil)
                //addBtnAccueilBack()
                //deleteBtnPhoto();
                accueil = true;
            }

        }

    } else {

        // direction la planet selectionné

        let planet = optsThreeGlobal.scene.getObjectByName(choix);

        currentObj = planet; // pour gerer la direction de la camera quand on revient sur terreconsole.log("e.currentPlanet : " + currentObj )

        // create and dispatch the event
        let event = new CustomEvent("changeCurrentObj",
            {detail: currentObj}
        );
        window.dispatchEvent(event);


        // test pour savoir si on clique sur la planete sur laquelle nous sommes deja
        let controlX = optsThreeGlobal.controls.target.x;
        let controlZ = optsThreeGlobal.controls.target.z;

        let planetX = planet.position.x
        let planetZ = planet.position.z;


        // si on clique sur une autre planetes
        if (controlX !== planetX || controlZ !== planetZ) {
            console.log("Direction la planete " + choix + " ! ")

            Navigation.focusTarget(planet, optsThreeGlobal.controls);

            setTimeout(function () {
                focusZoomVal = Navigation.focusZoom(planet, optsThreeGlobal.camera)
                if (!earthExist) {
                    EarthPlanet(optsThreeGlobal.scene);
                    earthExist = true
                }

            }, 500);

            console.log(" controls-target : " + optsThreeGlobal.controls.target.x)
            optsThreeGlobal.controls.autoRotate = true;
            console.log(" optsThreeGlobal.controls.autoRotate : " + optsThreeGlobal.controls.autoRotate)
            if (accueil) {
                window.dispatchEvent(new Event('btnToParachute'));

                //addBtnPhoto()
                accueil = false;
            }

            // si on clique sur la meme planetes
        } else {
            console.log("Je suis deja sur la planete en question ! ")
        }
    }

}

