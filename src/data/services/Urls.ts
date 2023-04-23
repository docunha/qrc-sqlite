import { dataSource } from "../configs/db"
import { Urls, CreateSaveUrlsParams, IdParameter, infoUrls } from "../models/Urls"


// async function fetchAll2() {  
  //   const urlsRepository = dataSource.getRepository(Urls)
  //   const returnInfo = await urlsRepository.findOneBy({
    //     id: 20, 
    //   })
    //   return returnInfo
    //   // return returnInfo.sourceUrl
    // }
async function fetchAll() {
  const urls = await dataSource.manager.find(Urls);
  return urls;
}

async function create(param: CreateSaveUrlsParams) {
    return await dataSource.transaction(async (trans) => {
      const register = new Urls();
      register.sourceUrl = param.sourceUrl;
      const registerDB = await trans.save(register)
      return registerDB.id;
    })
}

async function findOneBy(param:IdParameter){
  const urlsRepository = dataSource.getRepository(Urls)
  const returnInfo : infoUrls = await urlsRepository.findOneBy({
      id: param.id,
  })
  return returnInfo;
}

async function changeIsCompleted(id: number){
  const urlsRepository = dataSource.getRepository(Urls)
  // console.log('Inside changeIsCompleted', id)
  return await urlsRepository.update({
    id: id,
  },{
    isCompleted : true,
  })
}

async function deleteOne(id: number){
  const urlsRepository = dataSource.getRepository(Urls)
  // console.log('Inside changeIsCompleted', id)
  return await urlsRepository.delete({
    id: id,
  })
}




export default {
  create,
  fetchAll,
  findOneBy,
  changeIsCompleted,
  deleteOne
}