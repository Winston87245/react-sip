import './App.css';
// import { SipContextProvider } from '../lib/store/SipContextProvider';
// import { SoftPhone } from '../lib/components/SoftPhone';
import sipConfig from '../sipConfig';

import { SipContextProvider } from '../lib/main';

import { SoftPhone } from '../lib/main';

function App() {
  


  return (
    <SipContextProvider sipConfig={sipConfig} >
      <SoftPhone />
    </SipContextProvider>
  );
}

export default App;
