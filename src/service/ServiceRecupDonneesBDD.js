import {API_ROOT} from "../config/config";

export function fetchLogin(email, password) {
    return fetch(`${API_ROOT}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });
}


export function RecupUsers() {
    return fetch(`${API_ROOT}/api/all`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        }
    })
}


export function RecupUser(pseudo) {
    return fetch(`${API_ROOT}/api/user/${pseudo}`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        }
    })
}

export function CompteUtilisateur(familyName, name) {
    return fetch(`${API_ROOT}/api/compteutilisateurviarecherche`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify({
            familyName, name}),
    });
}


export function RecupCommentPubliTele(idPicturePhoto) {
    return fetch(`${API_ROOT}/api/recuperationcomment`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify({
            idPublication: idPicturePhoto
        }),
    });

}


export function RecupComments(idActu) {
    return fetch(`${API_ROOT}/api/recuperationcommentstatus`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify({
            idFilActualite: idActu
        })
    })
}


export function RecupNewQuestionFAQ() {
    return fetch(`${API_ROOT}/api/recuperationquestionpourreponse`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
    })
}

export function RecupOldQuestionFAQ() {
    return fetch(`${API_ROOT}/api/recuperationquestionreponsefaq`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
    })
}

export function RecupPhotosSignaler() {
    return fetch(`${API_ROOT}/api/recupphotosignaler`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
    })
}

export function RecupNiveauAvertissement(idMembre) {
    return fetch(`${API_ROOT}/api/niveauavertissement?user=${idMembre}`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
    })
}

