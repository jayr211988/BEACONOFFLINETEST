// *** TRANSMITTAL STATUS
export const transmittalStatus = {
    draft : 0,
    transmitted : 1,
    transmitting : 2,
    transmitError : 3,
    complete : 4
};

// *** CLAIM STATUS
export const claimStatus = {
    memberNotValid : 0,
    memberValid: 1,
    eligible: 2,
    notEligible: 3,
    inProcess: 4,
    return: 5,
    denied: 6,
    withCheque : 7,
    withVoucher : 8,
    vouchering : 9,
    conditional : 10
};

// *** CLAIM TYPE
export const claimType = {
    allCaseRate: 0,
    zBenefits: 1    
};

// **** HCI TYPE
export const phichciType = {
    na : 0,
    level1 : 1,
    level2 : 2,
    level3 : 3,
    primaryCareFacilities : 4,
    ambulatorySurgicalClinic : 5,
    maternityCarePackages : 6,
    freeStandingDialysisClinic : 7
};

// *** Package
export const phicPackage = {
    regular : 0,
    maternity : 1,
    animalBite : 2,
    newbornCare : 3,
    tbDots : 4,
    cataract : 5,
    hivaidsTreatment : 6    
};

export const memberTypes = {
    employedPrivate: 'S',
    employerGovernment: 'G',
    indigent: 'I',
    individualPaying: 'NS',
    ofw: 'NO',
    nonPayingPrivate: 'PS',
    nonPayingGovernment: 'PG',
    lifetimeMember: 'P'
};


// *** INTEGRATION PRODUCT TYPE
export const qmuApiType = {
    qmuToEhrPrivate : 'QMU to EHR Private API is already exists.',
    qmuToEhr : 'QMU To EHR API already exists.'
};

