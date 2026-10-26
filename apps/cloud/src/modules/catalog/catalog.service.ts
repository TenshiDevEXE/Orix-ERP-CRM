import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  // Categorías
  async findCategories() {
    return this.prisma.category.findMany();
  }

  async createCategory(data: any) {
    return this.prisma.category.create({ data });
  }

  // Productos
  async findProducts() {
    return this.prisma.product.findMany({
      include: { category: true, company: true },
    });
  }

  async createProduct(data: any) {
    return this.prisma.product.create({
      data,
      include: { category: true, company: true },
    });
  }

  // Impuestos
  async findTaxes() {
    return this.prisma.tax.findMany();
  }

  async createTax(data: any) {
    return this.prisma.tax.create({ data });
  }
}
