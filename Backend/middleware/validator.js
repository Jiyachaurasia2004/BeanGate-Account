const { ZodError } = require('zod');
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
       const status = 402;
       const message = "Validation Error";
       let extraDetails = "Invalid input";

   if (err instanceof ZodError && err.issues?.length > 0) {
      extraDetails = err.issues[0].message;
    } else if (err.message) {
      extraDetails = err.message;
    }
       const error ={
        status,
        message,
        extraDetails
       }
       console.log(error);
       
       next(error);
}
};
module.exports = validate;