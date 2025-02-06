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

    // Obtém o corpo da tabela
    const tbody = document.querySelector('#estoqueTable tbody');

    // Cria uma nova linha na tabela
    const newRow = tbody.insertRow();

    // Insere os dados nas células da nova linha
    newRow.insertCell(0).textContent = nomeMaterial;
    newRow.insertCell(1).textContent = quantidade;
    newRow.insertCell(2).textContent = dataReg
