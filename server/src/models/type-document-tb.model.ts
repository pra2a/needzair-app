import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class TypeDocumentTb extends Entity {
  // Define well-known properties here
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    mysql: {
      dataLength: 50,
      nullable: 'N'
    },
  })
  NameTypeDocument?: string;


  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TypeDocumentTb>) {
    super(data);
  }
}

export interface TypeDocumentTbRelations {
  // describe navigational properties here
}

export type TypeDocumentTbWithRelations = TypeDocumentTb & TypeDocumentTbRelations;
