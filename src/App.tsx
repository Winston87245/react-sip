import './App.css';
import { SipContextProvider, SipContext, PhoneComponent } from '../lib/store/SipContextProvider'; // Correct import path

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

export default App;
