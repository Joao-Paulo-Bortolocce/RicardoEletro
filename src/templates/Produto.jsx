import { useState } from "react";
export default function Produto(props){
    const [quantidade, setQuantidade] = useState(1);
    function adicionarItem(){
        const itemAdd={
            "qtd":parseInt(quantidade),
            "produto":props.produto
        }
        let lista = props.listaItens.filter((item)=>{
            if(item.produto.id === props.produto.id){
                itemAdd.qtd+=parseInt(item.qtd)
                return itemAdd;
            }
        })
        if(lista.length === 0){
            props.setListaItens([...props.listaItens, itemAdd]);
        }
        else{
            props.setListaItens(props.listaItens.map((item)=>{
                return item.produto.id === itemAdd.produto.id ?  itemAdd : item
            }))
        }
        localStorage.setItem("Carrinho",JSON.stringify(props.listaItens));
    }

    return(
        <div style={{
            width: '200px',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '10px',
            padding: '10px',
            marginBottom: '40px'
        }}>
            <div style={{
                width:'100px',
                height: '100px',
            }}
            id='imagem-produto'>
                <img style={{
                     width:"100%",
                     height:"100%"
                }} src={props.produto?.image || ''} 
                   alt={props.produto?.description || ''}/>
            </div>
            <div style={{height: '40px'}} id='titulo-produto'>
                <p><strong>{props.produto?.title.substring(0, 20)}</strong></p>
            </div>
            <div style={{
                color: 'rgb(0,120,0)',
            }} id='preco-produto'>
                <p><strong>R$ {props.produto?.price}</strong></p>
            </div>
            <div style={{
                
            }}id="opinioes-produoto">
                <span>{((props.produto ? props.produto.rating.rate : 0) * 20) || 0}% gostaram</span>
            </div>
            <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                id='quantidade-selecionada'>
                <p style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '40px',
                    margin: '0px',
                    padding: '0px',
                    marginRight: '10px',
                }}>Quantidade:</p>
                <input 
                    style={{
                        width: '40px',
                        border: '0px',
                        outline: 'none',
                    }}
                    type="number" 
                    value={quantidade} 
                    onChange={(e) => setQuantidade(e.target.value)} 
                    step={1}
                    min={1}/>
            </div>
            <div id='botao-comprar'>
                <button onClick={()=>{
                    adicionarItem();
                }}
                    style={{
                        backgroundColor: 'rgb(255,60,60)',
                        color: 'white',
                        border: '0px',
                        borderRadius:'10px',
                        height: '40px',
                        width: '120px',
                    }}
                    type='button'>
                        Comprar
                </button>
            </div>
        </div>
    )
}