"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const api_error_1 = require("../modules/api-error");
const update_user_1 = __importDefault(require("../middleware/update-user"));
const validate_user_1 = __importDefault(require("../middleware/validate-user"));
exports.router = (0, express_1.Router)();
exports.router.get('/:channelId/messages', update_user_1.default, validate_user_1.default, async (req, res) => {
    const channelId = req.params.channelId;
    const user = res.locals.user;
    const canAccess = deps.wsGuard.canInChannel('READ_MESSAGES', channelId, user.id);
    if (!canAccess)
        throw new api_error_1.APIError(403, 'Insufficient permissions');
    const channelMsgs = (await deps.messages.getChannelMessages(channelId)
        ?? await deps.messages.getDMChannelMessages(channelId, res.locals.user.id));
    const batchSize = 25;
    const back = Math.max(channelMsgs.length - +(req.query.back || batchSize), 0);
    const slicedMsgs = channelMsgs
        .slice(back)
        .filter(m => !user.ignored?.userIds.includes(m.authorId));
    const index = slicedMsgs.length - 1;
    const lastMessage = slicedMsgs[index];
    if (lastMessage) {
        await deps.pings.markAsRead(user, lastMessage);
        deps.webSocket.io
            .to(user.id)
            .emit('USER_UPDATE', {
            userId: user.id,
            partialUser: { lastReadMessageIds: user.lastReadMessageIds },
        });
    }
    res.json({
        channelId,
        total: channelMsgs.length,
        list: slicedMsgs,
    });
});
exports.router.get('/:id', update_user_1.default, validate_user_1.default, async (req, res) => {
    const channel = await deps.channels.get(req.params.id);
    res.json(channel);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC1yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVzdC9yb3V0ZXMvY2hhbm5lbC1yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUNBQWlDO0FBRWpDLG9EQUFnRDtBQUNoRCw0RUFBbUQ7QUFDbkQsZ0ZBQXVEO0FBRzFDLFFBQUEsTUFBTSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRS9CLGNBQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUscUJBQVUsRUFBRSx1QkFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDOUUsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDdkMsTUFBTSxJQUFJLEdBQXFCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRS9DLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pGLElBQUksQ0FBQyxTQUFTO1FBQ1osTUFBTSxJQUFJLG9CQUFRLENBQUMsR0FBRyxFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFFdEQsTUFBTSxXQUFXLEdBQUcsQ0FDbEIsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztXQUM5QyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUMzRSxDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFOUUsTUFBTSxVQUFVLEdBQUcsV0FBVztTQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFNUQsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLElBQUksV0FBVyxFQUFFO1FBQ2YsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2FBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDWCxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtTQUN2QyxDQUFDLENBQUM7S0FDNUI7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsU0FBUztRQUNULEtBQUssRUFBRSxXQUFXLENBQUMsTUFBTTtRQUN6QixJQUFJLEVBQUUsVUFBVTtLQUNpQyxDQUFDLENBQUM7QUFDdkQsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxxQkFBVSxFQUFFLHVCQUFZLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUM5RCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkQsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyJ9