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
import {TypeDocumentTb} from '../models';
import {TypeDocumentTbRepository} from '../repositories';

export class TypeDocumentTbController {
  constructor(
    @repository(TypeDocumentTbRepository)
    public typeDocumentTbRepository : TypeDocumentTbRepository,
  ) {}

  @post('/type-document-tbs')
  @response(200, {
    description: 'TypeDocumentTb model instance',
    content: {'application/json': {schema: getModelSchemaRef(TypeDocumentTb)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeDocumentTb, {
            title: 'NewTypeDocumentTb',
            exclude: ['id'],
          }),
        },
      },
    })
    typeDocumentTb: Omit<TypeDocumentTb, 'id'>,
  ): Promise<TypeDocumentTb> {
    return this.typeDocumentTbRepository.create(typeDocumentTb);
  }

  @get('/type-document-tbs/count')
  @response(200, {
    description: 'TypeDocumentTb model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TypeDocumentTb) where?: Where<TypeDocumentTb>,
  ): Promise<Count> {
    return this.typeDocumentTbRepository.count(where);
  }

  @get('/type-document-tbs')
  @response(200, {
    description: 'Array of TypeDocumentTb model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TypeDocumentTb, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TypeDocumentTb) filter?: Filter<TypeDocumentTb>,
  ): Promise<TypeDocumentTb[]> {
    return this.typeDocumentTbRepository.find(filter);
  }

  @patch('/type-document-tbs')
  @response(200, {
    description: 'TypeDocumentTb PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeDocumentTb, {partial: true}),
        },
      },
    })
    typeDocumentTb: TypeDocumentTb,
    @param.where(TypeDocumentTb) where?: Where<TypeDocumentTb>,
  ): Promise<Count> {
    return this.typeDocumentTbRepository.updateAll(typeDocumentTb, where);
  }

  @get('/type-document-tbs/{id}')
  @response(200, {
    description: 'TypeDocumentTb model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TypeDocumentTb, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TypeDocumentTb, {exclude: 'where'}) filter?: FilterExcludingWhere<TypeDocumentTb>
  ): Promise<TypeDocumentTb> {
    return this.typeDocumentTbRepository.findById(id, filter);
  }

  @patch('/type-document-tbs/{id}')
  @response(204, {
    description: 'TypeDocumentTb PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeDocumentTb, {partial: true}),
        },
      },
    })
    typeDocumentTb: TypeDocumentTb,
  ): Promise<void> {
    await this.typeDocumentTbRepository.updateById(id, typeDocumentTb);
  }

  @put('/type-document-tbs/{id}')
  @response(204, {
    description: 'TypeDocumentTb PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() typeDocumentTb: TypeDocumentTb,
  ): Promise<void> {
    await this.typeDocumentTbRepository.replaceById(id, typeDocumentTb);
  }

  @del('/type-document-tbs/{id}')
  @response(204, {
    description: 'TypeDocumentTb DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.typeDocumentTbRepository.deleteById(id);
  }
}
