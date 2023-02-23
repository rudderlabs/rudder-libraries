<p align="center">
  <a href="https://rudderstack.com/">
    <img src="https://user-images.githubusercontent.com/59817155/121357083-1c571300-c94f-11eb-8cc7-ce6df13855c9.png">
  </a>
</p>

<p align="center"><b>The Customer Data Platform for Developers</b></p>

<p align="center">
  <b>
    <a href="https://rudderstack.com">Website</a>
    ·
    <a href="https://rudderstack.com/docs/features/transformations/libraries/#rudderstack-libraries">Documentation</a>
    ·
    <a href="https://rudderstack.com/join-rudderstack-slack-community">Community Slack</a>
  </b>
</p>

---

# RudderStack libraries

RudderStack provides some libraries out of the box which you can directly import into your transformations. This repo contains the relevant code and implementation-specific details for these libraries.

Currently, RudderStack provides the following libraries:

- [Encrypt/decrypt PII]()
- [User agent parser]()
- [Hashing PII]()

## Encrypt/decrypt PII

This library lets you encrypt and decrypt PII including those that are stored in cookies. Refer to the library's code [here](https://github.com/rudderlabs/rudder-libraries/tree/main/libraries/encrypt/v1).

## User agent parser

The [Parse user agent transformation template](https://rudderstack.com/docs/features/transformations/templates/#parse-user-agent) imports this library to add the user's browser, engine, OS, device, and CPU-related information to the events. Refer to the library's code [here](https://github.com/rudderlabs/rudder-libraries/tree/main/libraries/userAgentParser/v1).

## Hashing PII

This library has two hash functions that hide sensitive PII like the user's email, birthday, social security number, etc. You can use either MD5 or SHA256 encryption to hash your PII. Refer to the library's code [here](https://github.com/rudderlabs/rudder-libraries/tree/main/libraries/hash).

## Contribute

We would love to see you contribute to this repository. Get more information on how to contribute [**here**](CONTRIBUTING.md).

## License

This repo is released under the [**MIT License**](https://opensource.org/licenses/MIT).
