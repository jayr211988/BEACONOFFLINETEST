import moment from 'moment';


/**
 * Validate Required Fields
 * 
 * @export
 * @param {any} value
 * @returns
 */
export function required(value) { 
    return value == null || value === '' ? '*Required' : undefined;
}



/**
 *  Validate with 2 Decimal Point
 * 
 * @export
 * @param {any} value
 * @returns
 */
export function amountWithDecimal(value) {
    return value && !/^[0-9]+(\.[0-9]{1,2})?$/i.test(value)  ? 'Invalid Input' : undefined;
}


/**
 * Validate Email
 * 
 * @export
 * @param {any} value
 * @returns
 */
export function email(value) {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email' : undefined;
}

/**
 * Accept Numbers Only
 * 
 * @export
 * @param {any} value
 * @returns
 */
export function number(value) {
    return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
}

/**
 * Accept Letters Only
 * 
 * @export
 * @param {any} value
 * @returns
 */
export function letter(value) {
    return value && !/^[ñÑa-zA-Z\s]*$/i.test(value) ? 'Must be a letter only' : undefined;
}

/**
 * Accept Letters with spceial charac. -,/
 * 
 * @export
 * @param {any} value
 * @returns
 */

export function letterWithSpecial(value) {
    return value && !/^[ñÑa-zA-Z-,.'/\s]*$/i.test(value) ? 'Must be a letter, single qoute, comma, dash, dot or slash only.' : undefined;
}


/**
 * Minimum Value of 0
 * 
 * @export
 * @param {any} value
 * @returns
 */
export function minValue0(value) {
    return value && value < 0 ? 'Must be at least 0' : undefined;
}

const minLength = min => value => value && value.length < min ? `Must be ${min} character(s) or higher ` : undefined;
export const minLength14 = minLength(14);
export const minLength7 = minLength(7);

const maxLength = max => value =>  value && value.length > max ? `Must be ${max} character(s) or less` : undefined;
export const maxLength2500 = maxLength(2500);
export const maxLength500 = maxLength(500);
export const maxLength250 = maxLength(250);
export const maxLength200 = maxLength(200);
export const maxLength150 = maxLength(150);
export const maxLength100 = maxLength(100);
export const maxLength60 = maxLength(60);
export const maxLength50 = maxLength(50);
export const maxLength40 = maxLength(40);
export const maxLength30 = maxLength(30);
export const maxLength20 = maxLength(20);
export const maxLength15 = maxLength(15);
export const maxLength14 = maxLength(14);
export const maxLength12 = maxLength(12);
export const maxLength11 = maxLength(11);
export const maxLength10 = maxLength(10);
export const maxLength9 = maxLength(9);
export const maxLength8 = maxLength(8);
export const maxLength7 = maxLength(7);
export const maxLength6 = maxLength(6);
export const maxLength5 = maxLength(5);
export const maxLength4 = maxLength(4);
export const maxLength3 = maxLength(3);
export const maxLength2 = maxLength(2);
export const maxLength1 = maxLength(1);

export function maxDateShouldBeToday(value) {
    return  moment(value).toDate() > new Date() ? 'Exceeded Max Date' : null;
};


export function validDate(value) {
    return  !moment(value,'YYYY-MM-DD',true).isValid() ?  'Invalid Date Format' : null;
};


export function validTime(value) {

    const message = !moment(value,'hh:mm A',true).isValid() ?  'Invalid Time Format' : null;

    // console.log('validate time')
    // console.log(value);
    // console.log(message);

    return message;
};