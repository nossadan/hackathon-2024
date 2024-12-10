const usuariosAutorizados = {
    "usuario1": "senha123"
};

let latitudeUsuario, longitudeUsuario;
let qrCodeLinkGerado = false; // Variável para verificar se o link foi gerado

// Função para autenticar o usuário no login
function autenticarUsuario() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuariosAutorizados[usuario] === senha) {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

        navigator.geolocation.getCurrentPosition((position) => {
            latitudeUsuario = Math.round(position.coords.latitude * 1e6) / 1e6;
            longitudeUsuario = Math.round(position.coords.longitude * 1e6) / 1e6;
            console.log("Localização do gerador capturada:", latitudeUsuario, longitudeUsuario);

            if (!qrCodeLinkGerado) {
                gerarQRCode(); // Gera o QR Code apenas uma vez
                qrCodeLinkGerado = true;
            }
        }, (error) => {
            alert("Erro ao obter localização: " + error.message);
        }, { enableHighAccuracy: true });
    } else {
        alert("Usuário ou senha inválidos!");
    }
}

// Função para gerar QR Code com a localização do gerador
function gerarQRCode() {
    if (latitudeUsuario && longitudeUsuario) {
        const timestamp = Date.now(); // Gerar um identificador único
        const linkUnico = `${window.location.origin}/form.html?latGerador=${latitudeUsuario}&lonGerador=${longitudeUsuario}&token=${timestamp}`;
        console.log("Link do QR Code:", linkUnico);

        const qrCodeContainer = document.getElementById("qrcode");
        qrCodeContainer.innerHTML = ""; // Limpa o QR Code anterior

        new QRCode(qrCodeContainer, {
            text: linkUnico,
            width: 128,
            height: 128
        });

        document.getElementById("qrcodeContainer").style.display = "block";
    } else {
        alert("Localização do gerador não detectada. Tente novamente.");
    }
}

// Função para validar o acesso ao formulário
function validarAcesso() {
    const urlParams = new URLSearchParams(window.location.search);
    const latGerador = parseFloat(urlParams.get('latGerador'));
    const lonGerador = parseFloat(urlParams.get('lonGerador'));
    const timestamp = parseFloat(urlParams.get('token'));

    // Mostrar mensagem de "Calculando a distância"
    document.getElementById("calculando").style.display = "block";
    document.getElementById("acessoNegado").style.display = "none";
    document.getElementById("form").style.display = "none";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latUsuario = position.coords.latitude;
            const lonUsuario = position.coords.longitude;

            // Enviar a validação ao servidor
            fetch(`/validate-form?latGerador=${latGerador}&lonGerador=${lonGerador}&latUsuario=${latUsuario}&lonUsuario=${lonUsuario}&timestamp=${timestamp}`)
                .then(response => response.json())
                .then(data => {
                    // Esconder a mensagem "Calculando a distância"
                    document.getElementById("calculando").style.display = "none";

                    if (data.message === "Acesso permitido") {
                        document.getElementById("form").style.display = "block";
                        document.getElementById("acessoNegado").style.display = "none";
                    } else {
                        document.getElementById("form").style.display = "none";
                        document.getElementById("acessoNegado").style.display = "block";
                    }
                });
        }, error => {
            alert("Erro ao obter sua localização.");
        });
    } else {
        alert("Seu navegador não suporta geolocalização.");
    }
}