import { Button, Table, Container } from "react-bootstrap"
import { useState } from "react";


export default function CarrinhoCompras(props) {
    const [valorTotal,setValorTotal]=useState(calcvalorTotal(props.listaItens))
    function manipularMudanca(event){
        const id = event.target.id;
        const valor= event.target.value;
        props.setListaItens(props.listaItens.filter((item)=>{
            if(item.produto.id == id)
                item.qtd=parseInt(valor);
            return item
        }))
        setValorTotal(calcvalorTotal(props.listaItens))
        localStorage.setItem("Carrinho",JSON.stringify(props.listaItens));
    }
    
    function excluirItem(itemA){
        if(window.confirm("Deseja realmente excluir este item")){
            const listaAux= props.listaItens.filter((item)=>{
                return item.produto.id !== itemA.produto.id
            })
            props.setListaItens(listaAux);
            localStorage.setItem("Carrinho",JSON.stringify(listaAux));
            setValorTotal(calcvalorTotal(listaAux))
        }
    }

    function calcvalorTotal(lista){
        let valor =0;
        lista.map((item)=>{
            valor+=parseInt(item.qtd) * parseFloat(item.produto.price);
        })
        valor=valor.toFixed(2);
        return valor
    }

    return (
        <Container>
            <br />
            <Button onClick={() => {
                props.setMostrarCarrinho(false)
            }}>Voltar</Button>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Titulo</th>
                        <th>Valor Unitário</th>
                        <th>Quantidade</th>
                        <th>Valor Total</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaItens?.map((item) => {
                            return (
                                
                                <tr>
                                    <td><img src={item.produto.image} alt="" style={{ width: "50px", height: "50px" }} /></td>
                                    <td>{item.produto.title}</td>
                                    <td>R$ {item.produto.price}</td>
                                    <td><input
                                        style={{
                                            width: '40px',
                                            border: '0px',
                                            outline: 'none',
                                        }}
                                        type="number"
                                        value={item.qtd}
                                        onChange={manipularMudanca}
                                        id={item.produto.id}
                                        step={1}
                                        min={1} /></td>
                                    <td>R$ {(item.qtd * item.produto.price).toFixed(2)}</td>
                                    <td><Button onClick={() => {
                                        excluirItem(item);
                                    }} variant="danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>   </Button></td>

                                </tr>)
                        })

                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={4}>Valor Total</th>
                        <td>R$ {valorTotal}</td>
                    </tr>
                </tfoot>
            </Table>
        </Container>
    )
}