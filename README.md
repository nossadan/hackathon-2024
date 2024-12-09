# Funcionamento do Site #

O site foi projetado para uso acadêmico, permitindo que professores gerem QR Codes exclusivos para validar a presença de alunos ou controlar atividades. Ele combina tecnologias como APIs de geolocalização e QR Codes, garantindo que o acesso seja restrito a alunos dentro de um raio predefinido.
Fluxo de Funcionamento:

        - 1 Login de Professores:
	* O professor faz login no sistema para acessar as funcionalidades.
	
        - 2 Geração de QR Code:
        * O raio vai ser predefinido pela equipe de programadores.
        * O site gera o QR Code, associando-o às coordenadas atuais do professor capturadas pela API de geolocalização.

        - 3 Validação da Localização do Aluno:
        * O aluno escaneia o QR Code gerado pelo professor.
        * A API de localização do navegador captura as coordenadas do aluno.
        * O sistema calcula a distância entre o aluno e o professor.
        * Se o aluno estiver dentro do raio permitido, ele pode acessar o conteúdo associado ao QR Code (Um questionário/registro de presença).
        * Caso contrário, o aluno recebe a mensagem: “Você está fora do limite de acesso.”
	
	- 4 Tentativas Múltiplas pelo Aluno:
    	* Caso o aluno tente acessar o QR Code mais de uma vez, o sistema exibirá uma mensagem de erro:
    	  “Você já tentou submeter este formulário. Acesso bloqueado. Tente novamente após 2 horas.”
	  Durante esse período, o aluno não poderá realizar novas tentativas, mesmo que esteja dentro do raio permitido.

        - 5 Envio de Dados para o Professor:
    	* Após a validação, os dados do aluno (Nome, RGM, Curso e Turno) são enviados para o professor em um arquivo Excel.


# Histórico de Versões e Desenvolvimento #

* Versão 1 (Dia 1)
	
	Adições:

    	- Criado o “esqueleto” do site com HTML básico.
    	- Implementado formulário de identificação para alunos e professores.
   	- API de localização configurada para capturar coordenadas.

	Problemas Encontrados:

    	- Após a leitura do QR Code, o sistema apresentava dificuldade em verificar se a localização do aluno estava dentro do raio permitido.
    	- QR Code gerava múltiplas vezes para o mesmo professor, causando redundância.
    	- O site não possuía estilização (CSS).

* Versão 2 (Dia 2)
	
	Correções:

    	- Adicionado CSS para estilizar as páginas e melhorar a usabilidade do site.

	Problemas Persistentes:

    	- Ainda havia dificuldade em identificar a localização correta após a leitura do QR Code.
        - O bug de múltiplas gerações do QR Code continuava presente.

* Versão 3 (Dia 3)

	Correções:

    	- Implementado sistema que permite o envio do questionário apenas uma vez por aluno.
    	- Resolvido o problema de múltiplas gerações do QR Code.

	Problemas Persistentes

    	- O sistema continuava com dificuldade de validar se a localização do aluno estava dentro do raio permitido após leitura do QR Code.
        - Professores ainda precisavam enviar manualmente um arquivo contendo os dados dos alunos para marcar presença no sistema.

* Versão 4 (Dia 4)

	Correções:

    	- Resolvido o bug que causava dificuldade na validação da localização do aluno após a leitura do QR Code.

	Alterações:

        -Alteradas as cores do formulário, da página de QR Code e da tela de login, melhorando a identidade visual.

	Problemas Persistentes:

    	- O arquivo contendo os dados dos alunos ainda precisava ser enviado manualmente pelo professor.
        - O formulário apresentava mensagens de erro antes do preenchimento, mas foi corrigido com ajustes no CSS.

* Versão 5 (Dia 5)

	Correções:

    	- Resolvido o bug de reconhecimento da localização durante o uso do QR Code.
    	- Corrigido problema de duplicação de dados ao exportar informações para o Excel, eliminando uma linha redundante no código.

	Problemas Persistentes:

    	- As funcionalidades do site estavam funcionando separadamente, sem integração total.

	O que podemos acrescentar:

	- Opção para o aluno selecionar qual palestra ela está presente.


# Lições Aprendidas #

    Geração de QR Codes;
    Uso do GitHub;
    API de Localização JavaScript;
    Trabalho em Grupo;
    Deploy.
