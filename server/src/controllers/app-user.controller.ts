import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  IsolationLevel,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Password} from '../common/Password';
import {AppUserTB, ContactInfoTb, UserDocumentTb} from '../models';
import {ContactInfoTbRepository, UserDocumentTbRepository, UserRepository} from '../repositories';

export class AppUserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserDocumentTbRepository)
    public userDocumentTbRepository: UserDocumentTbRepository,
    @repository(ContactInfoTbRepository)
    public contactInfoTbRepository: ContactInfoTbRepository,
  ) { }

  @post('/users')
  @response(200, {
    description: 'AppUserTB model instance',
    content: {'application/json': {schema: getModelSchemaRef(AppUserTB)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUserTB, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<AppUserTB, 'id'>,
  ): Promise<AppUserTB> {
    const userExist = await this.findByEmail(user.email)
    if (userExist) {
      throw new HttpErrors[409]('The associated email already exists');
    }
    const encrypted = Password.encrypt(user.password);
    user.password = encrypted;
    user.verificationToken = await Password.generateRandomCode();
    return this.userRepository.create(user);
  }

  @get('/users/count')
  @response(200, {
    description: 'AppUserTB model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AppUserTB) where?: Where<AppUserTB>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of AppUserTB model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AppUserTB, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AppUserTB) filter?: Filter<AppUserTB>,
  ): Promise<AppUserTB[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'AppUserTB PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUserTB, {partial: true}),
        },
      },
    })
    user: AppUserTB,
    @param.where(AppUserTB) where?: Where<AppUserTB>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'AppUserTB model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AppUserTB, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AppUserTB, {exclude: 'where'}) filter?: FilterExcludingWhere<AppUserTB>
  ): Promise<AppUserTB> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'AppUserTB PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUserTB, {partial: true}),
        },
      },
    })
    user: AppUserTB,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'AppUserTB PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: AppUserTB,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'AppUserTB DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  // ------------------------------------------------------------ //

  async findByEmail(email: string): Promise<unknown> {
    const filter = {
      where: {
        email: email
      }
    };
    const result = await this.userRepository.findOne(filter);
    return result;
  }


  @post('/usersAll')
  @response(200, {
    description: 'AppUserTB model instance',
    content: {'application/json': {schema: getModelSchemaRef(AppUserTB)}},
  })
  async createAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUserTB, {
            title: 'NewUserAll',
            exclude: ['id'],
          }),
        },
      },
    })
    user: any,
  ): Promise<unknown> {
    // console.log(user);
    const transaction = await this.userRepository.dataSource.beginTransaction(
      IsolationLevel.SERIALIZABLE,
    );

    const transaction2 = await this.userDocumentTbRepository.dataSource.beginTransaction(
      IsolationLevel.SERIALIZABLE,
    );

    const transaction3 = await this.contactInfoTbRepository.dataSource.beginTransaction(
      IsolationLevel.SERIALIZABLE,
    );

    try {
      const userExist = await this.findByEmail(user.email)
      if (userExist) {
        throw new HttpErrors[409]('The associated email already exists');
      }

      const userNewData: Omit<AppUserTB, 'id'> = {
        "lastName": user.lastName,
        "isMilitar": user.isMilitar,
        "timeCreate": new Date(),
        "isTemporal": user.isTemporal,
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "emailVerified": false,
        "verificationToken": '',
      }

      const encrypted = Password.encrypt(user.password);
      userNewData.password = encrypted;
      userNewData.verificationToken = (await Password.generateRandomCode()).toString();

      // console.log(userNewData);

      const userCreated = await this.userRepository.create(userNewData);

      const UserDocumentTbNewData: Omit<UserDocumentTb, 'id'> = {
        "UserID": userCreated.id,
        "Document": user.documentNumber,
        "TypeDocumentID": user.documentType,
        "PlaceExpedition": user.placeExpedition,
        "DateExpedition": user.dateExpedition,
      }

      // console.log(UserDocumentTbNewData);


      await this.userDocumentTbRepository.create(UserDocumentTbNewData);


      const contactInfoTbNewData: Omit<ContactInfoTb, 'id'> = {
        "UserID": userCreated.id,
        "Address": user.address,
        "CountryID": user.countryId,
        "City": user.city,
        "Phone": user.phone,
        "CelPhone": user.cellphone,
        "EmergencyName": user.emergencyName,
        "EmergencyPhone": user.emergencyPhone,
      }

      // console.log(contactInfoTbNewData);

      await this.contactInfoTbRepository.create(contactInfoTbNewData);


      await transaction.commit();
      await transaction2.commit();
      await transaction3.commit();

      return {
        "message": "User created successfully",
        "statusCode": 201,
        userCreated
      }

    } catch (error) {
      await transaction.rollback();
      await transaction2.rollback();
      await transaction3.rollback();
      console.log(error);
      return error
    }


  }

}
