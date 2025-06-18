 export const adminAuth =  (req, res, next) => {
    console.log("Middleware for admin route is called");
      const token = "admin123";
    const isAdminAuthorized = token === "admin123";
    
    if(!isAdminAuthorized) {
        res.status(401).send("Unauthorized access");


    }  else {
        next();
    }
};

 export const userAuth =  (req, res, next) => {
    console.log("Middleware for admin route is called");
      const token = "admin123";
    const isAdminAuthorized = token === "admin123";
    
    if(!isAdminAuthorized) {
        res.status(401).send("Unauthorized access");


    }  else {
        next();
    }
};