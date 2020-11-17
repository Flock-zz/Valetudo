const FanSpeedControlCapability = require("../../../core/capabilities/FanSpeedControlCapability");

module.exports = class CecotecFanSpeedControlCapability extends FanSpeedControlCapability {

    async setIntensity(preset) {
        const matchedPreset = this.presets.find(p => p.name === preset);

        if (matchedPreset) {
            await this.robot.cmdServer.sendCommand("SET_FAN_MODE", { mode: matchedPreset.value });
        } else {
            throw new Error("Invalid Preset");
        }
    }
};
