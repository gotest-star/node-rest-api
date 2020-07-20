import { Get, Injectable } from '@nestjs/common';
import { HealthCheckDto } from './dto/HealthCheck.dto';

@Injectable()
export class AppService {
  @Get('health-check')
  healthCheck(): HealthCheckDto {
    return {
      message: 'alive',
    };
  }
}
