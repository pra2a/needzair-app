import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AppUserTB, AppUserTBRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  AppUserTB,
  typeof AppUserTB.prototype.id,
  AppUserTBRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AppUserTB, dataSource);
  }
}
