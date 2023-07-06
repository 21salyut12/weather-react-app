# Front-end React App

This project is just one of the two main components that I made for my bachelor project.

## App Description

This app is supposed to retrieve data from a realtime database made in Firebase. The data represents measurements related to temperature, atmospheric pressure, rainfall intensity and wind speed, alongside these measurements I have included a timestamp for when they have been made and also a fictional Location of the weather station that sends this info to the database.

## App Structure

This app is made out of the next react components:
- Main App component that renders everything on the web page;
- AppLogic component that defines the functionality of the app, more specifically the connection to the database, the way the app retrieves and displays data and the selection of the weather station we want data from;
- One React component for each weather station connected to the database.
