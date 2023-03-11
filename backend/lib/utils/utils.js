"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFrom = exports.array = exports.checkForDuplicates = exports.useId = exports.generateUsername = exports.createdAtToDate = exports.getNameAcronym = void 0;
const faker_1 = require("faker");
const snowflake_entity_1 = require("../data/snowflake-entity");
function getNameAcronym(name) {
    return name
        .split(' ')
        .slice(0, 3)
        .map(str => str[0])
        .join('');
}
exports.getNameAcronym = getNameAcronym;
function createdAtToDate() {
    return (0, snowflake_entity_1.snowflakeToDate)(this.id);
}
exports.createdAtToDate = createdAtToDate;
function generateUsername() {
    return `${faker_1.hacker
        .adjective()
        .replace(/ /, '')}-${faker_1.hacker
        .noun()
        .replace(/ /, '')}`;
}
exports.generateUsername = generateUsername;
function useId() {
    const obj = this.toObject();
    this.id = this._id;
    delete this._id;
    return obj;
}
exports.useId = useId;
function checkForDuplicates(array) {
    return new Set(array).size !== array.length;
}
exports.checkForDuplicates = checkForDuplicates;
exports.array = {
    ascending: (a, b) => (a > b) ? 1 : -1,
};
function randomFrom(...arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}
exports.randomFrom = randomFrom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQStCO0FBRS9CLCtEQUEyRDtBQUUzRCxTQUFnQixjQUFjLENBQUMsSUFBWTtJQUN6QyxPQUFPLElBQUk7U0FDUixLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDWCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQU5ELHdDQU1DO0FBRUQsU0FBZ0IsZUFBZTtJQUM3QixPQUFPLElBQUEsa0NBQWUsRUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUZELDBDQUVDO0FBRUQsU0FBZ0IsZ0JBQWdCO0lBQzlCLE9BQU8sR0FBRyxjQUFNO1NBQ2IsU0FBUyxFQUFFO1NBQ1gsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxjQUFNO1NBQzFCLElBQUksRUFBRTtTQUNOLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQTtBQUN2QixDQUFDO0FBTkQsNENBTUM7QUFFRCxTQUFnQixLQUFLO0lBQ25CLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUU1QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBRWhCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQVBELHNCQU9DO0FBRUQsU0FBZ0Isa0JBQWtCLENBQUMsS0FBWTtJQUM3QyxPQUFPLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFBO0FBQzdDLENBQUM7QUFGRCxnREFFQztBQUVZLFFBQUEsS0FBSyxHQUFHO0lBQ25CLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN0QyxDQUFDO0FBRUYsU0FBZ0IsVUFBVSxDQUFDLEdBQUcsR0FBVTtJQUN0QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckQsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUhELGdDQUdDIn0=