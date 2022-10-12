# Authentication in a Single Page Application

The idea for this proof of concept came when I was implementing a Habit Tracker web application (called Move to Done at the time). In order to release a product like this, the Authentication feature is crucial. I could have configure a Firebase authentication service or any other third party auth service as a matter of fact, however I wanted to see what's underneath the implementation and see how difficult would it be to develop it for myself.

Have to tell you that it was one of the most challenging proof of concepts that I've done. The most challenging part of this project is that the browser is a public space, so when using authentication tokens, there's always a possiblity that somebody steals the token on flight.

Did consider both of the most common cyber attacks

1. Cross Site Scripting (XSS)
2. Cross Site Request Forgery (CSRF)

For any authorised requests the user must have an `access token` which is going to be valid only for that small period of time till it completes the wanted operations i.e. 10mins. This would be a super secure solution as even if the attacker receives this `access token` they would be able to make only a handful of operations, till the token expires.
However, in this case the user must authenticate every 10mins which degrades the user experience significantly.

This is where the `refresh token` comes into the picture. All access tokens will be paired up with a refresh token which is going to be valid for a longer period of time. Let's say a day, or a week, or even a month, depending on the level of security that the web application requires. The purpose of the refresh tokens are to keep the previously authenticated user logged in and refresh the access token when that expires.

Now you might think, what happens if the attacker gets hold of the `refresh token`? They could just keep of requesting new access tokens on behalf of the authenticated user. Yeah, that might absolutely happen, this is why the refresh tokens need to be invalidated and recreated with every new access token and checking if the refresh token that a potentially authenticated user tries to use has already been used. And if so, just lock down the account, invalidate all refresh, access tokens and require the user to log in again, and inform them that they might have been the victim of a cyber attack.

If such an attack happens, there shouldn't be too much damage as the maliciously requested `access token` will not be valid anymore.

However, there's that possibility that the attacker received the new access token first and replaced the refresh token, and this will only be reveald when the real user tries to get their refreshed access token.

Scenarios

Actors

- Attacker
- User
- Authenticated user

User becomes and Authenticated User once they provide their credentials (username and password)

Now the Authenticated User has an Access Token (valid for 10mins) stored only in memory and a Refresh Token (valid for 1month) stored in the cookies.

Authenticated user uses Access Token (JWT) in order to make authorized requests.
Attacker might steal the Access Token but it's going to expire very sortly anyway, so the window is very short in order for them to make any significant damage.

Authenticated User has expired Access Token and requests a new one using their Refresh Token. At this point the new Access Token will be returned alongside with the new Refresh Token, keeping a record of all previous Access and Refresh Tokens, while making them invalid.

Let's assume that the Attacker managed to steal the Refresh Token and makes a request for a new Access Token.

1. Authenticated User already used that specific Refresh Token, all the tokens will be invalidated and the User must log in again
2. The Authenticated User haven't yet used that Refresh Token so the attacker might have a short window till they can do some damage howerver when the Authenticated User will use their Refresh Token, all the Tokens will be invalidated again and the User must log in
