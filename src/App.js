import GradeProdutos from "./componentes/GradeProdutos";
import BarraBusca from "./templates/BarraBusca";
import Cabecalho from "./templates/Cabecalho";
import CarrinhoCompras from "./componentes/CarrinhoCompras";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((resposta) => resposta.json())
      .then((produtos) => {
        setProdutos(produtos);
      });
    carregarItens()
  }, []);

  const [produtos, setProdutos] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false)
  const [listaItens, setListaItens] = useState([])

  function carregarItens() {
    const listaAux = localStorage.getItem("Carrinho")
    if (listaAux != null) {
      setListaItens(JSON.parse(listaAux))
    }
  }

  return (
    <div className="App">
      <Cabecalho />
      <BarraBusca setMostrarCarrinho={setMostrarCarrinho} quantidadeItens={listaItens.length} />
      {mostrarCarrinho ? <CarrinhoCompras
        listaItens={listaItens}
        setMostrarCarrinho={setMostrarCarrinho}
        setListaItens={setListaItens}
      /> : <GradeProdutos
        listaItens={listaItens}
        setListaItens={setListaItens}
        listaProdutos={produtos}
      />}
    </div>
  );
}

export default App;
