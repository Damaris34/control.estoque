document.getElementById('estoqueForm').addEventListener('submit', function(event) {
    event.preventDefault();
    adicionarMaterial();
});

document.getElementById('gerarRelatorio').addEventListener('click', gerarRelatorio);

function adicionarMaterial() {
    const data = document.getElementById('data').value;
    const nomeMaterial = document.getElementById('nomeMaterial').value;
    const dataRelatorio = document.getElementById('dataRelatorio').value;

    const tbody = document.querySelector('#tabelaEstoque tbody');
    const newRow = tbody.insertRow();

    newRow.insertCell(0).textContent = data;
    newRow.insertCell(1).textContent = nomeMaterial;
    newRow.insertCell(2).textContent = dataRelatorio;

    document.getElementById('estoqueForm').reset();
}

function gerarRelatorio() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const table = document.getElementById('tabelaEstoque');
    const rows = table.rows;

    let y = 10;
    doc.text("Relatório de Estoque", 10, y);
    y += 10;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        let text = '';
        for (let j = 0; j < cells.length; j++) {
            text += cells[j].textContent + '\t';
        }
        doc.text(text, 10, y);
        y += 10;
    }

    doc.save('relatorio_estoque.pdf');
}
