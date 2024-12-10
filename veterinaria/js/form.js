// Função para calcular a distância entre dois pontos (Haversine)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Retorna a distância em metros
}

// Função para validar o acesso ao formulário com base na distância
function validarAcesso() {
    const urlParams = new URLSearchParams(window.location.search);
    const latGerador = parseFloat(urlParams.get("latGerador"));
    const lonGerador = parseFloat(urlParams.get("lonGerador"));

    // Verifica se as coordenadas do gerador são válidas
    if (isNaN(latGerador) || isNaN(lonGerador)) {
        alert("As coordenadas do gerador não foram encontradas ou são inválidas. Verifique a URL.");
        return;
    }

    // Obtém a localização do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latUsuario = position.coords.latitude;
                const lonUsuario = position.coords.longitude;

                // Calcula a distância entre o gerador e o usuário
                const distancia = calcularDistancia(
                    latGerador,
                    lonGerador,
                    latUsuario,
                    lonUsuario
                );

                // Se a distância for maior que 50 metros, exibe o formulário, senão bloqueia
                if (distancia <= 50) {
                    document.getElementById("authForm").style.display = "block";
                    document.getElementById("distanceError").style.display = "none";
                } else {
                    document.getElementById("authForm").style.display = "none";
                    document.getElementById("distanceError").style.display = "block";
                }
            },
            (error) => {
                alert("Erro ao obter sua localização. Por favor, permita o acesso ao GPS.");
            },
            { enableHighAccuracy: true }
        );
    } else {
        alert("Seu navegador não suporta geolocalização.");
    }
}

// Função para verificar se o usuário já tentou submeter o formulário
function checkFormSubmission() {
    const isBlocked = localStorage.getItem('formSubmitted');
    const lastSubmitTime = localStorage.getItem('lastSubmitTime');
    const currentTime = new Date().getTime();

    if (isBlocked && lastSubmitTime) {
        const timeElapsed = currentTime - lastSubmitTime;
        const timeLimit = 2 * 60 * 1000; // 2 minutos em milissegundos

        if (timeElapsed >= timeLimit) {
            localStorage.removeItem('formSubmitted');
            localStorage.removeItem('lastSubmitTime');
            document.getElementById('formBlocked').style.display = 'none';
            document.getElementById('authForm').style.display = 'block';
        } else {
            document.getElementById('formBlocked').style.display = 'block';
            document.getElementById('authForm').style.display = 'none';
        }
    }
}

// Função para bloquear o formulário após a primeira submissão
function blockForm() {
    const currentTime = new Date().getTime();
    localStorage.setItem('formSubmitted', 'true');
    localStorage.setItem('lastSubmitTime', currentTime);
    document.getElementById('formSuccess').style.display = 'block';
    document.getElementById('authForm').style.display = 'none'; // Esconde o formulário
}
// Chama a função para verificar se o usuário foi bloqueado ou se o formulário deve ser liberado
checkFormSubmission();

// Chama a função de validação de localização
validarAcesso();



// Validação e envio do formulário
document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio normal do formulário

    // Limpa mensagens de erro anteriores
    clearErrors();

    let isValid = true;

    // Verifica se o nome está vazio
    const nome = document.getElementById('nome').value;
    if (nome.trim() === '') {
        isValid = false;
        document.getElementById('nomeError').textContent = "O nome é obrigatório!";
    }

    // Verifica se a turma está preenchida
    const turma = document.getElementById('turma').value;
    if (turma.trim() === '') {
        isValid = false;
        document.getElementById('turmaError').textContent = "A turma é obrigatória!";
    }

    // Verifica se o turno foi selecionado
    const turno = document.getElementById('turno').value;
    if (turno === '') {
        isValid = false;
        document.getElementById('turnoError').textContent = "O turno deve ser selecionado!";
    }

    // Se o formulário for válido, bloqueia o envio e exibe uma mensagem de sucesso
    if (isValid) {
        blockForm();
    }
});

// Função para limpar mensagens de erro
function clearErrors() {
    document.getElementById('nomeError').textContent = '';
    document.getElementById('rgmError').textContent = '';
    document.getElementById('turmaError').textContent = '';
    document.getElementById('turnoError').textContent = '';
    document.getElementById('formSuccess').style.display = "none";
}