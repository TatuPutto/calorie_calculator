var validUsername = false;
var validPassword = false;
var timeout = null;

function showLabel(textInput) {
    var label = textInput.previousElementSibling;
    label.className = 'popup-label input-focused';
    textInput.placeholder = "";
}

function hideLabel(inputNum) {
    var textInput = document.getElementsByTagName('input')[inputNum];
    var label = textInput.previousElementSibling;
    label.className = 'popup-label input-unfocused';

    setTimeout(function () {
        var placeholderText = inputNum === 0 ? 'Käyttäjätunnus' : 'Salasana';
        textInput.placeholder = placeholderText;
    }, 200)
}

function checkUsernameAvailability(e) {
    var usernameToCheck = e.value;
    var userNameValidityindicator = document.getElementById('username-validity-indicator');
    userNameValidityindicator.className = 'loading';

    if(usernameToCheck.length === 0) {
        e.className = ' ';
        userNameValidityindicator.className = ' ';
        return;
    }

    if(timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
        fetch(`/username-available/${usernameToCheck}`, {credentials: 'same-origin'})
            .then((res) => {
                if(res.status === 200) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            })
            .then(() => createValidUsernameNotification(e, userNameValidityindicator))
            .catch(() => createInvalidUsernameNotification(e, userNameValidityindicator));
    }, 500);
}

function createValidUsernameNotification(input, indicator) {
    var notification = document.getElementById('invalid-username-notification');

    if(notification) {
        notification.parentNode.removeChild(notification);
    }

    input.className = 'valid-input';
    indicator.className = 'valid-input';
}

function createInvalidUsernameNotification(input, indicator) {
    if(!document.getElementById('invalid-username-notification')) {
        var notAvailableNotification = document.createElement('div');
        notAvailableNotification.id = 'invalid-username-notification';
        notAvailableNotification.className = 'invalid-input-notification';
        var notifactionText = document.createTextNode('Käyttäjätunnus on jo käytössä.');
        notAvailableNotification.appendChild(notifactionText);
        input.parentNode.insertBefore(notAvailableNotification, input.nextSibling);
    }

    input.className = 'invalid-input';
    indicator.className = 'invalid-input';
}

function checkPasswordValidity(e) {
    var passwordToCheck = e.value;

    if(passwordToCheck.length >= 8 && /[0-9]/g.test(passwordToCheck)) {
        return createValidPasswordNotification(e);
    } else {
        return createInvalidPasswordNotification(e);
    }
}

function createValidPasswordNotification(input) {
    var notification = document.getElementById('invalid-password-notification');

    if(notification) {
        notification.parentNode.removeChild(notification);
    }

    input.className = 'valid-input';
    document.getElementById('password-validity-indicator').className = 'valid-input';
}

function createInvalidPasswordNotification(input) {
    if(!document.getElementById('invalid-password-notification')) {
        var invalidPasswordNotification = document.createElement('div');
        invalidPasswordNotification.id = 'invalid-password-notification';
        invalidPasswordNotification.className = 'invalid-input-notification';
        var notifactionText = document.createTextNode(
            'Salasanan täytyy olla vähintään 8 merkkiä pitkä ja sisältää yksi numero.'
        );
        invalidPasswordNotification.appendChild(notifactionText);
        input.parentNode.insertBefore(invalidPasswordNotification, input.nextSibling);
    }

    input.className = 'invalid-input';
    document.getElementById('password-validity-indicator').className = 'invalid-input';
}


function areCookiesAccepted() {
    var cookiesAllowed = checkIfCookiesAreAccepted();
    // create cookie disclaimer if cookies are not allowed
    if(!cookiesAllowed) {
        var cookieDisclaimer = document.createElement('div');
        var cookieDisclaimerP = document.createElement('p');
        var cookieDisclaimerText = document.createTextNode(
            'Sivusto käyttää evästeitä mahdollisimman hyvän ' +
            'käyttökokemuksen saavuttamiseksi. Jatkamalla sivuston ' +
            'käyttöä hyväksyt evästeiden käyttämisen.'
        );
        var acceptCookiePolicyButton = document.createElement('button');
        var acceptCookiePolicyText = document.createTextNode('Hyväksy');

        cookieDisclaimerP.appendChild(cookieDisclaimerText);
        acceptCookiePolicyButton.appendChild(acceptCookiePolicyText);
        acceptCookiePolicyButton.addEventListener('click', () => acceptCookiePolicy());
        cookieDisclaimer.appendChild(cookieDisclaimerP);
        cookieDisclaimer.appendChild(acceptCookiePolicyButton);
        cookieDisclaimer.className = 'cookie-disclaimer';
        document.body.appendChild(cookieDisclaimer);

        // disable actions until cookies are accepted
        var submitButton = document.getElementsByTagName('input')[2];
        submitButton.disabled = true;

        var anchors = document.getElementsByTagName('a');
        for(var i = 0; i < anchors.length; i++) {
            anchors[i].href = 'javascript:void(0);';
            anchors[i].className = 'disabled';
        }
    }
}

function checkIfCookiesAreAccepted() {
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split('=');
        var cookieName = cookie[0].trim();
        var cookieValue = cookie[1];

        if(cookieName == 'cookiesAccepted') {
            return cookieValue;
        }
    }
    return false;
}

function acceptCookiePolicy() {
    var element = document.getElementsByClassName('cookie-disclaimer')[0];
    element.style.display = 'none';
    var submitButton = document.getElementsByTagName('input')[2];
    submitButton.disabled = false;

    var anchors = document.getElementsByTagName('a');
    anchors[0].href = '/register';
    anchors[0].className = '';
    anchors[1].href = '/current-entry';
    anchors[1].className = '';

    fetch('/accept-cookies', {credentials: 'same-origin'});
}