// *** INITIAL DATA
export const initialData = {
    memberTypes : [
        { code : 'S', value : 'Employed Private' }, 
        { code : 'G', value: 'Employer Government'},
        { code : 'I', value : 'Indigent'},
        { code : 'NS', value : 'Individual Paying'},
        { code : 'NO', value : 'OFW'},
        { code : 'PS', value : 'Non Paying Private'},
        { code : 'PG', value : 'Non Paying Government'},
        { code : 'P', value : 'Lifetime Member'}
    ], 
    accomodationType : [
        { code: 'P', value: 'Private' },
        { code: 'N', value: 'Non-Private' }
    ],
    patientDisposition : [
        { code: 'I', value: 'Improved' },
        { code: 'R', value: 'Recovered' },
        { code: 'H', value: 'Home/Discharge Againts Medical Advice' },
        { code: 'A', value: 'Absconded' },
        { code: 'E', value: 'Expired' },
        { code: 'T', value: 'Transferred/Referred' },
    ],

    patientIs : [
        { code: 'S', value : 'Spouse'},
        { code: 'C', value : 'Child'},
        { code: 'P', value : 'Parent'}        
    ],   

    patientType: [
        { code : 'I', value: 'Inpatient'},
        { code : 'O', value: 'Outpatient'},
        { code : 'E', value: 'Emergency'}
    ],


    zBenefits : [
        { value : 'Standard Risk Acute Lymphocytic (lymphoblastic) Leukemia for Children',
            items : [
                { code : 'Z0011' , value : '1st Tranche', checked: false},
                { code : 'Z0012' , value : '2nd Tranche', checked: false },
                { code : 'Z0013' , value : '3rd Tranche', checked: false }                
            ]},
        {
            value : 'Early State Breast Cance (Stage 0 to III-A)',
            items : [
                { code : 'Z0021', value : '1st Tranche', checked: false },
                { code : 'Z0022', value : '2nd Tranche', checked: false },
            ]},
        {
            value : 'Low to Intermediate Risk Prostate',
            items : [
                { code : 'Z003', value : 'Full Payment', checked: false }
            ]},
        {
            value : 'End Stage Renal Disease Eligible for Kidney Transplant (Low Risk)',
            items : [
                { code : 'Z0041', value : '1st Tranche', checked: false },
                { code : 'Z0042', value : '2nd Tranche', checked: false },
            ]},
        {
            value : 'Elective Surgery for Standard Risk Coronary Artery Bypass Graft',
            items : [
                { code : 'Z0051', value : '1st Tranche', checked: false },
                { code : 'Z0052', value : '2nd Tranche', checked: false },
            ]},
        {
            value : 'Tetralogy of Fallot (TOF)',
            items : [
                { code : 'Z0061', value : '1st Tranche', checked: false },
                { code : 'Z0062', value : '2nd Tranche', checked: false },
            ]},
        {
            value : 'Venticular Septal Defect (VSD)',
            items : [
                { code : 'Z0071', value : '1st Tranche', checked: false },
                { code : 'Z0072', value : '2nd Tranche', checked: false },
            ]},
        {
            value : 'Cervical Cancer Chemoradiation with Cobalt and Branchytherapy (Low Dose) or Primary Surgery for Stage IA1, IA2 - IIA1',
            items: [
                { code : 'Z0091', value : '1st Tranche', checked: false },
                { code : 'Z0092', value : '2nd Tranche', checked: false }
            ]}
    ],

    laterality: [
        { code: 'N', value: 'N/A' },
        { code: 'L', value: 'Left' },
        { code: 'R', value: 'Right' },
        { code: 'B', value: 'Both' }
    ],

    repetitiveProceduresType: [
        { code: 'HEMODIALYSIS', value: 'Hemodialysis' },
        { code: 'PERITONEAL', value: 'Peritoneal' },
        { code: 'LINAC', value: 'Radiotherapy (LINAC)' },
        { code: 'COBALT', value: 'Radiotherapy (COBALT)' },
        { code: 'TRANSFUSION', value: 'Blood Transfusion' },
        { code: 'BRACHYTHERAPHY', value: 'Brachytherapy' },
        { code: 'CHEMOTHERAPY', value: 'Chemotherapy' },
        { code: 'DEBRIDEMENT', value: 'Simple Debridement' },
        { code: 'IMRT', value: 'IMRT' }
    ],    

    documentType: [
        { code: 'ANR', value: 'Anesthesia Record' },
        { code: 'CAB', value: 'Clinical Abstract' },
        { code: 'CAE', value: 'Certification of Approval / Agreement from the Employer' },
        { code: 'CF1', value: 'Claim Form 1' },
        { code: 'CF2', value: 'Claim Form 2' },
        { code: 'CF3', value: 'Claim Form 3' },
        { code: 'COE', value: 'Certificate of Eligibility' },
        { code: 'CSF', value: 'Claim Signature Form' },
        { code: 'CTR', value: 'Confirmatory Test Results by SACCL or RITM' },
        { code: 'DTR', value: 'Diagnostic Test Result' },
        { code: 'HDR', value: 'Hemodialysis Record' },
        { code: 'MBC', value: 'Member\'s Birth Certificate' },
        { code: 'MDR', value: 'Proof of MDR with Payment Details' },
        { code: 'MEF', value: 'Member Empowerment Form' },
        { code: 'MMC', value: 'Member\'s Marriage Contract' },
        { code: 'MRF', value: 'PhilHealth Member Registration Form' },
        { code: 'MSR', value: 'Malarial Smear Results' },
        { code: 'MWV', value: 'Waiver for Consent for Release of Confidential Patient Health Information' },
        { code: 'NTP', value: 'NTP Registry Card' },
        { code: 'OPR', value: 'Operative Record' },
        { code: 'ORS', value: 'Official Receipts' },
        { code: 'PAC', value: 'Pre-Authorization Clearance' },
        { code: 'PBC', value: 'Patient\'s Birth Certificate' },
        { code: 'PIC', value: 'Valid Philhealth Indigent ID' },
        { code: 'POR', value: 'PhilHealth Official Receipts' },
        { code: 'SOA', value: 'Statement of Account' },
        { code: 'STR', value: 'HIV Screening Test Result' },
        { code: 'TCC', value: 'TB-Diagnostic Committee Certification (-) Sputum' },
        { code: 'TYP', value: 'Three Years Payment of (2400 x 3 years of proof of payment)' }
        
        

    ],
    phicPackage: [        
        // { code : '0' ,  value : 'N/A'},
        { code : '0' ,  value : 'Regular'},
        { code : '1' ,  value : 'Maternity'},
        { code : '2' ,  value : 'Animal Bite'},
        { code : '3' ,  value : 'Newborn Care'},
        { code : '4' ,  value : 'TB DOTS'},
        { code : '5' ,  value : 'Cataract'},
        // { code : '6' ,  value : 'HIV/AIDS Treatment'},
    ],
    hcitype : [
        { code : '0', value : 'N/A'},
        { code : '1', value : 'Level 1'},
        { code : '2', value : 'Level 2'},
        { code : '3', value : 'Level 3'},
        { code : '4', value : 'Primary Care Facilities'},
        { code : '5', value : 'Ambulatory Surgical Clinic'},
        { code : '6', value : 'Maternity Care Packages'},
        { code : '7', value : 'Free Standing Dialysis Clinic'}
    ],
    consentType : [
        { code : '1', value : 'Signature of patient' },
        { code : '2', value : 'Signature of representative' },
        { code : '3', value : 'Thumb mark'}
    ],
    relationshipToPatient : [
        { code : 'S', value : 'Spouse'},
        { code : 'C', value : 'Child'},
        { code : 'P', value : 'Parent'},
        { code : 'I', value : 'Siblings'},
        { code : 'O', value : 'Others'},
    ],
    reasonForSigning : [
        { code : 'I', value : 'Patient is incapacitated'},
        { code : 'O', value : 'Other Reasons'},
    ],
    thumbMark : [
        { code : 'P', value : 'By patient/member'},
        { code : 'R', value : 'By representative'},
    ],
    patientDiagnosticType: [
        { code: 'IMAGING', value: 'IMAGING' },
        { code: 'LABORATORY', value: 'LABORATORY' },
        { code: 'SUPPLIES', value: 'SUPPLIES' },
        { code: 'OTHERS', value: 'OTHERS' }
    ],

    claimType: [
        { code: '0', value: 'All Case Rate' },
        { code: '1', value: 'Z - Benefits' }
    ]
};



