import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async findMovements() {
    return this.prisma.inventoryMovement.findMany({
      include: { product: true, company: true },
    });
  }

  async createMovement(data: any) {
    // Crear movimiento inmutable
    const movement = await this.prisma.inventoryMovement.create({
      data: {
        ...data,
        movementType: data.type,
        unitCost: 0,
        totalCost: 0,
        createdBy: 'system',
      },
      include: { product: true },
    });

    // Actualizar saldo (derivative calculation)
    const sign = data.type === 'out' ? -1 : 1;
    const existingBalance = await this.prisma.inventoryBalance.findFirst({
      where: { productId: data.productId },
    });

    if (existingBalance) {
      await this.prisma.inventoryBalance.update({
        where: { id: existingBalance.id },
        data: { quantityOnHand: { increment: sign * data.quantity } },
      });
    } else {
      await this.prisma.inventoryBalance.create({
        data: {
          productId: data.productId,
          companyId: data.companyId,
          quantityOnHand: sign * data.quantity,
          totalCost: 0,
        },
      } as any);
    }

    return movement;
  }

  async findBalances() {
    return this.prisma.inventoryBalance.findMany();
  }
}
