"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const id = await deps.users.idFromBearerToken(token);
        res.locals.user = await deps.users.getSelf(id);
    }
    finally {
        return next();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVzdC9taWRkbGV3YXJlL3VwZGF0ZS11c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWUsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3ZFLElBQUk7UUFDRixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBVyxDQUFDO1FBQ2pELE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ2hEO1lBQVM7UUFDUixPQUFPLElBQUksRUFBRSxDQUFDO0tBQ2Y7QUFDSCxDQUFDLENBQUEifQ==