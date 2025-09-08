import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('healthz')
  async healthCheck() {
    return this.healthService.getHealthStatus();
  }

  @Get('readinessz')
  async readinessCheck() {
    return this.healthService.getReadinessStatus();
  }
}
