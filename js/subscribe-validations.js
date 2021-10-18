var fieldNames = ['name', 'email', 'password', 'repeat-password', 'age', 'phone', 'address', 'city', 'postal-code', 'id'];
var fields = [];
var fullName = document.getElementById('name');
var helloMsg = document.getElementById('hello-msg');
var form = document.getElementById('subscribe-form');
var password = '';

/*
var fullName = document.getElementById('name');
var email = document.getElementById('email');
var password = document.getElementById('password');
var repeatPassword = document.getElementById('repeat-password');
var age = document.getElementById('age');
var phone = document.getElementById('phone');
var address = document.getElementById('address');
var city = document.getElementById('city');
var postalCode = document.getElementById('postal-code');
var id = document.getElementById('id');
*/

for (let i = 0; i < fieldNames.length; i++) {
    fields.push(document.getElementById(fieldNames[i]));
    fields[i].addEventListener('blur', validate);
}

fullName.addEventListener('keyup', helloUser);
form.addEventListener('submit', submitForm);

// fullName.addEventListener('blur', validate);

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

        console.log('validate')
        
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
    console.log('submit');
    let errors = document.querySelectorAll('.error');
    if (errors.length === 0) {
        let msg = 'The form was submitted successfully!\nThe information entered is:';
        for (let i = 0; i < fields.length; i++) {
            msg += '\n-' + fields[i].getAttribute('name') + ': ' + fields[i].value;
        }
        alert(msg);
    } else {
        let msg = 'There are still errors in the form!';
        for (let i = 0; i < errors.length; i++) {
            msg += '\n-' + errors[i].nextElementSibling.innerHTML;
        }
        alert(msg);
    }
}

function helloUser(e) {
    helloMsg.innerHTML = 'Hello ' + e.target.value;
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