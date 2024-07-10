import './App.css';
import { SipContextProvider, SoftPhone } from '../lib/store/SipContextProvider'; // Correct import path

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
      <SoftPhone />
    </SipContextProvider>
  );
}

export default App;
