import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get('movements')
  findMovements() {
    return this.inventoryService.findMovements();
  }

  @Post('movements')
  createMovement(@Body() body: any) {
    return this.inventoryService.createMovement(body);
  }

  @Get('balances')
  findBalances() {
    return this.inventoryService.findBalances();
  }
}
