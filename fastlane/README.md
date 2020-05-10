fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
### firebase
```
fastlane firebase
```


----

## iOS
### ios bump_version
```
fastlane ios bump_version
```
Increments the app version number
### ios dist
```
fastlane ios dist
```
Send the app to iOS Testflight & Firebase Distribution

----

## Android
### android bump_minor
```
fastlane android bump_minor
```

### android bump_version
```
fastlane android bump_version
```

### android dist
```
fastlane android dist
```
Send the app to Google Play & Firebase Distribution

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
