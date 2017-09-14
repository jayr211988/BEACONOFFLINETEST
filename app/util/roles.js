
    export function isBizBoxAdmin(user) {            
        return user.roles.indexOf('BizBoxAdmin') >=0;
    }
    export function isBizBoxUser(user) {            
        return user.roles.indexOf('BizBoxUser') >=0;
    }
    export function isClientUser(user, facility) {
        if(facility)
            return user.roles.indexOf(`${facility.id}-ClientUser`) >=0;
    }

    export function isClientAdmin(user, facility) {
        if(facility)
            return user.roles.indexOf(`${facility.id}-ClientAdmin`) >=0;
    }

    export function hasPHICEclaimsAccess(user, facility) {
        if(facility)
            return user.roles.some(t => `${facility.id}-PHICEclaims` == t || isClientAdmin(user, facility));
    }
