// import FetchUrlError from "../models/errors/FetchUrlError.error.model";

import FetchUrlError from "./data/models/errors/FetchUrlError.error.model";

export default async function fetchConteudoCupom(urlCupom: string) {
  //Pega o conteudo do html do cupom
  //Verifica se tem http ou https
  const matchHttp = urlCupom.match(/https?:\/\//ig);
  //Troca https po http
  const urlCupomToFetch = urlCupom.replace("https", "http");

  // let urlCupomToFetch = 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29220275315333008355655070001718731048579175|2|1|1|B23D19B2227E538B656205088B215BCF5BD82723'

  
  //Se existir http faz o fetchurl
  if (matchHttp) {
    try {
      const response = await fetch(urlCupomToFetch, {
        method: 'GET',
        mode: 'no-cors',
        redirect: 'follow'
      });
      return response.text()
  
    } catch (error) {
      throw new FetchUrlError('Erro na consulta do cupom', error);
    }
  }
  else {
    //se nao tiver http
    throw new FetchUrlError('Erro na consulta do cupom sem https ou http');
  }
  
}