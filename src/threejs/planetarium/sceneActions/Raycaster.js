import THREE from './../../three';
import * as Navigation from '../sceneActions/Navigation'
import EarthPlanet from './../sceneSubjects/Earth'

let currentObj = null

export function onDocumentMouseDown(mouseX, mouseY, updateOptsThree, optsThreeGlobal) {


    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();


    //event.preventDefault();
    mouse.x = (mouseX / optsThreeGlobal.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(mouseY / optsThreeGlobal.renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, optsThreeGlobal.camera);
    let intersects = raycaster.intersectObjects(optsThreeGlobal.objectsPlanets, true);


    if (intersects.length > 0) {
        let namePlanet = intersects[0].object.parent.name;
        switchValue(namePlanet, optsThreeGlobal, currentObj, updateOptsThree);
    }

}


let earthExist = false;

export function switchValue(choix, optsThreeGlobal, currentObj, updateOptsThree) {


    // retour sur la planete terre
    if (choix === "Back" && !optsThreeGlobal.accueil) {


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

                    let earth = optsThreeGlobal.scene.getObjectByName("Earth");
                    optsThreeGlobal.scene.remove(earth)
                    // console.log("- Suppr : " + earth.name)

                }, 3000);
            }

            console.log(" addBtnAccueilBack :" + optsThreeGlobal.accueil)
            optsThreeGlobal.accueil = !optsThreeGlobal.accueil;

            updateOptsThree(optsThreeGlobal);


        }


    } else {

        switch (choix) {
            case "Saturne":
                choix = "Saturn"
                break;
            case "Mercure":
                choix = "Mercury"
                break;
            case "Vénus":
                choix = "Venus"
                break;
        }

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
                Navigation.focusZoom(planet, optsThreeGlobal.camera)

                EarthPlanet(optsThreeGlobal.scene);
            }, 500);

            optsThreeGlobal.controls.autoRotate = true;
            console.log("--------- optsThreeGlobal.accueil = " + optsThreeGlobal.accueil)
            if (optsThreeGlobal.accueil) {
                window.dispatchEvent(new Event('btnToParachute'));
                optsThreeGlobal.accueil = !optsThreeGlobal.accueil;
            }

            updateOptsThree(optsThreeGlobal);

            // si on clique sur la meme planetes
        } else {
            console.log("Je suis deja sur la planete en question ! ")
        }
    }

}

