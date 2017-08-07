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
