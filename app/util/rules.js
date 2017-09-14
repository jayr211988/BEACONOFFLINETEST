    // *** product type
export const productType = {
    DMS : 0,
    EHR : 1,
    PHICECLAIMS : 2,
    PHICAPI: 3,
    QMU : 4,
};

export function isPlural(rootWord, number) {    
    return number > 1 ? `${rootWord}s` : rootWord;
}
    
export function hasPHICECLAIMS(selectedFacility) {
    if(selectedFacility)
        {
        const arr =  selectedFacility.products.filter(x=> 
                        x.productType == productType.PHICECLAIMS
            );
        return arr.length > 0;
    }
    return false;
}

export function hasPHICECLAIMSAPI(selectedFacility) {
    if (selectedFacility)
        {
        const y =  selectedFacility.products.filter(x =>
            x.productType == productType.PHICAPI
        );       

        return y.length > 0;         
       
    }
    return false;
}

// export function hasCurrentUserHavePHICECLAIMS(currentUser) {
//     if (currentUser)
//         {
//         const y =  currentUser.products.filter(x =>
//             x.productType == productType.PHICAPI
//         );       

//         return y.length > 0;         
       
//     }
//     return false;
// }

// export function hasCurrentUserHavePHICECLAIMSAPI(currentUser) {
//     if (currentUser)
//         {
//         const y =  currentUser.products.filter(x =>
//             x.productType == productType.PHICAPI
//         );       

//         return y.length > 0;         
       
//     }
//     return false;
// }

