import { Link } from "react-router-dom";



function Pedido(props) {

    const dt_pedido = new Date(props.dt_pedido.substring(0, 19));

    function AlterarStatus(id_ped, st){
        alert(id_ped + ' Mudar para o status ' + st)
    
        //Fazer um PUT para o servidor

    }

    function ExcluirPedido(id_ped){
        alert(' Excluindo pedido ' + id_ped);
    
        //Fazer um DELETE para o servidor

    }


    

    return <tr>
        <td>{props.id_pedido}</td>
        <td>{props.cliente}</td>
        <td>{new Intl.DateTimeFormat('pt-BR', {dateStyle: 'short'}).format(dt_pedido)}</td>
        <td>{props.status_descricao}</td>
        <td>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(props.vl_total)}</td>
        <td>
            <div className="dropdown">
                <button className="btn btn-outline-secundary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Opções</button>
                <ul className="dropdown-menu">
                    <li> <Link className="dropdown-item" to={"/pedidos/editar/" + props.id_pedido}>Editar Pedido</Link></li>
                    <li> <a className="dropdown-item" href="#">Excluir Pedido</a></li>
                    <li> <hr className="dropdown-divider" /></li>
                    <li> <a className="dropdown-item" href="#">Finalizar Pedido</a></li>
                    <li> <a className="dropdown-item" href="#">Reabrir Pedido</a></li>
                </ul>
            </div>
        </td>
    </tr>
}

export default Pedido;