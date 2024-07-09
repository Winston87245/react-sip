# SIP.js with React

This project demonstrates how to integrate SIP.js with a React application. It provides a SIP context that can be used to make and receive calls within a React component.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Basic understanding of React

### Installation

1. install the repository:
   npm install git+https://github.com/Winston87245/react-sip.git#master 
2. import SipContextProvider
  ```javascript
  import { SipContextProvider, PhoneComponent } from 'react-sip';
  ```
3. Set Sip config
  ```javascript
  const sipConfig = {
    baseUri: "sip.example.com",
    server: "ws:sip.example.com",
    aor: "sip:user1@sip.example.com",
    userAgentOptions: {
      authorizationUsername: "user1",
      authorizationPassword: "password",
     }
 }
<SipContextProvider sipConfig={sipConfig} >
      <PhoneComponent />
    </SipContextProvider>
```


### Exapmle
./src/App.tsx
	
