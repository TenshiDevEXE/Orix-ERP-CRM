import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<({
        company: {
            id: string;
            tenantId: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            rnc: string;
            tradeName: string | null;
            address: string | null;
            phone: string | null;
            itbisType: string;
            ncfSequenceType: string;
            accountingPeriodStart: Date;
            settings: import("@prisma/client/runtime/library").JsonValue;
        } | null;
        userRoles: ({
            role: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                permissions: import("@prisma/client/runtime/library").JsonValue;
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
        companyId: string | null;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string | null;
        status: string;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<({
        company: {
            id: string;
            tenantId: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            rnc: string;
            tradeName: string | null;
            address: string | null;
            phone: string | null;
            itbisType: string;
            ncfSequenceType: string;
            accountingPeriodStart: Date;
            settings: import("@prisma/client/runtime/library").JsonValue;
        } | null;
        userRoles: ({
            role: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                permissions: import("@prisma/client/runtime/library").JsonValue;
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
        companyId: string | null;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string | null;
        status: string;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    update(id: string, body: any): Promise<{
        company: {
            id: string;
            tenantId: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            rnc: string;
            tradeName: string | null;
            address: string | null;
            phone: string | null;
            itbisType: string;
            ncfSequenceType: string;
            accountingPeriodStart: Date;
            settings: import("@prisma/client/runtime/library").JsonValue;
        } | null;
    } & {
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
    }>;
    assignRole(id: string, roleId: string): Promise<{
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
        role: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            permissions: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: string;
        assignedAt: Date;
        assignedBy: string | null;
        userId: string;
        roleId: string;
    }>;
}
