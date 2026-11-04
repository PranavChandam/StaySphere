
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Listing = require("./models/listing.js");

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// MongoDB connection
const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    throw new Error("DB_URL environment variable is missing");
}

// Connect to MongoDB and reuse the connection
let dbConnectionPromise;

async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!dbConnectionPromise) {
        dbConnectionPromise = mongoose.connect(dbUrl)
            .catch((err) => {
                dbConnectionPromise = null;
                throw err;
            });
    }

    await dbConnectionPromise;
}

// Middleware to ensure database connection
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
});

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// General middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: dbUrl,
        collectionName: "sessions",
        ttl: 7 * 24 * 60 * 60
    }),
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    }
};

if (!sessionOptions.secret) {
    throw new Error("SESSION_SECRET environment variable is missing");
}

app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash messages and current user
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Homepage
app.get("/", async (req, res, next) => {
    try {
        const allListing = await Listing.find({});
        res.render("listings/index.ejs", { allListing });
    } catch (err) {
        next(err);
    }
});

// Routes
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// 404 handler
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Error handler
app.use((err, req, res, next) => {
    const { status = 500, message = "Something Went Wrong" } = err;

    res.status(status).render("Error.ejs", { message });
});

// Export Express app for Vercel
module.exports = app;
