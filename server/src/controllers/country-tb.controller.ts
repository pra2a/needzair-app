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
import {CountryTb} from '../models';
import {CountryTbRepository} from '../repositories';

export class CountryTbController {
  constructor(
    @repository(CountryTbRepository)
    public countryTbRepository : CountryTbRepository,
  ) {}

  @post('/country-tbs')
  @response(200, {
    description: 'CountryTb model instance',
    content: {'application/json': {schema: getModelSchemaRef(CountryTb)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryTb, {
            title: 'NewCountryTb',
            exclude: ['id'],
          }),
        },
      },
    })
    countryTb: Omit<CountryTb, 'id'>,
  ): Promise<CountryTb> {
    return this.countryTbRepository.create(countryTb);
  }

  @get('/country-tbs/count')
  @response(200, {
    description: 'CountryTb model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CountryTb) where?: Where<CountryTb>,
  ): Promise<Count> {
    return this.countryTbRepository.count(where);
  }

  @get('/country-tbs')
  @response(200, {
    description: 'Array of CountryTb model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CountryTb, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CountryTb) filter?: Filter<CountryTb>,
  ): Promise<CountryTb[]> {
    return this.countryTbRepository.find(filter);
  }

  @patch('/country-tbs')
  @response(200, {
    description: 'CountryTb PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryTb, {partial: true}),
        },
      },
    })
    countryTb: CountryTb,
    @param.where(CountryTb) where?: Where<CountryTb>,
  ): Promise<Count> {
    return this.countryTbRepository.updateAll(countryTb, where);
  }

  @get('/country-tbs/{id}')
  @response(200, {
    description: 'CountryTb model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CountryTb, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CountryTb, {exclude: 'where'}) filter?: FilterExcludingWhere<CountryTb>
  ): Promise<CountryTb> {
    return this.countryTbRepository.findById(id, filter);
  }

  @patch('/country-tbs/{id}')
  @response(204, {
    description: 'CountryTb PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryTb, {partial: true}),
        },
      },
    })
    countryTb: CountryTb,
  ): Promise<void> {
    await this.countryTbRepository.updateById(id, countryTb);
  }

  @put('/country-tbs/{id}')
  @response(204, {
    description: 'CountryTb PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() countryTb: CountryTb,
  ): Promise<void> {
    await this.countryTbRepository.replaceById(id, countryTb);
  }

  @del('/country-tbs/{id}')
  @response(204, {
    description: 'CountryTb DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.countryTbRepository.deleteById(id);
  }
}
