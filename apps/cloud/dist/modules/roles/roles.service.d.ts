import { PrismaService } from '../../prisma/prisma.service';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    findOne(id: string): Promise<({
        userRoles: ({
            user: {
                id: string;
                tenantId: string;
                companyId: string | null;
                email: string;
                passwordHash: string;
                firstName: string;
                lastName: string | null;
                status: string;
                lastLoginAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            assignedAt: Date;
            assignedBy: string | null;
            userId: string;
            roleId: string;
        })[];
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue;
    }) | null>;
    create(data: {
        name: string;
        description?: string;
        tenantId: string;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue;
    }>;
    update(id: string, data: {
        name?: string;
        description?: string;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue;
    }>;
    remove(id: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
