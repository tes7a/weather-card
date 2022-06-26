import {validators} from "./validators";

export const validateInfo = (field: string, value: string) => {
    //conditions for input validation are stored here,
    // if you need to add a new validation or condition, then write here

    //validators for name input
    if (field === "city") {
        if (!value.trim()) {
            return "This field in required";
        } else if (!validators.nameValidator.test(String(value).toLowerCase())) {
            return "Only letters allowed";
        }
    }

    return "";
}

