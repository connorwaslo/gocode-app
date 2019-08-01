# GoCode
### Learn to code the unconventional way

This is a mobile app 📱 that I built my senior year of high school (2017-18). 
The idea came to me while I was working with a tutoring startup and the founder encouraged me to start my own venture.

GoCode's intended purpose was to help teach elementary school students the fundamentals of web development through a mobile app.

While I ultimately moved on from GoCode to other projects, I learned an immense amount about fullstack mobile/web development,
startup strategy, marketing, customer discovery, and sales.

---------------------

This is not the first Github repo for GoCode, I accidentally commit some API keys to the first repo
so I made that one private and migrated everything here.

Upgrading npm dependencies from June 2018 to August 2019 has created some bugs in the app, but for the most part it works as designed.

I will be going through and implementing some bug fixes over the next few months.

---------------------

### You can run the app here [on Expo](https://expo.io/@connorwaslo/gocode-app).

---------------------

# Features

- [x] User authentication & data storage with Firebase
- [x] Lightweight code editor designed for mobile
- [x] Parse and render html code
    - [x] Includes realtime code editing
- [x] Various types of learning activities
    - [x] Write code, answer multiple choice questions, matching
- [x] Custom built animations
- [x] Fully functional on both iOS and Android (<3 React-Native + Expo)
- [ ] Navigation works 100% of the time
- [ ] Styles scale to all devices

---------------------

# Known Bugs
#### Waiting over a year to upgrade react-native ran its course and now some things are broken...

- 🐛 Passing props through react-navigation is broken
- 🐛 NavigatorService no longer works
- 🐛 Lessons navigate before saving data, breaks lessonsCompleted data until reload
- 🐛 Weird margin below the header and unnecessary navigation header on load

---------------------

Looking back at my code a year later, I recognize that this project's code isn't very pretty.

I've learned a lot since then and would do things very differently - but a lot of what I learned, I learned the hard way making this app.