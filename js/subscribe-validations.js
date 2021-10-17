var fieldNames = ['name', 'email', 'password', 'repeat-password', 'age', 'phone', 'address', 'city', 'postal-code', 'id'];
var fields = [];
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
            validationResult = [false];
            break;
        case 'city':
            validationResult = [false];
            break;
        case 'postal-code':
            validationResult = [false];
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