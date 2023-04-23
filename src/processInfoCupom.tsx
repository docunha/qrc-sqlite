//import cheerio, { Cheerio } from 'cheerio';
// import * as from "cheerio";
import * as cheerio from 'cheerio';
// import { headerCupom, infoCupom } from './data/models/Cupons';
import { infoCupom2 } from './data/models/Cupons2';

/**
 * Pega informações do cabeçalho do cupom
 * CNPJ
 * nomeFantasia
 * endereco
 */
export default function processInfoCupom(
  conteudoHtmlCupon: string,
  cupomUrl: string
) {
  //Pega conteudo total da pagina Nfe do cupom
  const $ = cheerio.load(conteudoHtmlCupon, {
    //Deixa os espaços "normatizados"
    normalizeWhitespace: true,
    decodeEntities: true,
    withStartIndices: false, // Add a `startIndex` property to nodes.
    withEndIndices: false, // Add an `endIndex` property to nodes.
  });

  //console.log($('div[class=txtCenter]').html())
  let conteudoCabecalholHtml = $('div[class=txtCenter]').html();

  const cabecalholHtmlDiv = cheerio.load(conteudoCabecalholHtml);

  let nomeFantasia = cabecalholHtmlDiv('div:nth-child(1)').text();
  let cnpjSujo = cabecalholHtmlDiv('div:nth-child(2)').text();
  let endereco = cabecalholHtmlDiv('div:nth-child(3)').text();
  let numeroCnpj = parseInt(formataNumeroCnpj(cnpjSujo));

  // console.log(nomeFantasia)
  // console.log(cnpj)
  // console.log(endereco)

  // let infoHeader: headerCupom = {
  //   numeroCnpj,
  //   nomeFantasia,
  //   endereco,
  // };
  //console.log("Informacao cabecalho Final");

  //Pega a da e hora do cupom
  const dataHoraCupom = extraiDataHora(conteudoHtmlCupon);

  //Pega os itens e valor total do cupom
  const valorTotalitensdoCupom = extraiItensCupom(conteudoHtmlCupon);
  const valorTotalCupom = valorTotalitensdoCupom.valorTotalCupom;

  const itensdoCupomAntesJson = valorTotalitensdoCupom.itensDoCupom;

  const itensdoCupom = JSON.stringify(itensdoCupomAntesJson);

  //Testes user
  const user_id = '794d7570';
  const sourceUrl = cupomUrl;

  const dados: infoCupom2 = {
    // infoHeader,
    numeroCnpj,
    nomeFantasia,
    endereco,

    dataHoraCupom,
    valorTotalCupom,
    itensdoCupom,
    user_id,
    sourceUrl,
  };
  return dados;

  function formataNumeroCnpj(cnpj: string) {
    //Pega somente a informação do cnpj
    //https://github.com/microsoft/TypeScript/issues/47808#issuecomment-1033379391
    let [cnpjSujo] =
      cnpj.match(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/g) || [];
    //Retira o (. / -) do numero do cnpj. Deixa somente os numeros
    //https://respostas.guj.com.br/33656-usando-expressao-para-formatar-cpfcnpj
    let numeroCnpj = cnpjSujo.replace(/(\.|\/|\-)/g, '');
    return numeroCnpj;
  }
  function extraiItensCupom(conteudoHtmlCupon: string) {
    //console.log('Conteudo do cupon, url e outras informações em processo pela função Busca itens extraiItens!!!!!')
    //Inicializa o array
    const itensDoCupom = [];
    //console.log(conteudoCupon);

    //Pega conteudo total da pagina Nfe do cupom
    const conteudoTotalHtml = cheerio.load(conteudoHtmlCupon, {
      //Deixa os espaços "normatizados"
      normalizeWhitespace: true,
      xmlMode: true,
    });
    //Pega a tabela que contem os itens do cupom
    const rows = conteudoTotalHtml('#tabResult').find('tr');

    //Tamanho da tabela
    //console.log(rows.length);
    for (let i = 0; i < rows.length; i++) {
      const current = rows[i];
      //console.log(current)

      //Numero do item no cupom
      const numeroItem = i + 1;

      //const itens = $(current).children("td:nth-child(1)").html();
      //Pega a tag do html TD da tabela que contem as informações dos itens.
      //Nome, codigo, quantidade, unidade de venda, valor unitario
      const itens = cheerio.load(
        conteudoTotalHtml(current).children('td:nth-child(1)').html()
      );

      //Nome que aparece no cupom fiscal
      const nomeProduto = itens('.txtTit').text();
      //Codigo que aparece no cupom
      const codigoProduto = itens('.RCod').text();

      //Quantidade adquirira
      const quantidadeProduto = itens('.Rqtd').text();
      //Pega somente o valor com regex (Numero xxxxxxx,xx)
      const quantidadeProdutoArray = quantidadeProduto.match(
        /[\t ]*((\d{1,3}\.?)+(.\d{1,2})?)/
      );
      const quantidadeProdutoFinal = quantidadeProdutoArray[1];

      //kg unidade caixa amd fardo
      const unidadeVendaProduto = itens('.RUN').text();
      //Pega somente o valor com regex (De 2 a 5 caracteres CX UN LT)
      const unidadeVendaProdutoArray =
        unidadeVendaProduto.match(/[A-Za-z0-9]{2,5}$/);
      const unidadeVendaProdutoFinal = unidadeVendaProdutoArray[0];

      //Valor produto kg, unidade, amd, etc
      const valorProduto = itens('.RvlUnit').text();
      //Pega somente o valor com regex (Numero xxxxxxx,xx)
      const valorProdutoArray = valorProduto.match(
        /[\t ]*((\d{1,3}\.?)+(,\d{1,2})?)/
      );
      const valorProdutoFinal = valorProdutoArray[1];

      //Pega a tag do html TD que contem valor total do item
      const valorTotalProduto = conteudoTotalHtml(current)
        .children('td:nth-child(2)')
        .text();
      //Pega somente o valor com regex (Numero xxxxxxx,xx)
      const valorTotalProdutoArray = valorTotalProduto.match(
        /[\t ]*((\d{1,3}\.?)+(,\d{1,2})?)/
      );
      const valorTotalProdutoFinal = valorTotalProdutoArray[1];

      /* console.log('Valor Total')
      console.log(valorTotalProdutoFinal) */

      //Salva as informações do item no array para ser salvo no BD
      itensDoCupom[i] = {
        numeroItem: numeroItem,
        nomeProduto: nomeProduto,
        codigoProduto: codigoProduto,
        quantidadeProduto: quantidadeProdutoFinal,
        unidadeVendaProduto: unidadeVendaProdutoFinal,
        valorProduto: valorProdutoFinal,
        valorTotalProduto: valorTotalProdutoFinal,
      };
    }

    //Valor Total Cupom
    const valorTotalCupom = conteudoTotalHtml('.txtMax').text();
    // console.log('Valor Total Cupom')
    // console.log(valorTotalCupom)

    //Retorna um opbjeto com um array dos itens e o valor total do cupom
    return {
      itensDoCupom,
      valorTotalCupom,
    };
    //Final funcao que extrai itens cupom
  }
  function extraiDataHora(conteudoTotalHtml: string) {
    //DATETIME 	8 	Combinação de data e hora. Faixa de 01/Jan/1970 até 31/Dez/9999.
    //Formato padrão: “aaaa-mm-dd hh:mm:ss”.
    //Novo formato mysql datetime

    let infos = conteudoTotalHtml;
    //const {infos} = this.state;

    //Busca [0-9] dois digitos
    let dia = '\\d{2}/';
    //Busca [0-9] dois digitos
    let mes = '\\d{2}/';
    //Busca [0-9] quatro digitos
    let ano = '\\d{4}';

    //Espaço em branco e dois digitos
    let hora = '\\s\\d{2}:';
    //Busca [0-9] dois digitos
    let minuto = '\\d{2}:';
    //Busca [0-9] dois digitos
    let segundo = '\\d{2}';

    //Padrao de pesquisa regExp   /\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}:\d{2}/
    let expressaoRegular = new RegExp(
      dia + mes + ano + hora + minuto + segundo,
      'g'
    );
    let regexDataHora = infos.match(expressaoRegular);
    //console.log('Regex data hora');
    //console.log(regexDataHora);

    //"09/03/2020 17:45:31"
    let separadoEspaco = regexDataHora[0].split(/\s/);

    //Separa data pela barra /
    let separadaBarra = separadoEspaco[0].split(/\//);

    let dataHoraCompletoHuman =
      separadaBarra[2] +
      '-' +
      separadaBarra[1] +
      '-' +
      separadaBarra[0] +
      ' ' +
      separadoEspaco[1];

    //console.log("Data e hora epoch");
    // console.log("Data e hora Final");
    // console.log(dataHoraCompleto);

    var myDate = new Date(dataHoraCompletoHuman); // Your timezone!
    var dataHoraCompleto = myDate.getTime() / 1000.0;

    return dataHoraCompleto;

    //2022-03-17 16:27:58
  }
}
