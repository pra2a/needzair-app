import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CountryTb extends Entity {
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
      dataLength: 4,
      nullable: 'N'
    },
  })
  CountryCode?: string;

  @property({
    type: 'string',
    mysql: {
      dataLength: 100,
      nullable: 'N'
    },
  })
  CountryName?: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CountryTb>) {
    super(data);
  }
}

export interface CountryTbRelations {
  // describe navigational properties here
}

export type CountryTbWithRelations = CountryTb & CountryTbRelations;
