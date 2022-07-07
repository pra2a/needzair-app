import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'boolean',
  })
  isMilitar?: boolean;

  @property({
    type: 'Date',
  })
  timeCreate?: Date;

  @property({
    type: 'boolean',
  })
  isTemporal?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }

}

export interface UserRelations {
  // describe navigational properties here
}

@model({settings: {strict: false}})
export class AppUserTB extends User {

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
  })
  password: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'boolean',
  })
  emailVerified: boolean;

  @property({
    type: 'string',
  })
  verificationToken: string;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface AppUserTBRelations {
  // describe navigational properties here
}


export type UserWithRelations = AppUserTB & AppUserTBRelations;
