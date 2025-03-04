import { EntityManager } from "typeorm/entity-manager/EntityManager"
import { AppDataSource } from "../orm/typeorm/config/orm.config"

export const wrapTransaction=async<T>(fun:(E:EntityManager)=>Promise<T>):Promise<T>=>{
    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        return fun(transactionalEntityManager)
    })
}