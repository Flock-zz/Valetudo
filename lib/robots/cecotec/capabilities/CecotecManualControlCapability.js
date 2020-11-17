const ManualControlCapability = require("../../../core/capabilities/ManualControlCapability");

const MANUAL_MODE_COMMANDS = {
    FORWARD: 1,
    LEFT: 2,
    RIGHT: 3,
    BACKWARD: 4,
    STOP: 5,
    INIT: 10
};

module.exports = class CecotecManualControlCapability extends ManualControlCapability {

    async enterManualControl() {
        await this.robot.cmdServer.sendCommand("CLEAN_MODE", { mode: 0, unk1: 2 });
        await this.robot.cmdServer.sendCommand("SET_MANUAL", { command: MANUAL_MODE_COMMANDS.INIT });

        this.robot.state.upsertFirstMatchingAttribute(this.robot.deviceStatus.getStatusState());
        this.robot.emitStateUpdated();
    }

    async leaveManualControl() {
        await this.robot.cmdServer.sendCommand("CLEAN_MODE", {
            mode: 2,
            unk1: 2
        });

        this.robot.state.upsertFirstMatchingAttribute(this.robot.deviceStatus.getStatusState());
        this.robot.emitStateUpdated();
    }

    async manualControl() {
        // @FIXME: arguments has been changed.
        // let command = MANUAL_MODE_COMMANDS.STOP;

        // if (Math.abs(velocity) > Math.abs(angle)) {
        //     if (velocity > 0) {
        //         command = MANUAL_MODE_COMMANDS.FORWARD;
        //     } else if (velocity < 0) {
        //         command = MANUAL_MODE_COMMANDS.BACKWARD;
        //     }
        // } else {
        //     if (angle > 0) {
        //         command = MANUAL_MODE_COMMANDS.LEFT;
        //     } else if (angle < 0) {
        //         command = MANUAL_MODE_COMMANDS.RIGHT;
        //     }
        // }

        // await this.cmdServer.sendCommand("SET_MANUAL", { command });
    }

};
