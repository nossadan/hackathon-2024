const express = require('express');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const path = require('path');
const app = express();
const port = 3000;

// Configurar express para servir arquivos estáticos (como o HTML)
app.use(express.static(path.join(__dirname, './public/index.html')));
app.use(bodyParser.json());

// Rota para receber os dados do formulário e salvar em Excel
app.post('/submit-form', async (req, res) => {
    const { nome, rgm, turma, turno } = req.body;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Formulário');

    // Adicionar cabeçalho na planilha
    worksheet.columns = [
        { header: 'Nome', key: 'nome' },
        { header: 'RGM', key: 'rgm' },
        { header: 'Turma', key: 'turma' },
        { header: 'Turno', key: 'turno' }
    ];

    // Adicionar dados na planilha
    worksheet.addRow({ nome, rgm, turma, turno });

    // Salvar o arquivo Excel
    const filePath = path.join(__dirname, 'uploads', `formulario_${Date.now()}.xlsx`);
    await workbook.xlsx.writeFile(filePath);

    res.json({ message: 'Formulário enviado com sucesso!', filePath });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
