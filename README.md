# Webex SDK Sample Apps

This repository contains Webex sample applications built with the [Webex SDKs](https://developer.webex.com/docs/sdks/browser).

## Authenticating with Webex APIs

These samples use your Webex personal access token to let you easily authenticate. To obtain your access token login to the [Developer Portal](https://developer.webex.com/login), then open the [Getting Started](https://developer.webex.com/docs/getting-started#accounts-and-authentication) guide. Under **Your Personal Access Token** click the copy icon, then click **OK** in the pop-up dialog to copy your access token to the clipboard.

![](images/personal-access-token.png)

To use your access token with a given sample app, open the app's index.js page and paste the value from your clipboard into the `personal_access_token` variable.

```javascript
var personal_access_token = "<your_access_token>"
```
