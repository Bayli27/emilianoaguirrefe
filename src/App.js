import { useState } from 'react';
import { LoadingIndicator, AppHeader } from '@corva/ui/components';
import PropTypes from 'prop-types';
import { DEFAULT_SETTINGS } from './constants';

import { useActualSurveyData } from './utils';
import { ActualSurveyChart } from './components';

import styles from './App.css';
function App(props) {
  // NOTE: Read asset_id from well. Most datasets are indexed by asset_id.
  const { well: { asset_id: assetId }, coordinates, appHeaderProps, } = props;
  const [dataset, setDataset] = useState("data.actual_survey");
  
  // NOTE: Use custom react hook to encapsulate data fetching/subscriptions logic
  const { actualSurveyData, loading } = useActualSurveyData({ assetId, dataset });

  return (
    <div className={styles.container}>
      <AppHeader {...appHeaderProps} />
      <div className={styles.content}>
        {/*Show loading indicator while data is loading*/}
        {loading && <LoadingIndicator />}
        {!loading && (
          <ActualSurveyChart data={actualSurveyData} dataset={dataset} coordinates={coordinates} />
        )}
      </div>
    </div>
  );
}

App.propTypes = {
  isExampleCheckboxChecked: PropTypes.bool,
  appHeaderProps: PropTypes.shape({}).isRequired,
};

App.defaultProps = {
  ...DEFAULT_SETTINGS,
};

// Important: Do not change root component default export (App.js). Use it as container
//  for your App. It's required to make build and zip scripts work as expected;
export default App;
