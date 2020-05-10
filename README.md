#News API

This app have two tabs, the first one fetches the news from https://newsapi.org and allows you to mark them as favorites. 
The second tab shows the favorites news

#Installation

    git clone git@github.com:NaNtrack/newsapi.git
    cd newsapi
    npm i

#Run on iOS simulator

    npm run ios

#Run on Android emulator or connected device

    npm run android

#Distribute to the stores

    cp .env.template .env

Edit the `.env` file with your stores information

    npm run dist-ios
    npm run dist-android
