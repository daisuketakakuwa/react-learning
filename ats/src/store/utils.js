export const extractTypeFromAction = (action) => (action.type === "EFFECT_STEPS" ? action.payload.type : action.type);
