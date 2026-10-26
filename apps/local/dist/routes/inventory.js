"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentTenantId = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const setCurrentTenantId = (tenantId) => {
    global.currentTenantId = tenantId;
};
exports.setCurrentTenantId = setCurrentTenantId;
router.get('/movements', async (_req, res) => {
    const movements = await prisma.inventoryMovement.findMany({
        include: { product: true, company: true },
    });
    res.json(movements);
});
router.post('/movements', async (req, res) => {
    const { companyId, productId, quantity, type } = req.body;
    // @ts-ignore
    // @ts-ignore
    const tenantId = global.currentTenantId || 'default';
    const movement = await prisma.inventoryMovement.create({
        data: {
            companyId,
            productId,
            quantity,
            movementType: type,
            referenceId: null,
            unitCost: 0,
            totalCost: 0,
            createdBy: 'system',
            tenantId,
        },
        include: { product: true },
    });
    const sign = type === 'out' ? -1 : 1;
    const existingBalance = await prisma.inventoryBalance.findFirst({
        where: { productId },
    });
    if (existingBalance) {
        await prisma.inventoryBalance.update({
            where: { id: existingBalance.id },
            data: { quantityOnHand: { increment: sign * quantity } },
        });
    }
    else {
        await prisma.inventoryBalance.create({
            data: {
                productId,
                companyId,
                quantityOnHand: sign * quantity,
                totalCost: 0,
            },
        });
    }
    res.json(movement);
});
router.get('/balances', async (_req, res) => {
    const balances = await prisma.inventoryBalance.findMany();
    res.json(balances);
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9pbnZlbnRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLDJDQUE4QztBQUU5QyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2hDLE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFDO0FBTTNCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDckQsTUFBTSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7QUFDcEMsQ0FBQyxDQUFDO0FBRlcsUUFBQSxrQkFBa0Isc0JBRTdCO0FBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUMzQyxNQUFNLFNBQVMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUM7UUFDeEQsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0tBQzFDLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQzNDLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQzFELGFBQWE7SUFDYixhQUFhO0lBQ2YsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGVBQWUsSUFBSSxTQUFTLENBQUM7SUFFbkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1FBQ3JELElBQUksRUFBRTtZQUNKLFNBQVM7WUFDVCxTQUFTO1lBQ1QsUUFBUTtZQUNSLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsU0FBUyxFQUFFLENBQUM7WUFDWixTQUFTLEVBQUUsUUFBUTtZQUNuQixRQUFRO1NBQ1Q7UUFDRCxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0tBQ3BCLENBQUMsQ0FBQztJQUVWLE1BQU0sSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsTUFBTSxlQUFlLEdBQUcsTUFBTSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1FBQzlELEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRTtLQUNyQixDQUFDLENBQUM7SUFFSCxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztZQUNuQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsZUFBZSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxHQUFHLFFBQVEsRUFBRSxFQUFFO1NBQ3pELENBQUMsQ0FBQztJQUNMLENBQUM7U0FBTSxDQUFDO1FBQ04sTUFBTSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1lBQ25DLElBQUksRUFBRTtnQkFDSixTQUFTO2dCQUNULFNBQVM7Z0JBQ1QsY0FBYyxFQUFFLElBQUksR0FBRyxRQUFRO2dCQUMvQixTQUFTLEVBQUUsQ0FBQzthQUNiO1NBQ0ssQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQzFDLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbmNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcblxuZGVjbGFyZSBnbG9iYWwge1xuICB2YXIgY3VycmVudFRlbmFudElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBzZXRDdXJyZW50VGVuYW50SWQgPSAodGVuYW50SWQ6IHN0cmluZykgPT4ge1xuICBnbG9iYWwuY3VycmVudFRlbmFudElkID0gdGVuYW50SWQ7XG59O1xuXG5yb3V0ZXIuZ2V0KCcvbW92ZW1lbnRzJywgYXN5bmMgKF9yZXEsIHJlcykgPT4ge1xuICBjb25zdCBtb3ZlbWVudHMgPSBhd2FpdCBwcmlzbWEuaW52ZW50b3J5TW92ZW1lbnQuZmluZE1hbnkoe1xuICAgIGluY2x1ZGU6IHsgcHJvZHVjdDogdHJ1ZSwgY29tcGFueTogdHJ1ZSB9LFxuICB9KTtcbiAgcmVzLmpzb24obW92ZW1lbnRzKTtcbn0pO1xuXG5yb3V0ZXIucG9zdCgnL21vdmVtZW50cycsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGNvbXBhbnlJZCwgcHJvZHVjdElkLCBxdWFudGl0eSwgdHlwZSB9ID0gcmVxLmJvZHk7XG4gIC8vIEB0cy1pZ25vcmVcbiAgLy8gQHRzLWlnbm9yZVxuY29uc3QgdGVuYW50SWQgPSBnbG9iYWwuY3VycmVudFRlbmFudElkIHx8ICdkZWZhdWx0JztcblxuICBjb25zdCBtb3ZlbWVudCA9IGF3YWl0IHByaXNtYS5pbnZlbnRvcnlNb3ZlbWVudC5jcmVhdGUoe1xuICAgIGRhdGE6IHtcbiAgICAgIGNvbXBhbnlJZCxcbiAgICAgIHByb2R1Y3RJZCxcbiAgICAgIHF1YW50aXR5LFxuICAgICAgbW92ZW1lbnRUeXBlOiB0eXBlLFxuICAgICAgcmVmZXJlbmNlSWQ6IG51bGwsXG4gICAgICB1bml0Q29zdDogMCxcbiAgICAgIHRvdGFsQ29zdDogMCxcbiAgICAgIGNyZWF0ZWRCeTogJ3N5c3RlbScsXG4gICAgICB0ZW5hbnRJZCxcbiAgICB9LFxuICAgIGluY2x1ZGU6IHsgcHJvZHVjdDogdHJ1ZSB9LFxuICB9IGFzIGFueSk7XG5cbiAgY29uc3Qgc2lnbiA9IHR5cGUgPT09ICdvdXQnID8gLTEgOiAxO1xuICBjb25zdCBleGlzdGluZ0JhbGFuY2UgPSBhd2FpdCBwcmlzbWEuaW52ZW50b3J5QmFsYW5jZS5maW5kRmlyc3Qoe1xuICAgIHdoZXJlOiB7IHByb2R1Y3RJZCB9LFxuICB9KTtcblxuICBpZiAoZXhpc3RpbmdCYWxhbmNlKSB7XG4gICAgYXdhaXQgcHJpc21hLmludmVudG9yeUJhbGFuY2UudXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZ0JhbGFuY2UuaWQgfSxcbiAgICAgIGRhdGE6IHsgcXVhbnRpdHlPbkhhbmQ6IHsgaW5jcmVtZW50OiBzaWduICogcXVhbnRpdHkgfSB9LFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IHByaXNtYS5pbnZlbnRvcnlCYWxhbmNlLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgY29tcGFueUlkLFxuICAgICAgICBxdWFudGl0eU9uSGFuZDogc2lnbiAqIHF1YW50aXR5LFxuICAgICAgICB0b3RhbENvc3Q6IDAsXG4gICAgICB9LFxuICAgIH0gYXMgYW55KTtcbiAgfVxuXG4gIHJlcy5qc29uKG1vdmVtZW50KTtcbn0pO1xuXG5yb3V0ZXIuZ2V0KCcvYmFsYW5jZXMnLCBhc3luYyAoX3JlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IGJhbGFuY2VzID0gYXdhaXQgcHJpc21hLmludmVudG9yeUJhbGFuY2UuZmluZE1hbnkoKTtcbiAgcmVzLmpzb24oYmFsYW5jZXMpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiJdfQ==