import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    foreignKeys: {
      fkUserDocumentAppUserId: {
        name: 'fkUserDocumentAppUserId',
        entity: 'AppUserTB',
        entityKey: 'id',
        foreignKey: 'UserID',
      },
      fkUserDocumentTypeDocumentId: {
        name: 'fkUserDocumentTypeDocumentId',
        entity: 'TypeDocumentTb',
        entityKey: 'id',
        foreignKey: 'TypeDocumentID',
      },
    }
  }
})
export class UserDocumentTb extends Entity {
  // Define well-known properties here
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'number',
    generated: true,
  })
  UserID: number;

  @property({
    type: 'string',
    mysql: {
      dataLength: 20,
      nullable: 'N'
    },
  })
  Document?: string;

  @property({
    type: 'number',
  })
  TypeDocumentID: number;

  @property({
    type: 'string',
    mysql: {
      dataLength: 60,
      nullable: 'N'
    },
  })
  PlaceExpedition?: string;


  @property({
    type: 'Date',
  })
  DateExpedition: Date;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserDocumentTb>) {
    super(data);
  }
}

export interface UserDocumentTbRelations {
  // describe navigational properties here
}

export type UserDocumentTbWithRelations = UserDocumentTb & UserDocumentTbRelations;
