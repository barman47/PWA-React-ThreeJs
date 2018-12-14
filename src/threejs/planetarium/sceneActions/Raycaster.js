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

export function onDocumentMouseDown(optsThree, mouseX, mouseY, updateOptsThree) {


    //console.log("evenet touche : " + event.touches[0].clientX )
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();


    //event.preventDefault();
    mouse.x = (mouseX / optsThree.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(mouseY / optsThree.renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, optsThree.camera);
    let intersects = raycaster.intersectObjects(optsThree.objectsPlanets, true);


    if (intersects.length > 0) {
        let namePlanet = intersects[0].object.parent.name;
        switchValue(namePlanet, optsThree, currentObj);
        updateOptsThree(optsThree);

    }


}


let accueil = true;
let earthExist = false;

// {camera, modal, scene, controls}
export function switchValue(choix, optsThree, currentObj) {

    // fermer le modal quand on appui sur la navette
    // if (modal.style.display = "block") {
    //     modal.style.display = "none"
    // }


    // retour sur la planete terre
    if (choix == "Back") {

        optsThree.controls.autoRotate = false;

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

            Navigation.unfocusTarget(optsThree.controls);

            setTimeout(function () {
                Navigation.unfocusZoom(directX, directZ, optsThree.camera)
            }, 500);
            console.log(choix + " : Retour a la casa !  ")

            if (optsThree.camera.position.x < 0.15 || optsThree.camera.position.z < 0.15) {
                setTimeout(function () {

                    if (earthExist) {
                        let earth = optsThree.scene.getObjectByName("Earth");
                        optsThree.scene.remove(earth)
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

        let planet = optsThree.scene.getObjectByName(choix);

        currentObj = planet; // pour gerer la direction de la camera quand on revient sur terreconsole.log("e.currentPlanet : " + currentObj )

        // create and dispatch the event
        let event = new CustomEvent("changeCurrentObj",
            {detail: currentObj}
        );
        window.dispatchEvent(event);


        // test pour savoir si on clique sur la planete sur laquelle nous sommes deja
        let controlX = optsThree.controls.target.x;
        let controlZ = optsThree.controls.target.z;

        let planetX = planet.position.x
        let planetZ = planet.position.z;


        // si on clique sur une autre planetes
        if (controlX !== planetX || controlZ !== planetZ) {
            console.log("Direction la planete " + choix + " ! ")
            Navigation.focusTarget(planet, optsThree.controls);

            setTimeout(function () {
                Navigation.focusZoom(planet, optsThree.camera)
                if (!earthExist) {
                    EarthPlanet(optsThree.scene);
                    earthExist = true
                }

            }, 500);

            optsThree.controls.autoRotate = true;
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
