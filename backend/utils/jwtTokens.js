// here we generate tokens and store them as cookies.
export const generateToken = (user, message, statusCode, res) => {
    // we can use the methods of the user model
    const token = user.generateJsonWebTokens();
    const cookieName = "userToken";
    res
      .status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({ success: true, message, user, token });
  };
  