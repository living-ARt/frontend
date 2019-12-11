# Living ARt

_Experience art come to life_

Our app creates an interactive and exciting experience for museum goers to experience art using augmented reality (AR) and virtual reality (VR).

Users can select from any of our active museums and view our animated library which includes the artwork description and where they can find the artpiece. When users open up the AR view, they can use the camera to find an image in our animated library and the image will start animating with AR. The animated image will also be able to play an audio description of the artpiece with a simple tap and swipe.

Users with a VR headset can also choose from a standard VR view or the VR 360 view to have a more immersive art viewing experience.

## Get started

Because our app is not yet available in the app store, to use our app, users must install and download Viro Media to their smartphone device and use the testbed.

In the terminal, run `npm install` to install all app dependancies. Then run `npm run start-dev` to start running the code. You will be given an NGrok package server endpoint, and a message saying Metro Bundler is running. You must keep this running while you are using the app on your phone.

When you receive the message in your terminal that says `Loading dependency graph, done` they you are ready to open the app up in your phone. Open the Viro Media app >> Enter Testbed, then enter either your IP address or the NGrok package server endpoint you were given, and press GO.

It may take a minute to load the app for the first time. If it fails to load or if you need to reload the app, you can shake your phone and Viro Media will give the option to reload.

### How to use the app

_Main screen:_
Upon opening Living ARt, you are welcomed by a description of the application. Below you are shown a list of available museums.

_List view screen:_
On the next screen, a list of animated artwork at the selected museum is displayed along with a button to open AR.

Tapping on the AR button will open your camera and you’re ready to see animations! Simply hold your phone up to any piece found in our animated library and watch it come to life. Viro’s image recognition technology, identifies the painting and loads the associated animation on top. Along with the visual display, tapping and swiping on the animation plays an audio description about that piece.

Returning to the list view, you can tap on a painting to see more information and get access to the VR views. You can choose between plain VR which displays the animated painting right in front of you or 360 view which makes you feel as if you were inside the painting.
