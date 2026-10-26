import { RolesService } from './roles.service';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
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
    create(body: {
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
    update(id: string, body: {
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
