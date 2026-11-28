const form = document.querySelector('#mortgage-form');
const amount = document.querySelector('#amount');
const amountError = document.querySelector('#amount-error');
const term = document.querySelector('#term');
const termError = document.querySelector('#term-error');
const rate = document.querySelector('#rate');
const rateError = document.querySelector('#rate-error');
const typeSet = document.querySelector('.calculator__type');
const typeError = document.querySelector('#type-error');

form.addEventListener('submit', calculation);

function calculation(e){
    e.preventDefault();

    const data = new FormData(form);
    const validations = [
        validationNumber(data, 'amount', amount, amountError),
        validationNumber(data, 'term', term, termError),
        validationNumber(data, 'rate', rate, rateError),
        validation(data, 'type', typeSet, typeError)
    ];

    if(!validations.every(v=>v===true)){
        form.querySelector('[aria-invalid="true"] input, [aria-invalid="true"]')?.focus();
        return;
    }
}

function validationNumber(data, value, input, error){
    const inputValue = data.get(value).trim();
    if(inputValue === '' || isNaN(inputValue) || Number(inputValue) <= 0){
        setError(input, error, true);
        return false;
    }else{
        setError(input, error, false);
        return true;
    }
}

function validation(data, value, input, error){
    const inputValue = data.get(value);
    if(inputValue === null || inputValue.trim() === ''){
        setError(input, error, true);
        return false;
    }else{
        setError(input, error, false);
        return true;
    }
}

function setError(input, error, hasError){
    input.setAttribute('aria-invalid', String(hasError));
    error.hidden = !hasError;
}