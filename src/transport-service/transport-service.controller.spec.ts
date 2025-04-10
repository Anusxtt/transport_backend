import { Test, TestingModule } from '@nestjs/testing';
import { TransportServiceController } from './transport-service.controller';

describe('TransportServiceController', () => {
  let controller: TransportServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportServiceController],
    }).compile();

    controller = module.get<TransportServiceController>(
      TransportServiceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
