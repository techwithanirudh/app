"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateInvite(codeLength = 7) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < codeLength; i++)
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}
exports.default = generateInvite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtaW52aXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RhdGEvdXRpbHMvZ2VuZXJhdGUtaW52aXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBd0IsY0FBYyxDQUFDLFVBQVUsR0FBRyxDQUFDO0lBQ25ELE1BQU0sVUFBVSxHQUFHLGdFQUFnRSxDQUFDO0lBQ3BGLE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUUzQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUU7UUFDakMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQzVFLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFSRCxpQ0FRQyJ9