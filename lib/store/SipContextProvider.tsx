import React, { createContext, useState, useRef, useEffect, PropsWithChildren } from 'react';
import { Web } from "sip.js";
import { UserAgentOptions } from "sip.js/lib/api/user-agent-options";
// Define the initial state of the SIP context
enum SipState {
    idle = 'idle',
    connecting = 'connecting',
    calling = 'calling',
    ringing = 'ringing',
    connected = 'connected',
    failed = 'failed',
    busy = 'busy',
    error = 'error',
    unknown = 'unknown',
}

// Create the SIP context
interface SipContextProps {
    state: SipState;
    call: (destination: string) => void;
    hangup: () => void;
}

export const SipContext = createContext<SipContextProps>({
    state: SipState.idle,
    call: (destination: string) => { },
    hangup: () => { },
});

export const SipContextProvider: React.FC<PropsWithChildren<{ sipConfig: { baseUri: string, server: string, aor: string, userAgentOptions: UserAgentOptions } }>> = ({ children, sipConfig }) => {
    const [sipState, setSipState] = useState<SipState>(SipState.idle);
    const audioRef = useRef<HTMLAudioElement>(null);
    const simpleUserRef = useRef<Web.SimpleUser | null>(null);
    const {
        baseUri,
        server,
        aor,
        userAgentOptions
    } = sipConfig;

    const options: Web.SimpleUserOptions = {
        aor,
        media: {
            remote: {
                audio: audioRef.current ? audioRef.current : undefined
            }
        },
        userAgentOptions // Provide an empty object as the initializer for userAgentOptions
    };

    useEffect(() => {
        if (!simpleUserRef.current) {
            simpleUserRef.current = new Web.SimpleUser(server, options);
        }

        const simpleUser = simpleUserRef.current;

        simpleUser.delegate = {
            onCallAnswered: () => {
                setSipState(SipState.connected);
                console.log('Call answered');
            },
            onCallCreated: () => {
                console.log('Call created');
            },
            onCallReceived: () => {
                setSipState(SipState.ringing);
                console.log('Call received');
                simpleUser.answer().catch((error) => {
                    console.error(error);
                    setSipState(SipState.error);
                });
            },
            onCallHangup: () => {
                setSipState(SipState.idle);
                console.log('Call hung up');
            },
            onCallHold: (held: boolean) => {
                console.log(`Call ${held ? 'held' : 'resumed'}`);
            },
            onCallDTMFReceived: (tone: string, duration: number) => {
                console.log(`DTMF received: ${tone} for ${duration}ms`);
            },
            onMessageReceived: (message: string) => {
                console.log(`Message received: ${message}`);
            },
            onRegistered: () => {
                console.log('User registered');
            },
            onUnregistered: () => {
                console.log('User unregistered');
            },
            onServerConnect: () => {
                setSipState(SipState.idle);
                console.log('Connected to server');
            },
            onServerDisconnect: (error?: Error) => {
                setSipState(SipState.error);
                console.error('Disconnected from server', error);
            }
        };

        const connectToServer = async () => {
            setSipState(SipState.connecting);
            try {
                await simpleUser.connect();
                setSipState(SipState.idle);
            } catch (error) {
                console.error(error);
                setSipState(SipState.error);
            }
        };

        connectToServer();

        return () => {
            if (simpleUserRef.current) {
                simpleUserRef.current.delegate = {};
                simpleUserRef.current.disconnect();
            }
        };
    }, []);

    async function call(destination: string) {
        if (!simpleUserRef.current) return;
        setSipState(SipState.calling);
        try {
            const targetUri = `sip:${destination}@${baseUri}`;
            await simpleUserRef.current.call(targetUri);
        } catch (error) {
            console.error(error);
            setSipState(SipState.error);
        }
    }

    async function hangup() {
        if (!simpleUserRef.current) return;
        try {
            await simpleUserRef.current.hangup();
        } catch (error) {
            console.error(error);
            setSipState(SipState.error);
        }
    }

    const sipValue = {
        state: sipState,
        call,
        hangup,
    };

    return (
        <SipContext.Provider value={sipValue}>
            <audio ref={audioRef}></audio>
            {children}
        </SipContext.Provider>
    );
};

// Example of using the SipContext in a component
const PhoneComponent: React.FC = () => {
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
};

export default PhoneComponent;
