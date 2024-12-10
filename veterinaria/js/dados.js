const script_do_google = 'https://script.google.com/macros/s/AKfycbxf8lpkdaDAsSlr7A0-ZbozVGMEY5GzFOLj8NWxDx83swYRUUQXGdgo5Oye-qp7X9J9/exec';
const authForm = document.forms['formulario'];
const submitButton = document.getElementById('btnAutenticar');

// Evita múltiplos envios
let formSubmitted = false;

function submitHandler(e) {
    e.preventDefault();

    // Verifica se o formulário já foi enviado
    if (formSubmitted) {
        console.log('O formulário já foi enviado!');
        return;
    }

    formSubmitted = true; // Marca como enviado
    submitButton.disabled = true; // Desativa o botão após envio

    console.log('Início do envio do formulário'); // Depuração

    fetch(script_do_google, { method: 'POST', body: new FormData(authForm) })
        .then((response) => {
            console.log('Envio bem-sucedido');
            alert('Dados enviados com sucesso!');
            authForm.reset(); // Reseta o formulário após o envio
        })
        .catch((error) => {
            console.error('Erro no envio:', error);
        });
}

// Remove qualquer listener duplicado e adiciona o correto
authForm.removeEventListener('submit', submitHandler);
authForm.addEventListener('submit', submitHandler);
