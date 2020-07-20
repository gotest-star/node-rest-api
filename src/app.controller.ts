import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { HealthCheckDto } from "./dto";

@ApiTags("Health Check")
@Controller("health-check")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    type: HealthCheckDto
  })
  @Get()
  healthCheck() {
    return this.appService.healthCheck();
  }
}
