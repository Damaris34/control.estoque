// Armazenando os dados do estoque
let estoque = [];

// Função para adicionar dados ao estoque
document.getElementById("estoqueForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = document.getElementById("data").value;
    const nomeMaterial = document.getElementById("nomeMaterial").value;
    const dataRelatorio = document.getElementById("dataRelatorio").value;

    // Adicionando os dados ao array
    estoque.push({ data, nomeMaterial, dataRelatorio });

    // Atualizando a tabela
    atualizarTabela();

    // Limpando os campos do formulário
    document.getElementById("estoqueForm").reset();
});

// Função para atualizar a tabela de estoque
function atualizarTabela() {
    const tabela = document.getElementById("tabelaEstoque").getElementsByTagName("tbody")[0];
    tabela.innerHTML = ''; // Limpar conteúdo da tabela

    estoque.forEach(item => {
        const row = tabela.insertRow();
        row.insertCell(0).textContent = item.data;
        row.insertCell(1).textContent = item.nomeMaterial;
        row.insertCell(2).textContent = item.dataRelatorio;
    });
}

// Função para gerar o relatório em PDF
document.getElementById("gerarRelatorio").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let yPosition = 20;
    
    doc.text("Relatório de Estoque", 14, yPosition);
    yPosition += 10;

    // Cabeçalhos da tabela
    doc.text("Data", 14, yPosition);
    doc.text("Nome do Material", 50, yPosition);
    doc.text("Data para Relatório", 120, yPosition);
    yPosition += 10;

    // Dados do estoque
    estoque.forEach(item => {
        doc.text(item.data, 14, yPosition);
        doc.text(item.nomeMaterial, 50, yPosition);
        doc.text(item.dataRelatorio, 120, yPosition);
        yPosition += 10;
    });

    // Gerando o PDF
    doc.save("relatorio_estoque.pdf");
});
