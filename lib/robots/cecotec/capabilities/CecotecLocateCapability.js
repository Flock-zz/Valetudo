const LocateCapability = require("../../../core/capabilities/LocateCapability");

module.exports = class CecotecLocateCapability extends LocateCapability {

    async locate() {
        await this.robot.cmdServer.sendCommand("LOCATE_DEVICE");
    }

};
