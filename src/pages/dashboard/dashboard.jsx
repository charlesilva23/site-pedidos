import Navbar from "../../components/navbar/navbar.jsx";
import Grafico from "../../components/grafico/grafico.jsx";

function Dashboard() {

    const dados_clientes = [
        ["Cliente", "Vendas"],
        ["Microsoft", 5200],
        ["IBM", 4900],
        ["Apple", 4200],
        ["Facebook", 3210],
        ["Google", 2140],
    ];

    const dados_vendas = [
        ["Mês", "Vendas"],
        ["1", 5200],
        ["2", 4900],
        ["3", 7200],
        ["4", 3210],
        ["5", 5362],
        ["6", 6200],
        ["7", 4210],
        ["8", 5630],
        ["9", 8452],
        ["10", 6852],
        ["11", 4250],
        ["12", 6325]
    ];

    const dados_produtos = [
        ["Produtos", "Vendas"],
        ["Teclado", 5200],
        ["HD", 4900],
        ["Monitor", 7000],
        ["Fone", 3210],
        ["Webcam", 5362]
    ];

    const dados_cidade = [
        ["Cidade", "Vendas"],
        ["São Paulo", 5200],
        ["Rio de Janeiro", 4900],
        ["Maringá", 7000],
        ["Campinas", 3210],
        ["Curitiba", 5362]
    ];


    return <>
        <Navbar />

        <div className="container-fluid mt-page">
            <div className="ms-4 d-flex justify-content-between">
                <h2>Dashboard</h2>
                <button className="btn btn-primary me-4"><i className="fas fas-plus"></i>Atualizar</button>
            </div>

        <div className="row">

            <div className="col-md-6 p-5">
                <Grafico titulo="Venda por clientes (top 5)"
                         chartType="Bar"
                         dados={dados_clientes}
                         legenda={false}
                         />
            </div>

            <div className="col-md-6 p-5">
                <Grafico titulo="Vendas anual"
                         chartType="Line"
                         dados={dados_vendas}
                         legenda={false}
                         />
            </div>

            <div className="col-md-6 p-5">
                <Grafico titulo="Vendas por produto (top 5)"
                         chartType="PieChart"
                         dados={dados_produtos}
                         legenda={true}
                         />
            </div>

            <div className="col-md-6 p-5">
                <Grafico titulo="Venda por cidade"
                         chartType="BarChart"
                         dados={dados_cidade}
                         legenda={false}
                         />
            </div>

        </div>

        </div>

    </>
}

export default Dashboard;
