const ConsumableStateAttribute = require("../../../entities/state/attributes/ConsumableStateAttribute");
const ConsumableMonitoringCapability = require("../../../core/capabilities/ConsumableMonitoringCapability");

const { TYPE, SUB_TYPE, UNITS } = ConsumableStateAttribute;
const MAIN_BRUSH_LIFE_TIME = 320;
const SIDE_BRUSH_LIFE_TIME = 220;
const FILTER_LIFE_TIME = 160;
const DISHCLOTH_LIFE_TIME = 160;
const UNKNOWN = "unknown";

function waitFor(fn) {
    return new Promise(resolve => {
        let timer = setInterval(check, 50);

        function check() {
            const ret = fn();

            if (ret) {
                clearInterval(timer);
                resolve();
            }
        }

        check();
    });
}

module.exports = class CecotecConsumableMonitoringCapability extends ConsumableMonitoringCapability {

    async getConsumables() {
        await waitFor(() => this.robot.deviceStatus.getStatusStateValue() !== UNKNOWN);

        const { packet: { data } } = await this.robot.cmdServer.sendCommand("GET_CONSUMABLES_PARAM");
        const consumables = [
            new ConsumableStateAttribute({
                type: TYPE.BRUSH,
                subType: SUB_TYPE.MAIN,
                remaining: {
                    unit: UNITS.MINUTES,
                    value: Math.max(MAIN_BRUSH_LIFE_TIME - data.mainBrushTime, 0)
                }
            }),
            new ConsumableStateAttribute({
                type: TYPE.BRUSH,
                subType: SUB_TYPE.SIDE_RIGHT,
                remaining: {
                    unit: UNITS.MINUTES,
                    value: Math.max(SIDE_BRUSH_LIFE_TIME - data.sideBrushTime, 0)
                }
            }),
            new ConsumableStateAttribute({
                type: TYPE.FILTER,
                subType: SUB_TYPE.MAIN,
                remaining: {
                    unit: UNITS.MINUTES,
                    value: Math.max(FILTER_LIFE_TIME - data.filterTime, 0)
                }
            }),
            new ConsumableStateAttribute({
                type: TYPE.SENSOR,
                subType: SUB_TYPE.ALL,
                remaining: {
                    unit: UNITS.MINUTES,
                    value: Math.max(MAIN_BRUSH_LIFE_TIME - data.mainBrushTime, 0)
                }
            }),
            new ConsumableStateAttribute({
                type: TYPE.MOP,
                subType: SUB_TYPE.MAIN,
                remaining: {
                    unit: UNITS.MINUTES,
                    value: Math.max(DISHCLOTH_LIFE_TIME - data.dishclothTime, 0)
                }
            }),
        ];

        consumables.forEach(c => this.robot.state.upsertFirstMatchingAttribute(c));

        this.robot.emitStateUpdated();

        return consumables;
    }

};
