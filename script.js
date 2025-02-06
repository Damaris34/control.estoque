document.getElementById('material-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const data = document.getElementById('data').value;

    addMaterialToTable(nome, quantidade, data);

    document.getElementById('material-form').reset();
});

function addMaterialToTable(nome, quantidade, data) {
    const table = document.getElementById('material-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.innerHTML = nome;
    cell2.innerHTML = quantidade;
    cell3.innerHTML = data;
}

function filterByDate() {
    const filterDate = document.getElementById('filter-date').value;
    const rows = document.getElementById('material-table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const cellDate = cells[2].innerHTML;

        if (filterDate === '' || cellDate === filterDate) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const filterDate = document.getElementById('filter-date').value;
    const rows = document.getElementById('material-table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    doc.text('Relatório de Estoque', 10, 10);
    doc.text(`Data: ${filterDate}`, 10, 20);

    let y = 30;
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const cellDate = cells[2].innerHTML;

        if (filterDate === '' || cellDate === filterDate) {
            const nome = cells[0].innerHTML;
            const quantidade = cells[1].innerHTML;

            doc.text(`Nome: ${nome}, Quantidade: ${quantidade}`, 10, y);
            y += 10;
        }
    }

    doc.save('relatorio_estoque.pdf');
}
