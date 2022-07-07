import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserDocumentTb} from '../models';
import {UserDocumentTbRepository} from '../repositories';

export class UserDocumentTbController {
  constructor(
    @repository(UserDocumentTbRepository)
    public userDocumentTbRepository : UserDocumentTbRepository,
  ) {}

  @post('/user-document-tbs')
  @response(200, {
    description: 'UserDocumentTb model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserDocumentTb)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocumentTb, {
            title: 'NewUserDocumentTb',
            exclude: ['UserID'],
          }),
        },
      },
    })
    userDocumentTb: Omit<UserDocumentTb, 'UserID'>,
  ): Promise<UserDocumentTb> {
    return this.userDocumentTbRepository.create(userDocumentTb);
  }

  @get('/user-document-tbs/count')
  @response(200, {
    description: 'UserDocumentTb model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserDocumentTb) where?: Where<UserDocumentTb>,
  ): Promise<Count> {
    return this.userDocumentTbRepository.count(where);
  }

  @get('/user-document-tbs')
  @response(200, {
    description: 'Array of UserDocumentTb model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserDocumentTb, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserDocumentTb) filter?: Filter<UserDocumentTb>,
  ): Promise<UserDocumentTb[]> {
    return this.userDocumentTbRepository.find(filter);
  }

  @patch('/user-document-tbs')
  @response(200, {
    description: 'UserDocumentTb PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocumentTb, {partial: true}),
        },
      },
    })
    userDocumentTb: UserDocumentTb,
    @param.where(UserDocumentTb) where?: Where<UserDocumentTb>,
  ): Promise<Count> {
    return this.userDocumentTbRepository.updateAll(userDocumentTb, where);
  }

  @get('/user-document-tbs/{id}')
  @response(200, {
    description: 'UserDocumentTb model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserDocumentTb, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserDocumentTb, {exclude: 'where'}) filter?: FilterExcludingWhere<UserDocumentTb>
  ): Promise<UserDocumentTb> {
    return this.userDocumentTbRepository.findById(id, filter);
  }

  @patch('/user-document-tbs/{id}')
  @response(204, {
    description: 'UserDocumentTb PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocumentTb, {partial: true}),
        },
      },
    })
    userDocumentTb: UserDocumentTb,
  ): Promise<void> {
    await this.userDocumentTbRepository.updateById(id, userDocumentTb);
  }

  @put('/user-document-tbs/{id}')
  @response(204, {
    description: 'UserDocumentTb PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userDocumentTb: UserDocumentTb,
  ): Promise<void> {
    await this.userDocumentTbRepository.replaceById(id, userDocumentTb);
  }

  @del('/user-document-tbs/{id}')
  @response(204, {
    description: 'UserDocumentTb DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userDocumentTbRepository.deleteById(id);
  }
}
