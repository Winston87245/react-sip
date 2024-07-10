# SIP.js with React

This project demonstrates how to integrate SIP.js with a React application. It provides a SIP context that can be used to make and receive calls within a React component.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Basic understanding of React

### Usage

1. install the repository:
   npm install git+https://github.com/Winston87245/react-sip.git#master 
2. import SipContextProvider
   
```ts
import { SipContextProvider, PhoneComponent } from 'react-sip';
```
3. set sip config
   
```ts
function App() {
  const sipConfig = {
    baseUri: "sip.example.com",
    server: "ws:sip.example.com",
    aor: "sip:user1@sip.example.com",
    userAgentOptions: {
      authorizationUsername: "user1",
      authorizationPassword: "password",
    }
  }

  return (
    <SipContextProvider sipConfig={sipConfig} >
      <PhoneComponent />
    </SipContextProvider>
  );
}
```

or you use SipContext to build your own component

```ts
import { SipContext } from 'react-sip';
// Example of using the SipContext in a component
const MyComponent: React.FC = () => {
    const { state, call, hangup } = React.useContext(SipContext);
    const [destination, setDestination] = useState('');

    const handleCall = () => {
        call(destination);
    };

    const handleHangup = () => {
        hangup();
    };

    return (
        <div>
            <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
            />
            <button onClick={handleCall} disabled={state !== SipState.idle}>
                Call
            </button>
            <button onClick={handleHangup} disabled={state !== SipState.connected}>
                Hang Up
            </button>
            <div>Current State: {state}</div>
        </div>
    );
}
```

## Contribution

Contributions are always welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request.

Please make sure to update tests as appropriate.

git commit -m "Add README with project overview and getting started guide"

## License

Distributed under the MIT License. See `LICENSE` for more information.