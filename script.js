// Adiciona um evento de submit ao formulário
document.getElementById('materialForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    adicionarMaterial(); // Chama a função para adicionar material
});

// Função para adicionar um novo material à tabela
function adicionarMaterial() {
    const nomeMaterial = document.getElementById('nomeMaterial').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataRegistro = document.getElementById('dataRegistro').value;
    const necessidadeCompra = document.getElementById('necessidadeCompra').value;

    const tbody = document.querySelector('#estoqueTable tbody');
    const newRow = tbody.insertRow(); // Cria uma nova linha na tabela

    // Insere os dados nas células da nova linha
    newRow.insertCell(0).textContent = nomeMaterial;
    newRow.insertCell(1).textContent = quantidade;
    newRow.insertCell(2).textContent = dataRegistro;
    newRow.insertCell(3).textContent = necessidadeCompra;

    document.getElementById('materialForm').reset(); // Limpa o formulário
}

// Função para filtrar materiais por data
function filtrarPorData() {
    const filtroData = document.getElementById('filtroData').value;
    const rows = document.querySelectorAll('#estoqueTable tbody tr');

    rows.forEach(row => {
        const dataRegistro = row.cells[2].textContent;
        if (filtroData === '' || dataRegistro === filtroData) {
            row.style.display = ''; // Mostra a linha
        } else {
            row.style.display = 'none'; // Esconde a linha
        }
    });
}

// Função para gerar um relatório em Excel
function gerarRelatorio() {
    const table = document.getElementById('estoqueTable');
    const wb = XLSX.utils.table_to_book(table); // Converte a tabela para um livro Excel
    XLSX.writeFile(wb, 'relatorio_estoque.xlsx'); // Salva o arquivo Excel
}
