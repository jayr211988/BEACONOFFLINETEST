/**
 * Gives Format 0000-0000000-0 
 * 
 * @param {any} value 
 * @param {any} previousValue 
 * @returns 
 */
export const normalizeAccreditation = (value, previousValue) => {
    if (!value) {
        return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    if (!previousValue || value.length > previousValue.length) {
        // typing forward
        if (onlyNums.length === 4) {
            return onlyNums + '-';
        }
        if (onlyNums.length === 11) {
            return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4) + '-';
        }
    }
    if (onlyNums.length <= 4) {
        return onlyNums;
    }
    if (onlyNums.length <= 11) {
        return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4);
    }
    return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 11) + '-' + onlyNums.slice(11);
};


 /**
 * Capitalize the first letter
 * 
 * @param {any} value 
 */
export const capitalizeFirstLetter = value => value.charAt(0).toUpperCase() + value.slice(1); 

 /**
 * Uppercase Format
 * 
 * @param {any} value 
 */
export const upper = value => value && value.toUpperCase();


 /**
 * Lowercase Format
 * 
 * @param {any} value 
 */
export const lower = value => value && value.toLowerCase();








