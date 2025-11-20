
const {z} = require("zod")

const loginSchema = z.object({
    email: z.string({required_error: "Email is requried"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3, "email should be at least 3 characters long")
    .max(200, "email should be at most 30 characters long"),
    password: z.string({required_error: "password is requried"})
    .trim()
    .min(5, "password should be at least 3 characters long")
    .max(200, "password should be at most 30 characters long"),
})

const registerSchema =loginSchema.extend({
    username: z.string({required_error: "Name is requried"})
    .trim()
    .min(3, "Username should be at least 3 characters long")
    .max(30, "Username should be at most 30 characters long"),
  
    phone: z.string({required_error: "phone number is requried"})
    .trim()
    .min(10, "phone number should be at least 10 characters long")
    .max(15, "phone number should be at most 15 characters long"),
  
    confirmPassword: z.string({required_error: "confirm password is requried"})
    .trim()
    .min(5, "confirm password should be at least 3 characters long")
    .max(200, "confirm password should be at most 30 characters long"),
});
const creditSchema = z.object({
    name: z.string({required_error: "Name is requried"})
    .trim()
    .min(3, "Username should be at least 3 characters long")
    .max(30, "Username should be at most 30 characters long"),
    email: z.string({required_error: "Email is requried"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3, "email should be at least 3 characters long")
    .max(200, "email should be at most 30 characters long"),
    contact: z.string({required_error: "phone number is requried"})
    .trim()
    .min(10, "phone number should be at least 10 characters long")
    .max(15, "phone number should be at most 15 characters long"),
    amount: z.string({required_error: "amount is requried"})
    .trim()
    .min(1, "amount should be at least 1 characters long")
    .max(15, "amount should be at most 15 characters long"),
    from: z.string({required_error: "From is requried"})
    .trim()
    .min(3, "from should be at least 3 characters long")
    .max(40, "from should be at most 40 characters long"),
  
})
const DebitSchema = z.object({
    name: z.string({required_error: "Name is requried"})
    .trim()
    .min(3, "Username should be at least 3 characters long")
    .max(30, "Username should be at most 30 characters long"),
    email: z.string({required_error: "Email is requried"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3, "email should be at least 3 characters long")
    .max(200, "email should be at most 30 characters long"),
    contact: z.string({required_error: "Phone number is requried"})
    .trim()
    .min(10, "phone number should be at least 10 digits")
    .max(15, "phone number should be at most 15 digits"),
    amount: z.string({required_error: "Amount is requried"})
    .trim()
    .min(1, "amount should be at least 1 characters ")
    .max(15, "amount should be at most 15 characters"),
    from: z.string({required_error: "From is requried"})
    .trim()
    .min(3, "From should be at least 3 characters long")
    .max(40, "From should be at most 40 characters long"),
  
})
module.exports =  {creditSchema,DebitSchema,registerSchema,loginSchema}; 