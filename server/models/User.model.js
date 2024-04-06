const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            unique: true,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate: {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email",
            },
        },
    },
    { timestamps: true }
);

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match');
    }
    next();


});
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

UserSchema.plugin(uniqueValidator, { message: "Email already exists" });
module.exports.UserModel = mongoose.model("User", UserSchema);