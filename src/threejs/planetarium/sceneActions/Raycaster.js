import THREE from './../../three';
import * as Navigation from '../sceneActions/Navigation'




//
// export function onDocumentTouchStart(event, objectsPlanets, renderer, camera, modal, scene, controls) {
//
//     //event.preventDefault();
//
//     event.clientX = event.touches[0].clientX;
//     event.clientY = event.touches[0].clientY;
//     onDocumentMouseDown(event);
// }

export function onDocumentMouseDown(objectsPlanets, renderer, camera, modal, scene, controls, mouseX, mouseY, canvas, onLocalisationClick) {


    //console.log("evenet touche : " + event.touches[0].clientX )
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    //event.preventDefault();
    mouse.x = (mouseX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(mouseY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(objectsPlanets, true);

    console.log("mouse X: " + mouse.x + " - mouse Y: " + mouse.y)
    console.log("camera X: " + camera.position.x + " - camera Y: " + camera.position.y)
    console.log('intersects : ' + intersects.length )




    if (intersects.length > 0) {

        let namePlanet = intersects[0].object.parent.name
        switchValue(namePlanet,objectsPlanets, renderer, camera, modal, scene, controls, onLocalisationClick);

    }

}

let currentObj = null
let accueil = true;
let earthExist = false;

function switchValue(choix, objectsPlanets, renderer, camera, modal, scene, controls, onLocalisationClick) {


    // fermer le modal quand on appui sur la navette
    // if (modal.style.display = "block") {
    //     modal.style.display = "none"
    // }

    if (choix == "Back") {

        controls.autoRotate = false;

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

            Navigation.unfocusTarget(controls);

            setTimeout(function () {
                Navigation.unfocusZoom(directX, directZ, camera)
            }, 500);
            console.log(choix + " : Retour a la casa !  ")

            if (camera.position.x < 0.15 || camera.position.z < 0.15) {
                setTimeout(function () {

                    if (earthExist) {
                        console.log("avant earthExist :" + earthExist)
                        let earth = scene.getObjectByName("Earth");
                        scene.remove(earth)
                        console.log("- Suppr : " + earth.name)
                        earthExist = false
                        console.log("apres earthExist :" + earthExist)
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

        let planet = scene.getObjectByName(choix);
        currentObj = planet; // pour gerer la direction de la camera quand on revient sur terre

        // test pour savoir si on clique sur la planete sur laquelle nous sommes deja
        let controlX = controls.target.x;
        let controlZ = controls.target.z;

        let planetX = planet.position.x
        let planetZ = planet.position.z;


        // si on clique sur une autre planetes
        if (controlX !== planetX || controlZ !== planetZ) {
            console.log("Direction la planete " + choix + " ! ")
            Navigation.focusTarget(planet, controls);

            setTimeout(function () {
                Navigation.focusZoom(planet, camera)
                if (!earthExist) {
                    //EarthPlanet();
                    console.log("Avant earthExist :" + earthExist)
                    earthExist = true
                    console.log("Apres earthExist :" + earthExist)
                }

            }, 500);

            controls.autoRotate = true;
            if (accueil) {
                window.dispatchEvent(new Event('localisationClick'));
                // let value = this.Context;
                // value.toggleAccueil();

                //addBtnPhoto()
                accueil = false;
            }

            // si on clique sur la meme planetes
        } else {
            console.log("Je suis deja sur la planete en question ! ")
        }
    }

}
