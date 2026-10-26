import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tenant.findMany({
      include: { companies: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.tenant.findUnique({
      where: { id },
      include: { companies: true },
    });
  }

  async create(data: any) {
    return this.prisma.tenant.create({
      data,
      include: { companies: true },
    });
  }

  async update(id: string, data: { name?: string; rnc?: string; status?: string }) {
    return this.prisma.tenant.update({
      where: { id },
      data,
      include: { companies: true },
    });
  }

  async remove(id: string) {
    return this.prisma.tenant.delete({
      where: { id },
    });
  }
}
