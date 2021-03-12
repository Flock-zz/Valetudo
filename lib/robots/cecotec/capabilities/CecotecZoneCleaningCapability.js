const ZoneCleaningCapability = require("../../../core/capabilities/ZoneCleaningCapability");
const { randomNumber } = require("../helpers");

module.exports = class CecotecZoneCleaningCapability extends ZoneCleaningCapability {

    //async startCleaningZoneByCoords(zones) {
    async start(zones) {
        const { robot } = this;
        const data = {
            mapHeadId: robot.map.id,
            unk1: 0,
            cleanAreaLength: zones.length
        };

        data.cleanAreaList = zones.map(({ points }) => {
            const a = robot.map.getAbsolutePosition({ x: points.pA.x / 5, y: points.pA.y / 5 });
            const b = robot.map.getAbsolutePosition({ x: points.pB.x / 5, y: points.pB.y / 5 });
            const c = robot.map.getAbsolutePosition({ x: points.pC.x / 5, y: points.pC.y / 5 });
            const d = robot.map.getAbsolutePosition({ x: points.pD.x / 5, y: points.pD.y / 5 });
            //const a = robot.map.getAbsolutePosition({ x: parseInt("0x3f4333e6"), y: parseInt("0xbecee6bb") });
            //const b = robot.map.getAbsolutePosition({ x: parseInt("0x3f4333e6") , y: parseInt("0xc06f9e78") });
            //const c = robot.map.getAbsolutePosition({ x: parseInt("0x401562b9") , y:  parseInt("0xc06f9e78") });
            //const d = robot.map.getAbsolutePosition({ x: parseInt("0x401562b9") , y: parseInt("0xbecee6bb") });
            //const a = robot.map.getAbsolutePosition({ x: Buffer.from([ 63,67,51,230 ]).readFloatBE(0) , y: Buffer.from([ 190,206,230,187 ]).readFloatBE(0) });
            //const b = robot.map.getAbsolutePosition({ x: Buffer.from([ 63,67,51,230 ]).readFloatBE(0) , y: Buffer.from([ 192,111,158,120 ]).readFloatBE(0) });
            //const c = robot.map.getAbsolutePosition({ x: Buffer.from([ 64,21,98,185 ]).readFloatBE(0) , y: Buffer.from([ 192,111,158,120 ]).readFloatBE(0) });
            //const d = robot.map.getAbsolutePosition({ x: Buffer.from([ 64,21,98,185 ]).readFloatBE(0) , y: Buffer.from([ 190,206,230,187 ]).readFloatBE(0) });
	
            return {
                cleanAreaId: randomNumber(1, 1e6),
                unk1: 0,
                coordinateLength: 4,
                coordinateList: [a,d,c,b]
                //coordinateList: [{ x: Buffer.from([ 63,67,51,230 ]).readFloatBE(0), y: parseInt("0xbecee6bb") }, b, c, d]
            };
        });

        await robot.cmdServer.sendCommand("SET_AREA", data);
        await robot.cmdServer.sendCommand("CLEAN_AREA", { unk1: 1 });
    }

};
