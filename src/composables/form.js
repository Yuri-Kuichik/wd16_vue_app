export function switchPasswordType(passwordFieldType) {
    return passwordFieldType === 'password' ? 'text' : 'password';
}

export async function sendForm(url, dataToSend)
{
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
}

export function isFormHasEmptyField(fieldsToCheck) {
    return fieldsToCheck.some(field => !field.toString().length);
}