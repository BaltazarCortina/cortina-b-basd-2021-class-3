function validateName(value) {
    let error = false;
    let errorMsg;
    let stringValidationResult = validateString(value, 'Name', 6, 'onlyLetters', true);
    if (stringValidationResult[0]) {
        error = true;
        errorMsg = stringValidationResult[1];
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

function validateAddress(value) {
    let error = false;
    let errorMsg;
    let stringValidationResult = validateString(value, 'Address', 5, 'bothStrict', true);
    if (stringValidationResult[0]) {
        error = true;
        errorMsg = stringValidationResult[1];
    }
    return [error, errorMsg];
}

function validateCity(value) {
    let error = false;
    let errorMsg;
    let stringValidationResult = validateString(value, 'City', 3, 'onlyLetters');
    if (stringValidationResult[0]) {
        error = true;
        errorMsg = stringValidationResult[1];
    }
    return [error, errorMsg];
}

function validatePostalCode(value) {
    let error = false;
    let errorMsg;
    let stringValidationResult = validateString(value, 'Postal code', 3, 'bothOptional');
    if (stringValidationResult[0]) {
        error = true;
        errorMsg = stringValidationResult[1];
    }
    return [error, errorMsg];
}

function validateString(string, fieldName, minLength, format, space = false) {
    let validFormatOnlyLetters = /^([A-Za-z]+( [A-Za-z]+)?)$/;
    let validFormatBothOptional = /^([A-Za-z0-9]+( [A-Za-z0-9]+)?)$/;
    let validFormatBothStrict = /^(?=.*\d)(?=.*[a-zA-Z])(([a-zA-Z0-9]+\s?)+)$/;

    let error = false;
    let errorMsg;
    
    if (string.length < minLength) {
        error = true;
        errorMsg = `${fieldName} must be at least ${minLength} digits long!`;
    } else if (space && !string.includes(' ')) {
        error = true;
        errorMsg = `${fieldName} must contain a blank space!`;
    } else {
        switch (format) {
            case 'onlyLetters':
                if (!validFormatOnlyLetters.test(string)) {
                    error = true;
                    errorMsg = `${fieldName} can only contain letters!`;
                }
                break;
            case 'bothOptional':
                if (!validFormatBothOptional.test(string)) {
                    error = true;
                    errorMsg = `${fieldName} can only contain letters and numbers!`;
                }
                break;
            case 'bothStrict':
                if (!validFormatBothStrict.test(string)) {
                    error = true;
                    errorMsg = `${fieldName} must contain letters and numbers!`;
                }
                break;
            default:
                break;
        }
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