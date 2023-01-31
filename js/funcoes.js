// Desenvolvido por Raphael Nery de Vasconcellos (contato@raphaelnery.com.br)
// Global
var end = "https://dadosabertos.camara.leg.br/api/v2/";
var sta = "";

// Funções
async function consomeAPI(met, com){
    let caminho = end + com;
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      const response= await fetch(caminho, requestOptions)
      const data = await response.json();
      return data;
}

async function obterPartidos(){
    let met = "GET";
    let com = "partidos?ordem=ASC&ordenarPor=sigla";
    let ret = await consomeAPI(met, com); 
    let par = "";
    let dados = [];

    dados.push(ret['dados']);
    dados[0].forEach(e=> par+="<option value=\"" + e['sigla'] + "\">" + e['sigla'] + "</option>" );
    popularPartidos(par);
}

function popularPartidos(par){
    document.getElementById("partidos").innerHTML = "<div><select id=\"listaPartidos\">" + par + "</select><div><div><button id=\"consultarCandidatos\" onClick=\"obterParlamentares(document.getElementById('listaPartidos').value)\">Consultar Candidatos</button></div>";
}

async function obterParlamentares(par){
    let met = "GET";
    let com = "deputados/?siglaPartido="+par+"&ordem=ASC&ordenarPor=nome";
    let ret = await consomeAPI(met, com); 
    let parl = "";
    let dados = [];
    console.log(ret);

    dados.push(ret['dados']);
    dados[0].forEach(e=> parl+="<div class=\"deputado\"><img src=" + e['urlFoto'] + " /><p class=\"leg\">Nome: </p><p class=\"dado\">" + e['nome'] + "</p><p class=\"leg\">Sigla: </p><p class=\"dado\">" + e['siglaPartido'] + "</p><p class=\"leg\">UF: </p><p class=\"dado\">" + e['siglaUf'] + "</p></div>");
    popularParlamentares(parl);
}

function popularParlamentares(parl){
    
    document.getElementById("listaParlamentares").innerHTML = "<div id=\"deputados\">" + parl + "</div>";
}