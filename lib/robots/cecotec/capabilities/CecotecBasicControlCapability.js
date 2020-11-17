const BasicControlCapability = require("../../../core/capabilities/BasicControlCapability");

module.exports = class CecotecBasicControlCapability extends BasicControlCapability {

    async start() {
        await this.robot.cmdServer.sendCommand("CLEAN_MODE", {
            mode: 1,
            unk1: 2
        });
    }

    async stop() {
        await this.robot.cmdServer.sendCommand("CLEAN_MODE", {
            mode: 2,
            unk1: 2
        });
    }

    async pause() {
        await this.robot.cmdServer.sendCommand("CLEAN_MODE", {
            mode: 2,
            unk1: 2
        });
    }

    async home() {
        await this.robot.cmdServer.sendCommand("RETURN_HOME", {
            unk1: 1
        });
    }

};
