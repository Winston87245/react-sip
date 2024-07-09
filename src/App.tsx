import './App.css';
import { SipContextProvider, PhoneComponent } from '../lib/store/SipContextProvider'; // Correct import path

function App() {
  const baseUri = "sip.example.com";
  const server = `ws:${baseUri}`;
  const aor = `sip:user1@${baseUri}`;
  const userAgentOptions = {
    authorizationUsername: "user1",
    authorizationPassword: "password",
  }
  const sipConfig = {
    baseUri,
    server,
    aor,
    userAgentOptions
  }

  return (
    <SipContextProvider sipConfig={sipConfig} >
      <PhoneComponent />
    </SipContextProvider>
  );
}

export default App;
