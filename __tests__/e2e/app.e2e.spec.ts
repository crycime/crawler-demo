import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/controller/app.controller';
import { AppService } from '../../src/service/app.service';

const path = '/app/crawler';

describe(`GET ${path}`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleBuilder = Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [AppService],
    });
    const compiledApp: TestingModule = await moduleBuilder.compile();
    const appModule = compiledApp.createNestApplication();
    app = await appModule.init();
  });

  describe('success cases', () => {
    it('should return crawler response', async () => {
      const response = await request(app.getHttpServer()).get(path);
      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toMatchSnapshot();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });
});
