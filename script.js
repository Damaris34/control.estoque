let materiais = [];

document.getElementById('materialForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeMaterial = document.getElementById('nomeMaterial').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataRegistro = document.getElementById('dataRegistro').value;

    const material = { nomeMaterial, quantidade, dataRegistro };
    materiais.push(material);

    adicionarMaterialNaTabela(material);
    limparFormulario();
});

function adicionarMaterialNaTabela(material) {
    const tbody = document.querySelector('#estoqueTable tbody');
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${material.nomeMaterial}</td>
        <td>${material.quantidade}</td>
        <td>${material.dataRegistro}</td>
    `;

    tbody.appendChild(tr);
}

function limparFormulario() {
    document.getElementById('nomeMaterial').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('dataRegistro').value = '';
}

function filtrarPorData() {
    const dataFiltro = document.getElementById('filtroData').value;
    const materiaisFiltrados = materiais.filter(material => material.dataRegistro === dataFiltro);

    const tbody = document.querySelector('#estoqueTable tbody');
    tbody.innerHTML = '';

    materiaisFiltrados.forEach(material => adicionarMaterialNaTabela(material));
}

function gerarRelatorioPDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    const dataFiltro = document.getElementById('filtroData').value;
    const materiaisFiltrados = materiais.filter(material => material.dataRegistro === dataFiltro);

    doc.text('Relatório de Estoque', 10, 10);
    doc.text(`Data: ${dataFiltro}`, 10, 20);

    let y = 30;
    materiaisFiltrados.forEach(material => {
        doc.text(`Material: ${material.nomeMaterial}, Quantidade: ${material.quantidade}`, 10, y);
        y += 10;
    });

    doc.save('relatorio_estoque.pdf');
}
