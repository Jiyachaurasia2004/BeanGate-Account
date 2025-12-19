const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is requried" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, "email should be at least 3 characters long")
    .max(200, "email should be at most 30 characters long"),
  password: z
    .string({ required_error: "password is requried" })
    .trim()
    .min(5, "password should be at least 3 characters long")
    .max(200, "password should be at most 30 characters long"),
});

const registerSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is requried" })
    .trim()
    .min(3, "Username should be at least 3 characters long")
    .max(30, "Username should be at most 30 characters long"),

  phone: z
    .string({ required_error: "phone number is requried" })
    .trim()
    .min(10, "phone number should be at least 10 characters long")
    .max(15, "phone number should be at most 15 characters long"),

  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  department: z
    .string({ required_error: "Department is required" })
    .trim()
    .min(2, "Department is required"),
  post: z
    .string({ required_error: "Post is required" })
    .trim()
    .min(2, "Post is required"),
  confirmPassword: z
    .string({ required_error: "confirm password is requried" })
    .trim()
    .min(5, "confirm password should be at least 3 characters long")
    .max(200, "confirm password should be at most 30 characters long"),
});

const creditSchema = z.object({
  date: z.string({
    required_error: "Date is required",
  }),

  voucherNo: z.string().optional(),

  transactionType: z.enum(["credit", "expense"], {
    required_error: "Transaction type is required",
  }),

  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(3, "Description must be at least 3 characters"),

  amount: z
    .string({ required_error: "Amount is required" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, "Amount must be greater than 0"),

  paidBy: z.string().optional(),

  name: z.string({ required_error: "Name is requried" })
    .trim()
    .min(3, "name should be at least 3 characters long")
    .max(30, "name should be at most 30 characters long"),

  paymentMode: z.enum(["cash", "upi", "bank", "card"], {
    required_error: "Payment mode is required",
  }),

  category: z.string({
    required_error: "Category is required",
  }),

  reimbursementStatus: z.enum(["pending", "approved", "rejected"]).optional(),

  remarks: z.string().optional(),
});

const DebitSchema = z.object({
  name: z
    .string({ required_error: "Name is requried" })
    .trim()
    .min(3, "Username should be at least 3 characters long")
    .max(30, "Username should be at most 30 characters long"),
  email: z
    .string({ required_error: "Email is requried" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, "email should be at least 3 characters long")
    .max(200, "email should be at most 30 characters long"),
  contact: z
    .string({ required_error: "Phone number is requried" })
    .trim()
    .min(10, "phone number should be at least 10 digits")
    .max(15, "phone number should be at most 15 digits"),
  amount: z
    .string({ required_error: "Amount is requried" })
    .trim()
    .min(1, "amount should be at least 1 characters ")
    .max(15, "amount should be at most 15 characters"),
  from: z
    .string({ required_error: "From is requried" })
    .trim()
    .min(3, "From should be at least 3 characters long")
    .max(40, "From should be at most 40 characters long"),
});
module.exports = { creditSchema, DebitSchema, registerSchema, loginSchema };
