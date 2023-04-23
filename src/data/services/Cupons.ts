import { dataSource } from "../configs/db"
import { Urls, CreateSaveUrlsParams, IdParameter, infoUrls } from "../models/Urls"
import { MoreThan } from "typeorm"

// import { Cupons, infoCupom} from "../models/Cupons"
import { Cupons2, infoCupom2 } from "../models/Cupons2";

// import { cabecalhoCupom, infoCupom } from "../models/infoCupom.model";


// async function fetchAll() {
//   const cupons = await dataSource.manager.find(Cupons);
//   return cupons;
// }
async function fetchAll2() {
  const cupons = await dataSource.manager.find(Cupons2);
  return cupons;
}
async function fetchCuponsOneWeek(){

  let now = new Date().valueOf();
  let epoch = now / 1000;
  let date = 604800*4;
  // let date = 604800*230;
  let oneWeekDate = epoch - date;

  // https://orkhan.gitbook.io/typeorm/docs/find-options
  const returnInfo = await dataSource.getRepository(Cupons2).findBy({
    dataHoraCupom: MoreThan(oneWeekDate),
  })
  return returnInfo;
}

async function create2(informations: infoCupom2) {
  const CuponsRepository = dataSource.getRepository(Cupons2)

  return await CuponsRepository.save({
    numeroCnpj: informations.numeroCnpj,
    nomeFantasia: informations.nomeFantasia,
    endereco: informations.endereco,

    dataHoraCupom: informations.dataHoraCupom,
    valorTotalCupom: informations.valorTotalCupom,
    itensdoCupom: informations.itensdoCupom,
    sourceUrl : informations.sourceUrl,
    user_id : informations.user_id,
   // createdAt: now,
   // updatedAt: now,
 });
}

async function findOneBy(param:IdParameter){
  const CuponsRepository = dataSource.getRepository(Cupons2)
  const returnInfo : infoCupom2 = await CuponsRepository.findOneBy({
      // id: id,
      id: param.id,
  })
  return returnInfo;
}

async function deleteOneCupom(id: number){
  const CuponsRepository = dataSource.getRepository(Cupons2)
  // console.log('Inside changeIsCompleted', id)
  return await CuponsRepository.delete({
    id: id,
  })
}

export default {
  // create,
  create2,
  // fetchAll,
  fetchAll2,
  findOneBy,
  // changeIsCompleted,
  deleteOneCupom,
  fetchCuponsOneWeek,
}