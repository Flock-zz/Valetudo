const DoNotDisturbCapability = require("../../../core/capabilities/DoNotDisturbCapability");
const ValetudoDNDConfiguration = require("../../../entities/core/ValetudoDNDConfiguration");

module.exports = class CecotecDoNotDisturbCapability extends DoNotDisturbCapability {

    async getDndConfiguration() {
        return new ValetudoDNDConfiguration({
            enabled: false,
            start: {
                hour: 0,
                minute: 0
            },
            end: {
                hour: 0,
                minute: 0
            }
        });
    }

};
