let tipoSelecionado = null;

function salvarDados(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

function obterDados(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

function gerarId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function abrirModal(tipo) {
  tipoSelecionado = tipo;
  document.getElementById('modalTitulo').innerText = `Adicionar ${tipo}`;
  document.getElementById('modalInput').value = '';
  document.getElementById('modalDescricao').value = '';
  document.getElementById('modal').classList.remove('hidden');
}

function fecharModal() {
  document.getElementById('modal').classList.add('hidden');
}

function confirmarModal() {
  const peso = parseFloat(document.getElementById('modalInput').value);
  const descricao = document.getElementById('modalDescricao').value;
  if (isNaN(peso) || peso <= 0) return mostrarToast("Informe um peso válido", true);

  const estoque = obterDados('estoque');
  estoque.push({ id: gerarId(), tipo: tipoSelecionado, peso, descricao });
  salvarDados('estoque', estoque);
  fecharModal();
  mostrarToast(`${tipoSelecionado} adicionado`);
  carregar();
}

function editarPeso(id, peso) {
  const estoque = obterDados('estoque');
  const item = estoque.find(i => i.id === id);
  if (!item) return;
  item.peso = Number(peso);
  salvarDados('estoque', estoque);
  mostrarToast("Peso atualizado");
  carregar();
}

function excluirSelecionados() {
  const checks = Array.from(document.querySelectorAll('.check:checked'));
  if (checks.length === 0) return mostrarToast("Nenhum item selecionado", true);

  let estoque = obterDados('estoque');
  const historico = obterDados('historico');

  checks.forEach(chk => {
    const id = Number(chk.value);
    const item = estoque.find(i => i.id === id);
    if (item) {
      historico.push({ ...item, dataExclusao: new Date().toISOString() });
    }
    estoque = estoque.filter(i => i.id !== id);
  });

  salvarDados('estoque', estoque);
  salvarDados('historico', historico);
  mostrarToast(`${checks.length} item(s) excluído(s)`);
  carregar();
}

function limparHistorico() {
  if (confirm("Você tem certeza que deseja limpar todo o histórico de exclusões?")) {
    salvarDados('historico', []);
    mostrarToast("Histórico limpo");
    carregar();
  }
}

function mostrarToast(msg, erro = false) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded shadow z-50 ${erro ? 'bg-red-500' : 'bg-green-500'} text-white`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

function carregar() {
  const estoque = obterDados('estoque');
  const historico = obterDados('historico');

  // Lista de itens no estoque
  const lista = estoque.map(item => `
    <div class="flex items-center justify-between border-b pb-2">
      <div class="flex flex-col">
        <div class="flex items-center gap-3">
          <input type="checkbox" class="check" value="${item.id}">
          <span class="font-medium">${item.tipo}</span> -
          <input type="number" value="${item.peso}" min="0" class="w-20 border px-1"
            onchange="editarPeso(${item.id}, this.value)"> kg
        </div>
        <div class="text-sm text-gray-500">${item.descricao || ''}</div>
      </div>
    </div>
  `).join('');
  document.getElementById('listaEstoque').innerHTML = lista;

  // Resumo com contagem e soma dos pesos por tipo
  const moletinho = estoque.filter(i => i.tipo === 'Moletinho');
  const linho = estoque.filter(i => i.tipo === 'Linho');

  const totalMoletinho = moletinho.length;
  const totalLinho = linho.length;
  const pesoMoletinho = moletinho.reduce((acc, i) => acc + i.peso, 0);
  const pesoLinho = linho.reduce((acc, i) => acc + i.peso, 0);
  const total = estoque.length;

  document.getElementById('resumo').innerHTML = `
    Total: ${total} sacos |
    <span class="text-blue-600">Moletinho: ${totalMoletinho} sacos (${pesoMoletinho.toFixed(1)} kg)</span> |
    <span class="text-green-600">Linho: ${totalLinho} sacos (${pesoLinho.toFixed(1)} kg)</span>
  `;

  // Histórico de exclusões
  const historicoLista = historico.map(h => `
    <div>
      ${h.tipo} - ${h.peso}kg - ${h.descricao || ''} 
      <span class="text-gray-500">[${new Date(h.dataExclusao).toLocaleString()}]</span>
    </div>
  `).join('');
  document.getElementById('listaHistorico').innerHTML = historicoLista;
}

carregar();
