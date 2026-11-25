import { Composition, registerRoot } from 'remotion';
import AgentRequest from './AgentRequest.jsx';
import SpecToStaging from './SpecToStaging.jsx';
import TradewireFlow from './TradewireFlow.jsx';

// Each composition renders to public/media/<id>.mp4 and .webm in the site (see render.mjs).
const common = { durationInFrames: 540, fps: 30, width: 1280, height: 720 };

function Root() {
  return (
    <>
      <Composition id="agent-request" component={AgentRequest} {...common} />
      <Composition id="tradewire-flow" component={TradewireFlow} {...common} />
      <Composition id="delivery-demo" component={SpecToStaging} {...common} />
    </>
  );
}

registerRoot(Root);
