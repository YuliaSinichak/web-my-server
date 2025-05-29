import { Controller, Get, Post, Body } from '@nestjs/common';
import { BuildingsService, Building } from './buildings.service';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  async getBuildings() {
    return this.buildingsService.getBuildings();
  }

  @Post()
  async saveBuilding(
    @Body() body: {
      userId: string;
      row: number;
      col: number;
      type: string;
      isUpgraded: boolean;
      upgradedIcon?: string | null;
    },
  ) {
    const { userId, row, col, type, isUpgraded, upgradedIcon } = body;
    await this.buildingsService.saveBuilding(userId, row, col, type, isUpgraded, upgradedIcon);
    return { message: 'Building saved' };
  }
}
