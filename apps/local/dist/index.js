"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const catalog_1 = __importDefault(require("./routes/catalog"));
const invoicing_1 = __importDefault(require("./routes/invoicing"));
const inventory_1 = __importStar(require("./routes/inventory"));
const accounting_1 = __importDefault(require("./routes/accounting"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
let currentTenantId;
app.use((req, _res, next) => {
    const tenantId = req.headers['x-tenant-id'];
    if (tenantId) {
        currentTenantId = tenantId;
        (0, inventory_1.setCurrentTenantId)(tenantId);
    }
    next();
});
prisma.$use(async (params, next) => {
    if (!currentTenantId) {
        return next(params);
    }
    const tenantTables = [
        'Company',
        'User',
        'Role',
        'UserRole',
        'Category',
        'Product',
        'Tax',
        'Account',
        'AccountingPeriod',
        'JournalEntry',
        'JournalEntryLine',
        'NcfSequence',
        'Invoice',
        'InvoiceLine',
        'InventoryMovement',
        'InventoryBalance',
        'SyncQueue',
        'AuditLog',
    ];
    if (params.model && tenantTables.includes(params.model)) {
        if (params.action === 'findMany' || params.action === 'findFirst' || params.action === 'findUnique') {
            if (!params.args) {
                params.args = {};
            }
            params.args.where = {
                ...(params.args.where || {}),
                tenantId: currentTenantId,
            };
        }
        if (params.action === 'create') {
            if (!params.args) {
                params.args = {};
            }
            params.args.data = {
                ...params.args.data,
                tenantId: currentTenantId,
            };
        }
        if (params.action === 'update' || params.action === 'delete') {
            if (!params.args) {
                params.args = {};
            }
            params.args.where = {
                ...(params.args.where || {}),
                tenantId: currentTenantId,
            };
        }
    }
    return next(params);
});
app.get('/health', async (_req, res) => {
    const tenantCount = await prisma.tenant.count();
    res.json({
        status: 'ok',
        tenantId: currentTenantId,
        tenantCount,
    });
});
app.use('/catalog', catalog_1.default);
app.use('/invoicing', invoicing_1.default);
app.use('/inventory', inventory_1.default);
app.use('/accounting', accounting_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Local app running on http://localhost:${PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsMkNBQThDO0FBQzlDLCtEQUE2QztBQUM3QyxtRUFBaUQ7QUFDakQsZ0VBQXlFO0FBQ3pFLHFFQUFtRDtBQUVuRCxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUN0QixNQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztBQUVsQyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV4QixJQUFJLGVBQW1DLENBQUM7QUFFeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDMUIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQVcsQ0FBQztJQUN0RCxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2IsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUMzQixJQUFBLDhCQUFrQixFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxZQUFZLEdBQUc7UUFDbkIsU0FBUztRQUNULE1BQU07UUFDTixNQUFNO1FBQ04sVUFBVTtRQUNWLFVBQVU7UUFDVixTQUFTO1FBQ1QsS0FBSztRQUNMLFNBQVM7UUFDVCxrQkFBa0I7UUFDbEIsY0FB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cHJlc3MnO1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuaW1wb3J0IGNhdGFsb2dSb3V0ZXMgZnJvbSAnLi9yb3V0ZXMvY2F0YWxvZyc7XG5pbXBvcnQgaW52b2ljaW5nUm91dGVzIGZyb20gJy4vcm91dGVzL2ludm9pY2luZyc7XG5pbXBvcnQgaW52ZW50b3J5Um91dGVzLCB7IHNldEN1cnJlbnRUZW5hbnRJZCB9IGZyb20gJy4vcm91dGVzL2ludmVudG9yeSc7XG5pbXBvcnQgYWNjb3VudGluZ1JvdXRlcyBmcm9tICcuL3JvdXRlcy9hY2NvdW50aW5nJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcblxubGV0IGN1cnJlbnRUZW5hbnRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG5hcHAudXNlKChyZXEsIF9yZXMsIG5leHQpID0+IHtcbiAgY29uc3QgdGVuYW50SWQgPSByZXEuaGVhZGVyc1sneC10ZW5hbnQtaWQnXSBhcyBzdHJpbmc7XG4gIGlmICh0ZW5hbnRJZCkge1xuICAgIGN1cnJlbnRUZW5hbnRJZCA9IHRlbmFudElkO1xuICAgIHNldEN1cnJlbnRUZW5hbnRJZCh0ZW5hbnRJZCk7XG4gIH1cbiAgbmV4dCgpO1xufSk7XG5cbnByaXNtYS4kdXNlKGFzeW5jIChwYXJhbXMsIG5leHQpID0+IHtcbiAgaWYgKCFjdXJyZW50VGVuYW50SWQpIHtcbiAgICByZXR1cm4gbmV4dChwYXJhbXMpO1xuICB9XG5cbiAgY29uc3QgdGVuYW50VGFibGVzID0gW1xuICAgICdDb21wYW55JyxcbiAgICAnVXNlcicsXG4gICAgJ1JvbGUnLFxuICAgICdVc2VyUm9sZScsXG4gICAgJ0NhdGVnb3J5JyxcbiAgICAnUHJvZHVjdCcsXG4gICAgJ1RheCcsXG4gICAgJ0FjY291bnQnLFxuICAgICdBY2NvdW50aW5nUGVyaW9kJyxcbiAgICAnSm91cm5hbEVudHJ5JyxcbiAgICAnSm91cm5hbEVudHJ5TGluZScsXG4gICAgJ05jZlNlcXVlbmNlJyxcbiAgICAnSW52b2ljZScsXG4gICAgJ0ludm9pY2VMaW5lJyxcbiAgICAnSW52ZW50b3J5TW92ZW1lbnQnLFxuICAgICdJbnZlbnRvcnlCYWxhbmNlJyxcbiAgICAnU3luY1F1ZXVlJyxcbiAgICAnQXVkaXRMb2cnLFxuICBdO1xuXG4gIGlmIChwYXJhbXMubW9kZWwgJiYgdGVuYW50VGFibGVzLmluY2x1ZGVzKHBhcmFtcy5tb2RlbCkpIHtcbiAgICBpZiAocGFyYW1zLmFjdGlvbiA9PT0gJ2ZpbmRNYW55JyB8fCBwYXJhbXMuYWN0aW9uID09PSAnZmluZEZpcnN0JyB8fCBwYXJhbXMuYWN0aW9uID09PSAnZmluZFVuaXF1ZScpIHtcbiAgICAgIGlmICghcGFyYW1zLmFyZ3MpIHtcbiAgICAgICAgcGFyYW1zLmFyZ3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIHBhcmFtcy5hcmdzLndoZXJlID0ge1xuICAgICAgICAuLi4ocGFyYW1zLmFyZ3Mud2hlcmUgfHwge30pLFxuICAgICAgICB0ZW5hbnRJZDogY3VycmVudFRlbmFudElkLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmFjdGlvbiA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGlmICghcGFyYW1zLmFyZ3MpIHtcbiAgICAgICAgcGFyYW1zLmFyZ3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIHBhcmFtcy5hcmdzLmRhdGEgPSB7XG4gICAgICAgIC4uLnBhcmFtcy5hcmdzLmRhdGEsXG4gICAgICAgIHRlbmFudElkOiBjdXJyZW50VGVuYW50SWQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMuYWN0aW9uID09PSAndXBkYXRlJyB8fCBwYXJhbXMuYWN0aW9uID09PSAnZGVsZXRlJykge1xuICAgICAgaWYgKCFwYXJhbXMuYXJncykge1xuICAgICAgICBwYXJhbXMuYXJncyA9IHt9O1xuICAgICAgfVxuICAgICAgcGFyYW1zLmFyZ3Mud2hlcmUgPSB7XG4gICAgICAgIC4uLihwYXJhbXMuYXJncy53aGVyZSB8fCB7fSksXG4gICAgICAgIHRlbmFudElkOiBjdXJyZW50VGVuYW50SWQsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXh0KHBhcmFtcyk7XG59KTtcblxuYXBwLmdldCgnL2hlYWx0aCcsIGFzeW5jIChfcmVxLCByZXMpID0+IHtcbiAgY29uc3QgdGVuYW50Q291bnQgPSBhd2FpdCBwcmlzbWEudGVuYW50LmNvdW50KCk7XG4gIHJlcy5qc29uKHtcbiAgICBzdGF0dXM6ICdvaycsXG4gICAgdGVuYW50SWQ6IGN1cnJlbnRUZW5hbnRJZCxcbiAgICB0ZW5hbnRDb3VudCxcbiAgfSk7XG59KTtcblxuYXBwLnVzZSgnL2NhdGFsb2cnLCBjYXRhbG9nUm91dGVzKTtcbmFwcC51c2UoJy9pbnZvaWNpbmcnLCBpbnZvaWNpbmdSb3V0ZXMpO1xuYXBwLnVzZSgnL2ludmVudG9yeScsIGludmVudG9yeVJvdXRlcyk7XG5hcHAudXNlKCcvYWNjb3VudGluZycsIGFjY291bnRpbmdSb3V0ZXMpO1xuXG5jb25zdCBQT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAxO1xuXG5hcHAubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgY29uc29sZS5sb2coYPCfmoAgTG9jYWwgYXBwIHJ1bm5pbmcgb24gaHR0cDovL2xvY2FsaG9zdDoke1BPUlR9YCk7XG59KTtcbiJdfQ==