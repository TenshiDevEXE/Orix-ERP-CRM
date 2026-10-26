declare const router: import("express-serve-static-core").Router;
declare global {
    var currentTenantId: string | undefined;
}
export declare const setCurrentTenantId: (tenantId: string) => void;
export default router;
