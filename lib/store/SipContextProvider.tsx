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
    receive: () => void;
    hangup: () => void;
}

const SipContext = createContext<SipContextProps>({
    state: SipState.idle,
    call: (destination: string) => { destination },
    receive: () => { },
    hangup: () => { },
});

const SipContextProvider: React.FC<PropsWithChildren<{ sipConfig: { baseUri: string, server: string, aor: string, userAgentOptions: UserAgentOptions } }>> = ({ children, sipConfig }) => {
    const [sipState, setSipState] = useState<SipState>(SipState.idle);
    const audioRef = useRef<HTMLAudioElement>(null);
    const simpleUserRef = useRef<Web.SimpleUser | null>(null);
    const {
        baseUri,
        server,
        aor,
        userAgentOptions
    } = sipConfig;
    const ringMp3Audio = useRef(new Audio(`../../public/PhoneRing.mp3`));


    const options: Web.SimpleUserOptions = {
        aor,
        media: {
            remote: {
                audio: audioRef.current ? audioRef.current : undefined
            }
        },
        userAgentOptions
    };

    useEffect(() => {
        if (!simpleUserRef.current) {
            simpleUserRef.current = new Web.SimpleUser(server, options);
        }

        const simpleUser = simpleUserRef.current;

        simpleUser.delegate = {
            onCallAnswered: () => {
                setSipState(SipState.connected);
                pauseRingAudio();
                console.log('Call answered');
            },
            onCallCreated: () => {
                console.log('Call created');
            },
            onCallReceived: () => {
                setSipState(SipState.ringing);
                playRingAudio();
                console.log('Call received');
            },
            onCallHangup: () => {
                setSipState(SipState.idle);
                pauseRingAudio();
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
                await simpleUser.register();
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
            ringMp3Audio.current.pause();
            ringMp3Audio.current.currentTime = 0;
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

    async function receive() {
        if (!simpleUserRef.current) return;
        try {
            await simpleUserRef.current.answer();
        } catch (error) {
            console.error(error);
            setSipState(SipState.error);
        }
    }

    async function hangup() {
        if (!simpleUserRef.current) return;
        if (sipState === SipState.ringing) {
            try {
                await simpleUserRef.current.decline();
            } catch (error) {
                console.error(error);
                setSipState(SipState.error);
            }
            return;
        } else {
            try {
                await simpleUserRef.current.hangup();
            } catch (error) {
                console.error(error);
                setSipState(SipState.error);
            }
        }
    }

    const playRingAudio = () => {
        console.log('Playing ring audio');
        ringMp3Audio.current.play().catch(error => {
            console.error("Failed to play audio:", error);
        });
    };

    const pauseRingAudio = () => {
        console.log('Pausing ring audio');
        ringMp3Audio.current.pause();
        ringMp3Audio.current.currentTime = 0;
    };


    return (
        <SipContext.Provider value={{ state: sipState, call, receive, hangup }}>
            <audio ref={audioRef}></audio>
            {children}
        </SipContext.Provider>
    );
};

export { SipContextProvider, SipContext, SipState };
