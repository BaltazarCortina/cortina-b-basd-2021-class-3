var fieldNames = ['name', 'email', 'password', 'repeat-password', 'age', 'phone', 'address', 'city', 'postal-code', 'id'];
var fields = [];
var helloMsg = document.getElementById('hello-msg');
var fullName = document.getElementById('name');
var form = document.getElementById('subscribe-form');
var submitResult = document.querySelector('.submit-result');
var password = '';

for (let i = 0; i < fieldNames.length; i++) {
    fields.push(document.getElementById(fieldNames[i]));
    fields[i].addEventListener('blur', validate);
}

fullName.addEventListener('keyup', helloUser);
form.addEventListener('submit', submitForm);

function validate(e) {
    var validationResult;
    switch (e.target.id) {
        case 'name':
            validationResult = validateName(e.target.value);
            break;
        case 'email':
            validationResult = validateEmail(e.target.value);
            break;
        case 'password':
            validationResult = validatePassword(e.target.value);
            password = e.target.value;
            validatePasswordChange(password);
            break;
        case 'repeat-password':
            validationResult = validateRepeatPassword(e.target.value, password);
            break;
        case 'age':
            validationResult = validateAge(e.target.value);
            break;
        case 'phone':
            validationResult = validatePhone(e.target.value);
            break;
        case 'address':
            validationResult = validateAddress(e.target.value);;
            break;
        case 'city':
            validationResult = validateCity(e.target.value);
            break;
        case 'postal-code':
            validationResult = validatePostalCode(e.target.value);
            break;
        case 'id':
            validationResult = validateId(e.target.value);
            break;
        default:
            break;
    }
    if (validationResult[0]) {
        e.target.nextElementSibling.innerHTML = validationResult[1];
        e.target.classList.toggle('error');
        e.target.addEventListener('focus', correcting);
    }
}

function correcting(e) {
    e.target.nextElementSibling.innerHTML = '';
    e.target.classList.toggle('error');
    e.target.removeEventListener('focus', correcting)
}

function submitForm(e) {
    e.preventDefault();
    let errors = document.querySelectorAll('.error');
    let msg = '';
    if (errors.length === 0) {
        let title = '<h2>The form was submitted successfully!</h2>';
        for (let i = 0; i < fields.length; i++) {
            msg += `<li><span class="bold">${fields[i].getAttribute('name')}:</span> ${fields[i].value}</li>`;
        }
        insertMsg(title, msg);
    } else {
        let msg = 'There are still errors in the form!';
        for (let i = 0; i < errors.length; i++) {
            msg += '\n-' + errors[i].nextElementSibling.innerHTML;
        }
        alert(msg);
    }
}

function helloUser(e) {
    helloMsg.innerHTML = 'Hello ' + e.target.value + '!';
}

function insertMsg(title, msg) {
    let close = '<span class="material-icons modal-close-btn">close</span>'
    submitResult.firstElementChild.innerHTML = close + title + '<ul>' + msg + '</ul>';
    submitResult.classList.toggle('hidden');
    
    window.addEventListener('click', closeModal);
}

function closeModal(e) {
    let modal = document.querySelector('.submit-result');
    let closeBtn = document.querySelector('.modal-close-btn');
    if (e.target === modal || e.target === closeBtn) {
        submitResult.classList.toggle('hidden');
        submitResult.firstElementChild.innerHTML = '';

        window.removeEventListener('click', check);
    }
}


/********************Testing functions********************/

var validInputs = ['full name', 'mail@mail.com', 'qweqweqwe2', 'qweqweqwe2', 24, 12345678, 'address 12', 'cityname', 'code1', 12345678];

fullName.addEventListener('blur', fillForm);

function fillForm(e) {
    if (e.target.value === 'test') {
        for (let i = 0; i < fields.length; i++) {
            fields[i].value = validInputs[i];
        }
        correcting(e);
        helloUser(e);
    }
}