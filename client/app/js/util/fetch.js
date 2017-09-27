import 'whatwg-fetch';

var defaultParams = {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export function checkStatus(res) {
    if(res.ok) {
        return Promise.resolve(res);
    } else {
        throw res.status;
    }
}

export function readJson(responses) {
    return responses.json();
}

export function get(url) {
    return fetch(url, defaultParams);
}

export function post(url, content) {
    console.log(content);
    return fetch(url, {
        ...defaultParams,
        method: 'POST',
        body: JSON.stringify(content)
    });
}

export function put() {

}

export function patch(url, content) {
    return fetch(url, {
        ...defaultParams,
        method: 'PATCH',
        body: JSON.stringify(content)
    });
}

export function remove(url) {
    return fetch(url, {
        ...defaultParams,
        method: 'DELETE'
    });
}
