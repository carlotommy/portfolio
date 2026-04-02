import { Helmet } from 'react-helmet-async';
import Photos from '../components/Photos';
import Videos from '../components/Videos';

export default function Work() {

  return (
    <>
      <Helmet>
        <title>ASSE ZERO | Work</title>
        <meta name="description" content="Portfolio di ASSE ZERO – foto e video dei nostri progetti: pubblicità, cortometraggi, videoclip musicali." />
      </Helmet>

      <Photos />
      <Videos />
    </>
  );
}
