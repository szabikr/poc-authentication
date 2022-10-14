# Authentication in a Single Page Application

### Motivation

The idea for this proof of concept came when I was implementing a Habit Tracker web application (called Move to Done at the time). In order to release a product like this, the Authentication feature is crucial. I could have configured a Firebase authentication service or any other third party auth provider as a matter of fact, however I wanted to see what's underneath the implementation and see how difficult would it be to develop it for myself.

Have to tell you that it was one of the most challenging proof of concepts that I've ever done. The most challenging part of this project is that the browser is a public space, so when using authentication tokens, there's always a possiblity that somebody steals the token on flight.

Most common cyber attacks in the browsers are:

1. Cross Site Scripting (XSS) - makes storing `access_token` in `localStorage` not viable
2. Cross Site Request Forgery (CSRF) - makes storing `access_token` in browser cookies not viable

For any authorised requests the user must have an `access_token` which is going to be valid only for a short period of time till they complete the wanted operations i.e. 10mins. This would be a super secure solution as even if the attacker receives this `access_token` they would be able to make only a handful of operations, till the token expires.
However, in this case the user must authenticate every 10mins which degrades the user experience significantly.

This is where the `refresh_token` comes into the picture. All access tokens will be paired up with a refresh token which is going to be valid for a longer period of time. Let's say a day, or a week, or even a month, depending on the level of security that the web application requires. The purpose of the `refresh_token` is to keep the previously authenticated user logged in and allow them to refresh the `access_token` when that expires.

Now you might think, what happens if the attacker gets hold of the `refresh_token`? They could just keep on requesting new access tokens on behalf of the authenticated user. Yeah, that might absolutely happen, this is why the refresh tokens need to be invalidated and recreated with every new `access_token`. On refresh we need to check if the `refresh_token` that a potentially authenticated user provides has already been invalidated. And if so, lock down the account, invalidate all refresh, access tokens and require the user to authenticate. With this method, the attacker won't be able to do anything with the stolen token.

However, there's that possibility that the attacker received the new access token first and replaced the refresh token, and this will only be reveald when the real user tries to get their refreshed access token.

---

### Scenarios

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

---

### How it works

The user has to register with their email address and password. The email has to be a valid email address and the password has to contain at least one lowercase, uppercase, number, non alpha numberic character and the length has to be between 8 and 32 characters.

When all the validations are met, the web server hashes the password and creates a username that is just the email address. Saves the user details and the hashed password to the database and returns the email and username.

The password is hashed so that even if attackers get to the database the passwords stay unrevealed.

On login the given password is hashed again and checked against the database. If the hashes and emails match the user will be provided with an `access_token` that they can use to make authenticated requests and a `refresh_token` that they can use to acquire a new `access_token` in case the old one got expired.

In case the `access_token` expires the user can refresh it with their `refresh_token`.

The `refresh_token` (1) must be valid, (2) must not be expired and (3) must not have been used previously. All these validation errors result in an Access Denied.
If all conditions are met, the user will be granted a new `access_token`, `refresh_token` and the old `refresh_token` will be invalidated, meaning that any refresh api calls made with the old `refresh_token` result in an account lockdown and the user must authenticate again using their credentials.
