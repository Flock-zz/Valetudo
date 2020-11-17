const ZoneCleaningCapability = require("../../../core/capabilities/ZoneCleaningCapability");
const { randomNumber } = require("../helpers");

module.exports = class CecotecZoneCleaningCapability extends ZoneCleaningCapability {

    async startCleaningZoneByCoords(zones) {
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

            return {
                cleanAreaId: randomNumber(1, 1e6),
                unk1: 0,
                coordinateLength: 4,
                coordinateList: [a, b, c, d]
            };
        });

        await robot.cmdServer.sendCommand("SET_AREA", data);
        await robot.cmdServer.sendCommand("CLEAN_AREA", { unk1: 1 });
    }

};
