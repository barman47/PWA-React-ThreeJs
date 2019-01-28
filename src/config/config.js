let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "herokuapp.com") {
    backendHost = "https://open-stars.herokuapp.com/";
} else {
    // backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';
    backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://192.168.1.25:8080'; // mac nathan
}

export const API_ROOT = backendHost;
