
const UPDATE_PHICALLCASERATE_NEWBORN = 'UPDATE_PHICALLCASERATE_NEWBORN';
const PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS';

/**
 * Check If User is Current User
 * 
 * @export
 * @param {any} user
 * @param {any} currentUser
 * @returns
 */
export function isCurrentUser (user, currentUser) {
    return user.id == currentUser.id;
}

export function getPhoto (photo) {
    return photo ? `${__QMU_FACILITY_}${photo}` : null;
}

/**
 * Compute Total Caserate Amount For Newborn Package
 * 
 * @export
 * @param {any} caseRate 
 * @param {any} selectedCf2 
 * @returns 
 */
export function onComputeTotalCaseRateAmountNewbornPackage(caseRate, selectedCf2, isChecked, phicAllCaseRates, value) {

    if(caseRate == null){
        let defaultValue = phicAllCaseRates.length !== 0 ? phicAllCaseRates[0].caseRateAmount !== 1750 ? 0 : 1750 : 1750;

        if (phicAllCaseRates.length !== 0) {

            if (isChecked) {
                phicAllCaseRates[0].caseRateAmount = phicAllCaseRates[0].caseRateAmount - defaultValue + value;
            }
            else {
                phicAllCaseRates[0].caseRateAmount = phicAllCaseRates[0].caseRateAmount - value;
                phicAllCaseRates[0].caseRateAmount = phicAllCaseRates[0].caseRateAmount == 0 ? 1750 : phicAllCaseRates[0].caseRateAmount;
            }
        }

        return {
            type: UPDATE_PHICALLCASERATE_NEWBORN,
            isChecked,
            selectedCf2,
            phicAllCaseRates
        };
    } 
    else {
        let newBornEssentialCare = selectedCf2.newBornEssentialCare ? 1000 : 0;
        let newBornHearingTest = selectedCf2.newBornHearingTest ? 200 : 0;
        let newBornScreeningTest = selectedCf2.newBornScreeningTest ? 550 : 0;

        let defaultCaseRateAmount = newBornEssentialCare || newBornHearingTest || newBornScreeningTest ? caseRate.caseRateAmount : 0;

        caseRate.caseRateAmount = caseRate.caseRateAmount + newBornEssentialCare + newBornHearingTest + newBornScreeningTest - defaultCaseRateAmount;
        caseRate = { ...caseRate, caseRateAmount: caseRate.caseRateAmount };

        return {
            type: PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS,
            payload: caseRate
        };
    }   

}