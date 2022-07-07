import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    foreignKeys: {
      fkContactInfoAppUserId: {
        name: 'fkContactInfoAppUserId',
        entity: 'AppUserTB',
        entityKey: 'id',
        foreignKey: 'UserID',
      },
      fkContactInfoCountryId: {
        name: 'fkContactInfoCountryId',
        entity: 'CountryTb',
        entityKey: 'id',
        foreignKey: 'CountryID',
      }
    }
  }
})
export class ContactInfoTb extends Entity {
  // Define well-known properties here

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number'
  })
  UserID: number;

  @property({
    type: 'string',
    mysql: {
      dataLength: 60,
      nullable: 'N'
    },
  })
  Address?: string;

  @property({
    type: 'number'
  })
  CountryID: number;

  @property({
    type: 'string',
    mysql: {
      dataLength: 50,
      nullable: 'N'
    },
  })
  City?: string;

  @property({
    type: 'string',
    mysql: {
      dataLength: 20,
      nullable: 'N'
    },
  })
  Phone?: string;

  @property({
    type: 'string',
    mysql: {
      dataLength: 20,
      nullable: 'N'
    },
  })
  CelPhone?: string;

  @property({
    type: 'string',
    mysql: {
      dataLength: 100,
      nullable: 'N'
    },
  })
  EmergencyName?: string;


  @property({
    type: 'string',
    mysql: {
      dataLength: 20,
      nullable: 'N'
    },
  })
  EmergencyPhone?: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ContactInfoTb>) {
    super(data);
  }
}

export interface ContactInfoTbRelations {
  // describe navigational properties here
}

export type ContactInfoTbWithRelations = ContactInfoTb & ContactInfoTbRelations;
