import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: string) {
    return this.prisma.role.findUnique({
      where: { id },
      include: { userRoles: { include: { user: true } } },
    });
  }

  async create(data: { name: string; description?: string; tenantId: string }) {
    return this.prisma.role.create({
      data,
    });
  }

  async update(id: string, data: { name?: string; description?: string }) {
    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
