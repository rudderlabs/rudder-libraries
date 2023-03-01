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

- [Encrypt/decrypt PII](#encryptdecrypt-pii)
- [User agent parser](#user-agent-parser)
- [Hashing PII](#hashing-pii)

### Encrypt/decrypt PII

This library lets you encrypt and decrypt PII including those that are stored in cookies. Refer to the library's code [here](https://github.com/rudderlabs/rudder-libraries/tree/main/libraries/encrypt/v1).

The code snippet for encrypt/decrypt template is shown below:

```javascript
import { JSEncrypt } from "@rs/encrypt/v1";

const publicKey = `<RSA_PUBLIC_KEY>` // Add RSA public key

export function transformEvent(event, metadata) {
    const email = event.context?.traits?.email;
    if (email) {
        const crypt = new JSEncrypt();
        crypt.setKey(publicKey);
        event.context.traits.email = crypt.encrypt(email);
    }
    return event;
}
```
```javascript
import { JSEncrypt } from "@rs/encrypt/v1";

const privateKey = `<RSA_PRIVATE_KEY>` // Add RSA private key

export function transformEvent(event, metadata) {
    const email = event.context?.traits?.email;
    if (email) {
        const crypt = new JSEncrypt();
        crypt.setKey(privateKey);
        event.context.traits.email = crypt.decrypt(email);
    }
    return event;
}
```

### User agent parser

The **Parse user agent transformation template** imports this library to add the user's browser, engine, OS, device, and CPU-related information to the events. Refer to the library's code [here](https://github.com/rudderlabs/rudder-libraries/tree/main/libraries/userAgentParser/v1).

The code snippet for the user agent parser template is shown below:

```javascript
import { UAParser } from "@rs/userAgentParser/v1";

export function transformEvent(event, metadata) {
  const userAgent = event.context?.userAgent;
  if (userAgent) {
    const parser = new UAParser();
    const parsedUserAgent = parser.setUA(userAgent).getResult();
    event.context.parsedUserAgent = parsedUserAgent;
  }
  return event;
}
```

### Hashing PII

This library provides three hash functions that hide sensitive PII like the user's email, birthday, social security number, etc. You can use either **MD5**, **SHA256**, or **cyrb53** to hash your PII. Refer to the library's code [here](https://github.com/rudderlabs/rudder-libraries/tree/main/libraries/hash).

The code snippet for hash template is shown below:

```javascript
import { sha256 } from "@rs/hash/v1";

export function transformEvent(event, metadata) {
    const email = event.context?.traits?.email;
    if (email) event.context.traits.email = sha256(email);
    return event;
}
```

## Import structure

Use the following structure to import the Rudderstack libraries:

```
@rs/<libraryname>/v1
```

A sample import statement is shown below:

```javascript
import { md5 } from "@rs/hash/v1";
```

## Contribute

We would love to see you contribute to this repository. Get more information on how to contribute [**here**](CONTRIBUTING.md).

## License

This repo is released under the [**MIT License**](https://opensource.org/licenses/MIT).
