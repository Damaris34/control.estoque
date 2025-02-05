document.addEventListener('DOMContentLoaded', () => {
    const materialForm = document.getElementById('materialForm');
    const materialList = document.getElementById('materialList');
    const relatorio = document.getElementById('relatorio');
    const gerarRelatorioBtn = document.getElementById('gerarRelatorio');

    let materiais = [];

    materialForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const codigo = document.getElementById('codigo').value;
        const nome = document.getElementById('nome').value;
        const quantidade = document.getElementById('quantidade').value;
        const unidade = document.getElementById('unidade').value;

        const material = { codigo, nome, quantidade, unidade };
        materiais.push(material);

        adicionarMaterialNaLista(material);
        materialForm.reset();
    });

    function adicionarMaterialNaLista(material) {
        const li = document.createElement('li');
        li.textContent = `Código: ${material.codigo}, Nome: ${material.nome}, Quantidade: ${material.quantidade} ${material.unidade}`;

        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover';
        removerBtn.addEventListener('click', () => {
            materiais = materiais.filter(m => m.codigo !== material.codigo);
            materialList.removeChild(li);
        });

        li.appendChild(removerBtn);
        materialList.appendChild(li);
    }

    gerarRelatorioBtn.addEventListener('click', () => {
        let relatorioTexto = 'Relatório de Estoque:\n';
        materiais.forEach(material => {
            relatorioTexto += `Código: ${material.codigo}, Nome: ${material.nome}, Quantidade: ${material.quantidade} ${material.unidade}\n`;
        });
        relatorio.textContent = relatorioTexto;
    });
});
