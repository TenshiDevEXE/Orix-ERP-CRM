import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: { company: true, userRoles: { include: { role: true } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { company: true, userRoles: { include: { role: true } } },
    });
  }

  async update(id: string, data: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }) {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { company: true },
    });
  }

  async assignRole(userId: string, roleId: string) {
    return this.prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
      include: { role: true, user: true },
    });
  }

  async removeRole(userId: string, roleId: string) {
    return this.prisma.userRole.deleteMany({
      where: {
        userId,
        roleId,
      },
    });
  }
}
