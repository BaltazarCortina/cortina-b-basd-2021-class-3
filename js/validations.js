function validateName(value) {
    let validFormat = /^([A-Za-z]+( [A-Za-z]+)+)$/;
    let error = false;
    let errorMsg;
    if (value.length < 6) {
        error = true;
        errorMsg = 'The name must be at least 6 letters long!';
    } else if (!value.includes(' ')) {
        error = true;
        errorMsg = 'The name must contain a blank space!';
    } else if (!validFormat.test(value)) {
        error = true;
        errorMsg = 'The name can only contain letters!';
    }
    return [error, errorMsg];
}

function validateEmail(value) {
    let validFormat = /^([\w.\-+/!%]{1,64}|"[\w. ]{1,62}")@[0-9a-zA-Z\-]+(\.[a-zA-Z]+)*$/;
    let error = false;
    let errorMsg;
    if (value.length < 5) {
        error = true;
        errorMsg = 'The email must be at least 5 characters long!';
    } else if (!value.includes('@')) {
        error = true;
        errorMsg = 'The email must include @!';
    } else if (!validFormat.test(value)) {
        error = true;
        errorMsg = 'Enter a valid email!';
    }
    return [error, errorMsg];
}

function validatePassword(value) {
    let validFormat = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    let includeNumber = /([0-9])+/;
    let includeLetter = /([A-Za-z])+/;
    let error = false;
    let errorMsg;
    if (value.length < 8) {
        error = true;
        errorMsg = 'The password must be at least 8 characters long!';
    } else if (!includeLetter.test(value)) {
        error = true;
        errorMsg = 'The password must contain at least a letter!';
    } else if (!includeNumber.test(value)) {
        error = true;
        errorMsg = 'The password must contain at least a number!';
    } else if (!validFormat.test(value)) {
        error = true;
        errorMsg = 'The password can only contain numbers and letters!';
    }
    return [error, errorMsg];
}

function validatePasswordChange(password) {
    let repeatPassword = document.getElementById('repeat-password');
    let errorMsg = 'The passwords must match!';
    if (password != repeatPassword.value && repeatPassword.value != '') {
        if (!repeatPassword.classList.contains('error')) {
            repeatPassword.nextElementSibling.innerHTML = errorMsg;
            repeatPassword.classList.toggle('error');
            repeatPassword.addEventListener('focus', correcting);
        }
    } else {
        if (repeatPassword.classList.contains('error')) {
            repeatPassword.nextElementSibling.innerHTML = '';
            repeatPassword.classList.toggle('error');
            repeatPassword.removeEventListener('focus', correcting);
        }
    }
}

function validateRepeatPassword(value, password) {
    let error = false;
    let errorMsg;
    if (value != password) {
        error = true;
        errorMsg = 'The passwords must match!';
    }
    return [error, errorMsg];
}

function validateAge(value) {
    let error = false;
    let errorMsg;
    let positiveNumberResult = validatePositiveNumber(value, 'Age', 1, 3);
    if (positiveNumberResult[0]) {
        error = true;
        errorMsg = positiveNumberResult[1];
    } else if (value < 18) {
        error = true;
        errorMsg = 'You must be over 18 to subscribe!';
    } else if (value > 120) {
        error = true;
        errorMsg = 'Enter a valid age!';
    }
    return [error, errorMsg];
}

function validatePhone(value) {
    let error = false;
    let errorMsg;
    let positiveNumberResult = validatePositiveNumber(value, 'Phone number', 7);
    if (positiveNumberResult[0]) {
        error = true;
        errorMsg = positiveNumberResult[1];
    }
    return [error, errorMsg];
}

function validateId(value) {
    let error = false;
    let errorMsg;
    let positiveNumberResult = validatePositiveNumber(value, 'ID', 7, 8);
    if (positiveNumberResult[0]) {
        error = true;
        errorMsg = positiveNumberResult[1];
    }
    return [error, errorMsg];
}

function validatePositiveNumber(number, fieldName, minLength = 0, maxLength = Infinity) {
    let validFormat = /^([0-9]+)$/;
    let error = false;
    let errorMsg;
    if (number < 0) {
        error = true;
        errorMsg = `${fieldName} must be a positive number!`;
    } else if (!validFormat.test(number)) {
        error = true;
        errorMsg = `${fieldName} can only contain numbers!`;
    } else if (number.toString().length < minLength) {
        error = true;
        errorMsg = `${fieldName} must be at least ${minLength} digits long!`;
    } else if (number.toString().length > maxLength) {
        error = true;
        errorMsg = `${fieldName} must be at most ${maxLength} digits long!`;
    }
    return [error, errorMsg];
}