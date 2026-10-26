import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            tenantId: any;
            companyId: any;
        };
    }>;
    register(body: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        companyId: string;
        tenantId: string;
    }): Promise<{
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
        id: string;
        tenantId: string;
        companyId: string | null;
        email: string;
        firstName: string;
        lastName: string | null;
        status: string;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(req: any): any;
}
