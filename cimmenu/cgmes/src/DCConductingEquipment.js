import templates from "../../templates/index.js"
import Equipment from "./Equipment.js"
import common from "../../src/common.js"

class DCConductingEquipment extends Equipment {

    static attributeHTML(object, cimmenu, classType="DCConductingEquipment") {
        let attributeEntries = Equipment.attributeHTML(object, cimmenu, classType);
        return attributeEntries;
    }

    static isMemberAttribute(attribute) {
        let attributes = [
        ];
        if ( attribute.substr(0,8) == "pintura:") {
            return true;
        }
        if ( attributes.indexOf(attribute) >= 0 ) {
            return true;
        }
        else if ( Equipment.isMemberAttribute(attribute) ) {
            return true;
        }
        else {
            return false;
        }
    }

    static read(object) {
        Object.keys(object).forEach((attribute) => {
            if (!DCConductingEquipment.isMemberAttribute(attribute)) {
                console.error("Unexpected attribute for class DCConductingEquipment: ", attribute, " with value: ", object[attribute])
            }
        });
    }
    static renderAsClass(object, cimmenu) {
        let separateEntries = DCConductingEquipment.attributeHTML(object, cimmenu);
        let filledEntries = separateEntries['filledEntries'];
        let emptyEntries = separateEntries['emptyEntries'];
        let attributeEntries = { ...filledEntries, ...emptyEntries };
        return templates.handlebars_cim_class_render({ 'attributes': attributeEntries});
    }
    static renderAsAttribute(matchingComponents) {
        let template = templates.handlebars_cim_update_complex_type;
        return template(matchingComponents);
    }
    static subClassList() {
        let subClasses = [
        "DCBusbar",
        "DCChopper",
        "DCGround",
        "DCLineSegment",
        "DCSeriesDevice",
        "DCShunt",
        "DCSwitch",
        "DCBreaker",
        "DCDisconnector",
        ];
        return subClasses;
    }
};
export default DCConductingEquipment
