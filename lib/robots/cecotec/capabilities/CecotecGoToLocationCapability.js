const GoToLocationCapability = require("../../../core/capabilities/GoToLocationCapability");

module.exports = class CecotecGoToLocationCapability extends GoToLocationCapability {

    async goTo({ coordinates: { x, y } }) {
        // hardcoded pixel size
        // remember to invert map coords...
        const pose = this.robot.map.getAbsolutePosition({ x: x / 5, y: y / 5 });

        await this.robot.cmdServer.sendCommand("SET_POSITION", {
            mapHeadId: this.robot.map.id,
            poseX: pose.x,
            poseY: pose.y,
            posePhi: 0.0,
            update: 1
        });
    }

};
