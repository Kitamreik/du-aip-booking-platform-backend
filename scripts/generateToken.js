// scripts/generateToken.js
require("dotenv").config();
const axios = require("axios");

// Use Clerk's secret key and the user_id you want to generate a token for
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const CLERK_API_BASE = "https://api.clerk.dev/v1";

// Get userId from CLI argument or hardcode for dev
const userId = process.argv[0]; // Run like: node scripts/generateToken.js user_abc123, originally 2

if (!CLERK_SECRET_KEY) {
  console.error("❌ Missing CLERK_SECRET_KEY in .env");
  process.exit(1);
} //passes

if (!userId) {
  console.error("❌ Usage: node scripts/generateToken.js <clerk_user_id>");
  process.exit(1);
} //passes

async function generateSessionToken() {
  try {
    // Step 1: Create a new session for the given user_id
    const response = await axios.post(
      `${CLERK_API_BASE}/sessions`,
      { user_id: userId },
      {
        headers: {
          Authorization: `Bearer ${CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    ); //accepted

    const session = response.data;
    const token = session.last_active_token;

    if (!token) {
      console.error("❌ No token returned. Check user_id or Clerk configuration.");
      process.exit(1);
    }

    console.log("✅ Clerk session token generated:");
    console.log(`\nBearer ${token}\n`);
    console.log("🔁 Use this token in your Authorization headers for testing protected routes.");
  } catch (error) {
    console.error("❌ Failed to generate token:");
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

generateSessionToken();
