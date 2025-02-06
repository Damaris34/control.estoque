document.getElementById('materialForm').addEventListener('submit', function(event) {
    event.preventDefault();
    adicionarMaterial();
});

function adicionarMaterial() {
    const nomeMaterial = document.getElementById('nomeMaterial').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataRegistro = document.getElementById('dataRegistro').value;
    const necessidadeCompra = document.getElementById('necessidadeCompra').value;

    const tbody = document.querySelector('#estoqueTable tbody');
    const newRow = tbody.insertRow();

    newRow.insertCell(0).textContent = nomeMaterial;
    newRow.insertCell(1).textContent = quantidade;
    newRow.insertCell(2).textContent = dataRegistro;
    newRow.insertCell(3).textContent = necessidadeCompra;

    document.getElementById('materialForm').reset();
}

function filtrarPorData() {
    const filtroData = document.getElementById('filtroData').value;
    const rows = document.querySelectorAll('#estoqueTable tbody tr');

    rows.forEach(row => {
        const dataRegistro = row.cells[2].textContent;
        if (filtroData === '' || dataRegistro === filtroData) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function gerarRelatorio() {
    const table = document.getElementById('estoqueTable');
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, 'relatorio_estoque.xlsx');
}
