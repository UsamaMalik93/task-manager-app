import { Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async forceSeedDatabase() {
    await this.seedService.forceSeedDatabase();
    return { message: 'Database seeded successfully' };
  }
}
