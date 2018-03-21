# Amelia Component

This is the primary widget for Nordnet to show and let the Customer interact with the Amelia system.

__NOTE:__
This is not a stand alone service. See amelia-web for a self-running service where you can test the amelia-component.

## Styleguideist

To install Dev environment:

Currently we use a HTTPS proxy because the Authentication Sessione is delivered thru a secure cookie.

In terminal run these commands in order after cloning the project

yarn
yarn genkey
yarn dev

Also if you need to login now during the CI environment you must create a temporary User with this command

node utils/node-create-user.js

Copy/paste the username/password for the login process.