import { Test, TestingModule } from '@nestjs/testing';
import { TransportTypeController } from './transport-type.controller';

describe('TransportTypeController', () => {
  let controller: TransportTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportTypeController],
    }).compile();

    controller = module.get<TransportTypeController>(TransportTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