export const fakePropsData = {
    checkboxValue: 0,
    editPhicClaimDetailCf2RequestPending: false,
    getSelectedPhicClaimDetailCf2RequestPending: false,
    listOfZBenefits: [],
    location: {
	action:"REPLACE",
    hash:"",
    key:"83133c",
    pathname: "/phic-claims-details/624/summary/627",
    query:{},
    search:"",
    state: undefined,
    params: {
            cf1mode: "summary",
            claimId: "672",
            transmittalId: "624"
        }
    },
    phicAllCaseRates: [],
    selectedCf2: {
            accomodationTypeCode : null,
            accomodationTypeValue: null,
            admissionDate:  "2017-07-13T03:57:57.093",
            admissionDateTime:  "2017-07-13T03:57:57.093",
            admissionDiagnosis : null,
            admissionTime :"2017-06-05T16:00:00",
            allCaseRate:null,
            animalBiteDay0ARV:undefined,
            animalBiteDay3ARV:undefined,
            animalBiteDay7ARV:undefined,
            animalBiteOthers:undefined,
            animalBiteRIG:undefined,
            animalBiteSpecify:null,
            aprConsentTypeCode:"1",
            aprConsentTypeValue:null,
            aprDate:"2017-06-13T16:00:00",
            aprReasonForSigningCode:null,
            aprReasonForSigningOthers:null,
            aprReasonForSigningValue:null,
            aprRelationToPatientCode:null,
            aprRelationToPatientValue:null,
            aprRelationshipToPatientOthers:null,
            aprThumbmarkedByCode:null,
            aprThumbmarkedByValue:null,
            cataractLeftExpiryDate:null,
            cataractLeftIOLStickerNumber:null,
            cataractPreAuth:null,
            cataractRightExpiryDate:null,
            cataractRightIOLStickerNumber:null,
            claimType:"0",
            claimTypeDescription:"ALL CASE RATE",
            createdBy:"gstarr",
            createdById:17,
            dateCreated:"2017-07-13T03:57:57.093",
            dateUpdated:"2017-07-13T03:57:57.093",
            dischargeDate:"2017-07-13T03:57:57.093",
            dischargeDateTime:"2017-07-12T16:00:00",
            dischargeTime:"2017-07-13T03:57:57.093",
            doesPatientHasEnoughBenefits:null,
            expiredDate:undefined,
            expiredDateTime:null,
            expiredTime:undefined,
            firstCaseRate:null,
            grandTotal:0,
            hivLabNumber:null,
            hospitalFeesActualCharges:0,
            hospitalFeesAmountAfterDiscount:0,
            hospitalFeesDidPatientPay:null,
            hospitalFeesExcessAmount:0,
            hospitalFeesPatientHasHMO:null,
            hospitalFeesPatientHasOtherDeductions:null,
            hospitalFeesPhilHealthBenefit:0,
            id:627,
            isPatientReferred:null,
            mcP1stCheckupDate:undefined,
            mcP2ndCheckupDate:undefined,
            mcP3rdCheckupDate:undefined,
            mcP4thCheckupDate:undefined,
            newBornBCGVaccination:false,
            newBornEarlySkinToSkin:false,
            newBornEssentialCare:false,
            newBornEyeProphylaxis:false,
            newBornFilterCardNumber:null,
            newBornHearingTest:false,
            newBornHepaB:false,
            newBornImmediateDrying:false,
            newBornNonSeparationMotherBaby:false,
            newBornScreeningTest:false,
            newBornTimelyCordClamping:false,
            newBornVitaminKAdmin:false,
            newBornWeighing:false,
            patientDispositionCode:null,
            patientDispositionValue:null,
            patientTypeCode:null,
            patientTypeValue:null,
            professionalFeesActualCharges:0,
            professionalFeesAmountAfterDiscount:0,
            professionalFeesDidPatientPay:null,
            professionalFeesExcessAmount:0,
            professionalFeesPatientHasHMO:null,
            professionalFeesPatientHasOtherDeductions:null,
            professionalFeesPhilHealthBenefit:0,
            purchasesWithDrugsMedSupplies:null,
            purchasesWithDrugsMedSuppliesAmount:0,
            purchasesWithExaminations:null,
            purchasesWithExaminationsAmount:0,
            referralFacilityAccreditationCode:null,
            referralReason:null,
            referrredFacilityAccreditationCode:null,
            secondCaseRate:null,
            surgicalProcedures:[],
            tbDotsNTPCardNumber:null,
            tbDotsType:null,
            totalHospitalFees:0,
            totalProfessionalFees:0,
            updatedBy:null,
            updatedById:0,
            version:0,
            zBenefitCode:null,
            zBenefitDescription:null,
            zBenefitValue:null
    },
    selectedClaim: {
        claimIssuesTotal: 0,
        claimSeriesLhio: null,
        claimStatus:2,
        claimStatusDescription:"ELIGIBLE",
        createdBy:"gstarr",
        createdById:17,
        dateCreated:"2017-07-13T03:57:54.607",
        dateUpdated:"2017-07-13T03:57:57.093",
        deniedReasons:null,
        id:627,
        isFinal:false,
        phicPackage:0,
        phicPackageDescription:"REGULAR",
        phiccF1:null,
        phiccF2:null,
        returnDeficiencies:null,
        updatedBy:"gstarr",
        updatedById:17,
        version:1
    },
    selectedTransmittal: {
        accreditationNumber:"H91004604",
        createdBy:"gstarr",
        createdById:17,
        dateCreated:"2017-07-13T03:57:19.453",
        dateUpdated:"2017-07-13T03:57:54.607",
        eTicketNumber:null,
        hospitalCode:"262729",
        id:624,
        phicPackage:0,
        phicPackageDescription:"REGULAR",
        phichciType:1,
        phichciTypeDescription:"LEVEL 1",
        remarks:null,
        totalClaims:1,
        transmissionControlNumber:null,
        transmittalClaims:null,
        transmittalIssueTotal:0,
        transmittalNumber:"170713000624",
        transmittalStatus:0,
        transmittalStatusDescription:"DRAFT",
        transmittedBy:null,
        transmittedById:0,
        transmittedDateTime:null,
        updatedBy:"gstarr",
        updatedById:17,
        version:2
    },
    selectedZBenefit : []
}





