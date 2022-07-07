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
import {ContactInfoTb} from '../models';
import {ContactInfoTbRepository} from '../repositories';

export class ContactInfoTbController {
  constructor(
    @repository(ContactInfoTbRepository)
    public contactInfoTbRepository : ContactInfoTbRepository,
  ) {}

  @post('/contact-info-tbs')
  @response(200, {
    description: 'ContactInfoTb model instance',
    content: {'application/json': {schema: getModelSchemaRef(ContactInfoTb)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfoTb, {
            title: 'NewContactInfoTb',
            exclude: ['id'],
          }),
        },
      },
    })
    contactInfoTb: Omit<ContactInfoTb, 'id'>,
  ): Promise<ContactInfoTb> {
    return this.contactInfoTbRepository.create(contactInfoTb);
  }

  @get('/contact-info-tbs/count')
  @response(200, {
    description: 'ContactInfoTb model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ContactInfoTb) where?: Where<ContactInfoTb>,
  ): Promise<Count> {
    return this.contactInfoTbRepository.count(where);
  }

  @get('/contact-info-tbs')
  @response(200, {
    description: 'Array of ContactInfoTb model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ContactInfoTb, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ContactInfoTb) filter?: Filter<ContactInfoTb>,
  ): Promise<ContactInfoTb[]> {
    return this.contactInfoTbRepository.find(filter);
  }

  @patch('/contact-info-tbs')
  @response(200, {
    description: 'ContactInfoTb PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfoTb, {partial: true}),
        },
      },
    })
    contactInfoTb: ContactInfoTb,
    @param.where(ContactInfoTb) where?: Where<ContactInfoTb>,
  ): Promise<Count> {
    return this.contactInfoTbRepository.updateAll(contactInfoTb, where);
  }

  @get('/contact-info-tbs/{id}')
  @response(200, {
    description: 'ContactInfoTb model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ContactInfoTb, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ContactInfoTb, {exclude: 'where'}) filter?: FilterExcludingWhere<ContactInfoTb>
  ): Promise<ContactInfoTb> {
    return this.contactInfoTbRepository.findById(id, filter);
  }

  @patch('/contact-info-tbs/{id}')
  @response(204, {
    description: 'ContactInfoTb PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfoTb, {partial: true}),
        },
      },
    })
    contactInfoTb: ContactInfoTb,
  ): Promise<void> {
    await this.contactInfoTbRepository.updateById(id, contactInfoTb);
  }

  @put('/contact-info-tbs/{id}')
  @response(204, {
    description: 'ContactInfoTb PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contactInfoTb: ContactInfoTb,
  ): Promise<void> {
    await this.contactInfoTbRepository.replaceById(id, contactInfoTb);
  }

  @del('/contact-info-tbs/{id}')
  @response(204, {
    description: 'ContactInfoTb DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contactInfoTbRepository.deleteById(id);
  }
}
