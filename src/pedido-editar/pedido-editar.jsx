import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/navbar/navbar"
import "./pedido-editar.css"
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import api from "../services/api.js";


function PedidoEditar() {

    const {id_pedido} = useParams();
    const navigate = useNavigate();

    const [id_cliente, setIdCliente] = useState(0);
    const [dt_pedido, setDtPedido] = useState("");
    const [id_cond_pagto, setIdCondPagto] = useState(0);
    const [dt_entrega, setDtEntrega] = useState("");
    const [obs, setObs] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [vl_total, setVlTotal] = useState(0);
    const [msg, setMsg] = useState("");

    const [lista_produtos, setListaProdutos] = useState([]); 
    const [lista_clientes, setListaClientes] = useState([]);
    const [cond_pagtos, setCondPagtos] = useState([]);     
    


function AdicionarProduto() {
    const prod = {
        id_item: uuidv4(),
        id_produto: 0, 
        descricao: "", 
        qtd: 1, 
        vl_unit: 0, 
        vl_total: 0
    };

    setProdutos([...produtos, prod]);

}

function ExcluirProduto(id_item) {
    const prod = [];

    produtos.map((p) => {
        if (p.id_item != id_item) {
            prod.push(p);
        }
    });

    setProdutos(prod);
}

function CarregarDadosPedido(id_pedido) {
    console.log(id_pedido)
    if (id_pedido > 0){
        api.get("/pedidos/" + id_pedido)
        .then(retorno => {
            setIdCliente(retorno.data.id_cliente);
            setDtPedido(retorno.data.dt_pedido.substring(0, 10));
            setIdCondPagto(retorno.data.id_cond_pagto);
            setDtEntrega(retorno.data.dt_entrega.substring(0, 10));
            setObs(retorno.data.obs);
            setProdutos(retorno.data.itens);
        })
        .catch(err => {
            console.log(err);
        });
        } else {
        setIdCliente(0);
        setDtPedido(moment().format("YYYY-MM-DD"));
        setIdCondPagto(0);
        setDtEntrega(moment().format("YYYY-MM-DD"));
        setObs("");
        setProdutos([]);
    }
}

function PesquisarClientes() {
    api.get("/clientes")
    .then((retorno) => {
        setListaClientes(retorno.data);
    })
    .catch((err) => {
        console.log(err);
        alert("Erro ao consultar os pedidos");
    });
}

function PesquisarProdutos(){
    api.get("/produtos")
    .then((retorno) => {
        setListaProdutos(retorno.data);
    })
    .catch((err) => {
        console.log(err);
        alert("Erro ao consultar os produtos");
    });
}

function PesquisarCondPagtos(){
    api.get("/condpagto")
        .then((retorno) => {
            setCondPagtos(retorno.data);
        })
        .catch((err) => {
            console.log(err);
            alert("Erro ao consultar as condições de pagamentos");
        });
}

function handleDescricaoChange(id_produto, descricao, index){
    const prod = [...produtos];

    prod[index].id_produto = id_produto;
    prod[index].descricao = descricao;

    setProdutos(prod);
}

function handleQtdeChange(qtd, index){
    const prod = [...produtos];

    prod[index].qtd = qtd;
    prod[index].vl_total = qtd * prod[index].vl_unit;

    setProdutos(prod);
}

function handleVlUnitChange(vl, index){
    const prod = [...produtos];

    prod[index].vl_unit = vl;
    prod[index].vl_total = prod[index].qtd * vl;

    setProdutos(prod);
}

function SalvarDados(){
    const dados_pedido = {
        id_cliente: id_cliente,
        id_cond_pagto,
        id_usuario: localStorage.getItem("sessionId"),
        dt_pedido,
        dt_entrega,
        vl_total,
        obs,
        itens: produtos  
    };
    console.log(dados_pedido)
    if(id_pedido > 0) {
        api.put("/pedidos/" + id_pedido, dados_pedido)
        .then((retorno) => {
            if(retorno.status == 200){
                navigate("/pedidos");
            } else {
                setMsg("Erro ao editar o pedido");
                console.log(retorno);
            }
        })
        .catch((err) => {
            if(err.response) {
                if(err.response.data){
                    setMsg(err.response.data);
                } else {
                    setMsg("Erro ao salvar o pedido");
                }
            }
        });
    } else {
        api.post("/pedidos/", dados_pedido)
        .then((retorno) => {
            if(retorno.status == 201){
                navigate("/pedidos");
            } else {
                setMsg("Erro ao cadastrar o pedido");
                console.log(retorno);
            }
        })
        .catch((err) => {
            if(err.response){
                if(err.response.data){
                    setMsg(err.response.data);
                } 
            } else {
                setMsg("Erro ao salvar o pedido");
            }
        });
    }

}

useEffect(() => {
    PesquisarClientes();
    PesquisarProdutos();
    PesquisarCondPagtos();   
    CarregarDadosPedido(id_pedido);
}, [id_pedido]);

useEffect(() => {
    function CalculaTotal(){
        let total = 0;
    
        produtos.map((prod) => {
            total = total + prod.vl_total;
        })
    
        setVlTotal(total);
    }
    CalculaTotal();
}, [produtos]);

    return <>
        <Navbar />

        <div className="container-fluid mt-page form-pedido-editar">

            <div className="row col-lg-6 offset-lg-3 ">

                <div className="col-12 mb-4 mt-2">
                    <h2 className="d-inline">
                    {
                        id_pedido > 0 ? " Editar Pedido " + id_pedido : " Novo Pedido "
                    }
                    </h2>

                </div>

               <div className="col-md-8 mb-4">
                    <label htmlFor="InputNome" className="form-label">Cliente</label>
                    <div className="form-control mb-2">
                        <select name="clientes" id="clientes" onChange={(e) => setIdCliente(e.target.value)} value={id_cliente}>
                                <option value="0">Selecione o Cliente</option>
                                {lista_clientes.map(c => {
                                    return <option key={c.id_cliente} value={c.id_cliente}>{c.nome}</option>
                                })}
                        </select>                       
                     </div>
                </div>

                <div className="col-md-4 mb-4">
                    <label htmlFor="InputEmail" className="form-label">Data Venda</label>
                    <input type="date" onChange={(e) => setDtPedido(e.target.value)} value={dt_pedido} className="form-control" id="InputEmail" aria-describedby="email"/>             

            
                </div>

                <div className="col-md-8 mb-4">
                    <label htmlFor="InputNome" className="form-label">Cond. de Pagamento</label>
                    <div className="form-control mb-2">
                        <select name="cond_pagto" id="cond_pagto" onChange={(e) => setIdCondPagto(e.target.value)} value={id_cond_pagto}>
                            <option value="0">Selecione a condição de pagamento</option>
                            {cond_pagtos.map(c => {
                                return <option key={c.id_cond_pagto} value={c.id_cond_pagto}>{c.cond_pagto}</option>
                            })}

                        </select>
                    </div>
                </div>

                <div className="col-md-4 mb-5">
                    <label htmlFor="InputEmail" className="form-label">Previsão de Entrega</label>
                    <input type="date" onChange={(e) => setDtEntrega(e.target.value)} value={dt_entrega}  className="form-control" id="InputEmail" aria-describedby="
                    email" />
                </div>

                <div className="col-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Produto</th>
                                <th scope="col">Qtd</th>
                                <th scope="col">Valor Unit.</th>
                                <th scope="col">Valor Total</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                produtos.map((produto, index) => {
                                    return <tr key={produto.id_item}>
                                        <td>
                                            <div className="form-control">
                                                <select name="produtos" id="produtos" value={produto.id_produto} 
                                                        onChange={(e) => handleDescricaoChange(e.target.value,
                                                                                               e.target[e.target.selectedIndex].text, index)}>
                                                    <option value="0">Selecione o produto</option>
                                                    {lista_produtos.map(p => {
                                                        return <option key={p.id_produto} value={p.id_produto}>{p.descricao}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </td>
                                        <td><input type="text" onChange={(e) => handleQtdeChange(e.target.value, index)} value={produto.qtd} className="form-control" /></td>
                                        <td><input type="text" onChange={(e) => handleVlUnitChange(e.target.value, index)} value={produto.vl_unit} className="form-control" /></td>
                                        <td><input type="text" value={produto.vl_total} className="form-control" disabled /></td>
                                        <td><button type="button" onClick={(e) => ExcluirProduto(produto.id_item)} className="btn btn-danger"><i className="bi bi-trash3-fill"></i></button></td>
                                    </tr>
                                })
                            }
                        </tbody>    

                    </table>

                    {
                        produtos.length == 0 ?
                            <div className="no-item">Nenhum produto cadastrado</div>
                            : null
                    }
                </div>

                <div className="col-md-6">
                    <button type="button" className="btn btn-sm btn-primary" onClick={AdicionarProduto}>Adicionar Produto</button>
                </div>

                <div className="col-md-6 text-end mb-5">
                    <span className="me-4">Total Pedido:</span>
                    <b>
                        {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(vl_total)}
                    </b>
                </div>

                <div className="col-12">
                    <label htmlFor="InputNome" className="form-label">Obs</label>
                    <textarea type="text" onChange={(e) => setObs(e.target.value)} value={obs} className="form-control"></textarea>
                </div>

                <div className="col-12 mt-3">
                    {
                        msg.length > 0 ? <div className="alert alert-danger mt-4 text-center">{msg}</div> : null
                    }
                    <div>
                        <div className="d-flex justify-content-end">
                            <Link to="/pedidos" type="button" className="btn btn-outline-primary me-4">Cancelar</Link>
                            <button type="button" className="btn btn-success" onClick={SalvarDados}>Salvar Dados</button>
                        </div>
                    </div>
                </div>
                          
            </div>

        </div>
    </>
}

export default PedidoEditar;

