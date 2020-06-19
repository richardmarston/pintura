import templates from "../../templates/index.js"
import RegulatingControl from "./RegulatingControl.js"
import common from "../../src/common.js"

class TapChangerControl extends RegulatingControl {

    static attributeHTML(object, cimmenu, classType="TapChangerControl") {
        let attributeEntries = RegulatingControl.attributeHTML(object, cimmenu, classType);
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
        else if ( RegulatingControl.isMemberAttribute(attribute) ) {
            return true;
        }
        else {
            return false;
        }
    }

    static read(object) {
        Object.keys(object).forEach((attribute) => {
            if (!TapChangerControl.isMemberAttribute(attribute)) {
                console.error("Unexpected attribute for class TapChangerControl: ", attribute, " with value: ", object[attribute])
            }
        });
    }
    static renderAsClass(object, cimmenu) {
        let separateEntries = TapChangerControl.attributeHTML(object, cimmenu);
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
        ];
        return subClasses;
    }
};
export default TapChangerControl
