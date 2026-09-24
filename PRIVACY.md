# Wallpaper.app Privacy Principles

## Data minimization
Wallpaper.app is designed to avoid collecting personal information unless a future feature explicitly requires it and clearly explains why.

## Local-only preferences
Favorites and recently viewed wallpaper IDs are stored locally in the browser/device using localStorage. They are not sent to the Wallpaper.app server by the current web app.

## No tracking by default
The current app contains no analytics SDK, advertising tracker, third-party tracking pixel, or user-profile system.

## Network requests
Wallpaper images are loaded from configured image/CDN URLs. Downloads are proxied through the app download endpoint so the browser receives the image as a download.

## Sensitive information
The app should never request passwords, financial information, contacts, messages, precise location, health data, or other sensitive personal information for wallpaper functionality.

## Future native Android
The native live-wallpaper component should request only permissions that are strictly necessary. It should not access contacts, location, microphone, camera, SMS, files, or other personal data unless a future feature has a documented user-facing need and explicit consent.

## Security direction
Production changes should prefer least privilege, secure transport, minimal retention, and no unnecessary identifiers. Privacy-impacting features should be reviewed before release.
