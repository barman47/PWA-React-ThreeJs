import {API_ROOT} from "../config/config";


export function Inscription(userToCreate) {
    return fetch(`${API_ROOT}/api/inscriptionapp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify(
            userToCreate
        ),
    });
}

export function EnvoieQuestion(id, reply) {
    return fetch(`${API_ROOT}/api/envoiereponsequestionfaq/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify(
            reply
        ),
    });
}

export function SupprimerQuestion(idFaq) {
    return fetch(`${API_ROOT}/api/supprimerquestion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify (
            idFaq
        ),
    });
}

export function SupprimerPhoto(idPublication) {
    return fetch(`${API_ROOT}/api/deletepublicationimageapressignalement`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify (
            idPublication
        ),
    });
}

export function SupprimerCommentaire(comments) {
    return fetch(`${API_ROOT}/api/supprimercommentaireajouter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify (
            comments
        ),
    });
}


export function SupprimerSignalement(idPublication) {
    return fetch(`${API_ROOT}/api/supprimersignalement`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify (
            idPublication
        ),
    });
}

export function EnvoieNotif(token) {
    return fetch(`${API_ROOT}/api/fcmToken/${token}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
    });
}

export function EnvoieAvertissement(idMembre, niveauAvertissement) {
    return fetch(`${API_ROOT}/api/setniveauavertissement`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify ({
                idMembre,
                niveauAvertissement
            }
        ),
    });
}

