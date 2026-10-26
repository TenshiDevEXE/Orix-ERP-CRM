import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('catalog')
@UseGuards(JwtAuthGuard)
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Get('categories')
  findCategories() {
    return this.catalogService.findCategories();
  }

  @Post('categories')
  createCategory(@Body() body: any) {
    return this.catalogService.createCategory(body);
  }

  @Get('products')
  findProducts() {
    return this.catalogService.findProducts();
  }

  @Post('products')
  createProduct(@Body() body: any) {
    return this.catalogService.createProduct(body);
  }

  @Get('taxes')
  findTaxes() {
    return this.catalogService.findTaxes();
  }

  @Post('taxes')
  createTax(@Body() body: any) {
    return this.catalogService.createTax(body);
  }
}
