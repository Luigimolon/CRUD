const produtoForm = document.getElementById('produtoForm');
const produtoList = document.getElementById('produtoList');

// Variável para armazenar o ID do produto em edição
let produtoEmEdicao = null;

// Função para obter produtos
async function fetchProdutos() {
  const res = await fetch('http://localhost:3000/produtos');
  const produtos = await res.json();
  produtoList.innerHTML = produtos.map(p =>
    `<li>
      ${p.descricao} - Quantidade: ${p.quantidade} - Valor: ${p.valor}
      <button onclick="deleteProduto(${p.id})">Deletar</button>
      <button onclick="editProduto(${p.id}, '${p.descricao}', ${p.quantidade}, ${p.valor})">Editar</button>
    </li>`).join('');
}

// Adiciona ou atualiza um produto
produtoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const descricao = document.getElementById('descricao').value;
  const quantidade = parseFloat(document.getElementById('quantidade').value);
  const valor = parseFloat(document.getElementById('valor').value);

  // Validação para não permitir números negativos
  if (quantidade < 0 || valor < 0) {
    alert("Quantidade e Valor não podem ser negativos.");
    return;
  }

  if (produtoEmEdicao) {
    // Atualizar produto existente
    await fetch(`http://localhost:3000/produtos/${produtoEmEdicao}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao, quantidade, valor })
    });
    produtoEmEdicao = null;
  } else {
    // Adicionar novo produto
    await fetch('http://localhost:3000/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao, quantidade, valor })
    });
  }

  produtoForm.reset();
  fetchProdutos();
});

// Deleta um produto
async function deleteProduto(id) {
  await fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' });
  fetchProdutos();
}

// Função para editar um produto
function editProduto(id, descricao, quantidade, valor) {
  produtoEmEdicao = id;
  document.getElementById('descricao').value = descricao;
  document.getElementById('quantidade').value = quantidade;
  document.getElementById('valor').value = valor;
}

// Chama a lista de produtos ao carregar a página
fetchProdutos();

