"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const tenant_middleware_1 = require("../common/tenant.middleware");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super();
        this.$use(async (params, next) => {
            const tenantId = (0, tenant_middleware_1.getTenantId)();
            if (!tenantId) {
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
                        tenantId,
                    };
                }
                if (params.action === 'create') {
                    if (!params.args) {
                        params.args = {};
                    }
                    params.args.data = {
                        ...params.args.data,
                        tenantId,
                    };
                }
                if (params.action === 'update' || params.action === 'delete') {
                    if (!params.args) {
                        params.args = {};
                    }
                    params.args.where = {
                        ...(params.args.where || {}),
                        tenantId,
                    };
                }
            }
            return next(params);
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpc21hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJpc21hL3ByaXNtYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDJDQUEyRTtBQUMzRSwyQ0FBOEM7QUFDOUMsbUVBQTBEO0FBR25ELElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWMsU0FBUSxxQkFBWTtJQUM3QztRQUNFLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQy9CLE1BQU0sUUFBUSxHQUFHLElBQUEsK0JBQVcsR0FBRSxDQUFDO1lBRS9CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBRUQsTUFBTSxZQUFZLEdBQUc7Z0JBQ25CLFNBQVM7Z0JBQ1QsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFVBQVU7Z0JBQ1YsVUFBVTtnQkFDVixTQUFTO2dCQUNULEtBQUs7Z0JBQ0wsU0FBUztnQkFDVCxrQkFBa0I7Z0JBQ2xCLGNBQWM7Z0JBQ2Qsa0JBQWtCO2dCQUNsQixhQUFhO2dCQUNiLFNBQVM7Z0JBQ1QsYUFBYTtnQkFDYixtQkFBbUI7Z0JBQ25CLGtCQUFrQjtnQkFDbEIsV0FBVztnQkFDWCxVQUFVO2FBQ1gsQ0FBQztZQUVGLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN4RCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssWUFBWSxFQUFFLENBQUM7b0JBQ3BHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNuQixDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHO3dCQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUM1QixRQUFRO3FCQUNULENBQUM7Z0JBQ0osQ0FBQztnQkFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFLENBQUM7b0JBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNuQixDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHO3dCQUNqQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTt3QkFDbkIsUUFBUTtxQkFDVCxDQUFDO2dCQUNKLENBQUM7Z0JBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRSxDQUFDO29CQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNqQixNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRzt3QkFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzt3QkFDNUIsUUFBUTtxQkFDVCxDQUFDO2dCQUNKLENBQUM7WUFDSCxDQUFDO1lBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVk7UUFDaEIsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlO1FBQ25CLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FDRixDQUFBO0FBM0VZLHNDQUFhO3dCQUFiLGFBQWE7SUFEekIsSUFBQSxtQkFBVSxHQUFFOztHQUNBLGFBQWEsQ0EyRXpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Nb2R1bGVJbml0LCBPbk1vZHVsZURlc3Ryb3kgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5pbXBvcnQgeyBnZXRUZW5hbnRJZCB9IGZyb20gJy4uL2NvbW1vbi90ZW5hbnQubWlkZGxld2FyZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcmlzbWFTZXJ2aWNlIGV4dGVuZHMgUHJpc21hQ2xpZW50IGltcGxlbWVudHMgT25Nb2R1bGVJbml0LCBPbk1vZHVsZURlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy4kdXNlKGFzeW5jIChwYXJhbXMsIG5leHQpID0+IHtcbiAgICAgIGNvbnN0IHRlbmFudElkID0gZ2V0VGVuYW50SWQoKTtcblxuICAgICAgaWYgKCF0ZW5hbnRJZCkge1xuICAgICAgICByZXR1cm4gbmV4dChwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0ZW5hbnRUYWJsZXMgPSBbXG4gICAgICAgICdDb21wYW55JyxcbiAgICAgICAgJ1VzZXInLFxuICAgICAgICAnUm9sZScsXG4gICAgICAgICdVc2VyUm9sZScsXG4gICAgICAgICdDYXRlZ29yeScsXG4gICAgICAgICdQcm9kdWN0JyxcbiAgICAgICAgJ1RheCcsXG4gICAgICAgICdBY2NvdW50JyxcbiAgICAgICAgJ0FjY291bnRpbmdQZXJpb2QnLFxuICAgICAgICAnSm91cm5hbEVudHJ5JyxcbiAgICAgICAgJ0pvdXJuYWxFbnRyeUxpbmUnLFxuICAgICAgICAnTmNmU2VxdWVuY2UnLFxuICAgICAgICAnSW52b2ljZScsXG4gICAgICAgICdJbnZvaWNlTGluZScsXG4gICAgICAgICdJbnZlbnRvcnlNb3ZlbWVudCcsXG4gICAgICAgICdJbnZlbnRvcnlCYWxhbmNlJyxcbiAgICAgICAgJ1N5bmNRdWV1ZScsXG4gICAgICAgICdBdWRpdExvZycsXG4gICAgICBdO1xuXG4gICAgICBpZiAocGFyYW1zLm1vZGVsICYmIHRlbmFudFRhYmxlcy5pbmNsdWRlcyhwYXJhbXMubW9kZWwpKSB7XG4gICAgICAgIGlmIChwYXJhbXMuYWN0aW9uID09PSAnZmluZE1hbnknIHx8IHBhcmFtcy5hY3Rpb24gPT09ICdmaW5kRmlyc3QnIHx8IHBhcmFtcy5hY3Rpb24gPT09ICdmaW5kVW5pcXVlJykge1xuICAgICAgICAgIGlmICghcGFyYW1zLmFyZ3MpIHtcbiAgICAgICAgICAgIHBhcmFtcy5hcmdzID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmFtcy5hcmdzLndoZXJlID0ge1xuICAgICAgICAgICAgLi4uKHBhcmFtcy5hcmdzLndoZXJlIHx8IHt9KSxcbiAgICAgICAgICAgIHRlbmFudElkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLmFjdGlvbiA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgICBpZiAoIXBhcmFtcy5hcmdzKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXJncyA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJhbXMuYXJncy5kYXRhID0ge1xuICAgICAgICAgICAgLi4ucGFyYW1zLmFyZ3MuZGF0YSxcbiAgICAgICAgICAgIHRlbmFudElkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLmFjdGlvbiA9PT0gJ3VwZGF0ZScgfHwgcGFyYW1zLmFjdGlvbiA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgICBpZiAoIXBhcmFtcy5hcmdzKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXJncyA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJhbXMuYXJncy53aGVyZSA9IHtcbiAgICAgICAgICAgIC4uLihwYXJhbXMuYXJncy53aGVyZSB8fCB7fSksXG4gICAgICAgICAgICB0ZW5hbnRJZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXh0KHBhcmFtcyk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBvbk1vZHVsZUluaXQoKSB7XG4gICAgYXdhaXQgdGhpcy4kY29ubmVjdCgpO1xuICB9XG5cbiAgYXN5bmMgb25Nb2R1bGVEZXN0cm95KCkge1xuICAgIGF3YWl0IHRoaXMuJGRpc2Nvbm5lY3QoKTtcbiAgfVxufVxuIl19