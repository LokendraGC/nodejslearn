export const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.sendStatus(401); // Unauthorized
        }

        const rolesArray = [...allowedRoles];

        // map() is used to create a new array of boolean values, which indicates whether the user has the 
        // required role or not
        // find() is used to check if there is at least one true value in the array,
        //  which means the user has at least one of the required roles
        // eg: if allowedRoles is ['Admin', 'Editor'] and req.roles is ['User', 'Editor'], then rolesArray.includes('User') will be false,
        //  but rolesArray.includes('Editor') will be true, so the result will be [false, true], and find(val => val === true)
        //  will return true, which means the user has at least one of the required roles
       
       
       console.log("ROLES ARRAY:", rolesArray);
       console.log("USER ROLES:", req.roles);
       
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);

        if (!result) {
            return res.sendStatus(401); // Unauthorized
        }

        next();
    }
}