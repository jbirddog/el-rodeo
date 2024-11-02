import { useState } from 'react'
import './App.css'
import { SpiffWorkflowRunner } from './components/SpiffWorkflowRunner.tsx'

const apiKey = "214741df-d29f-43e0-bc05-9c03893e58fd";

import determineCvilleReqSchema from './json/determine-cville-req-schema.json';
import determineEinSchema from './json/determine-ein-schema.json';
import determineEinUiDchema from './json/determine-ein-uischema.json';
import determineNewEinDchema from './json/determine-new-ein-schema.json';

/*
determine-new-ein-uischema.json
determine-va-req-schema.json
determine-va-req-uischema.json
how-to-apply-schema.json
how-to-apply-uischema.json
need-ein-uischema.json
*/

/*
import { SpiffWorkflowRunner } from './SpiffWorkflowRunner.tsx'

import hoursSummarySchema from '../json/hours-summary-schema.json'
import hoursSummaryUiSchema from '../json/hours-summary-uischema.json'

import runningTimeSchema from '../json/running_time-schema.json'
import runningTimeUiSchema from '../json/running_time-uischema.json'
*/

function App() {
  return (
    <>
      <div id="header">
        <h1>Perform Government and Legal Actions Transparently</h1>
      </div>
      <div>
        <h1>How do I?</h1>
	<dl>
	  <dt><h3>Start a Company in Virginia</h3></dt>
	  <dd>
            <SpiffWorkflowRunner apiKey={apiKey} schemaMap={{
              "hours-summary-schema.json": hoursSummarySchema,
              "hours-summary-uischema.json": hoursSummaryUiSchema,
              "running_time-schema.json": runningTimeSchema,
              "running_time-uischema.json": runningTimeUiSchema,
            }} />
	  </dd>
	</dl>
      </div>
      <hr />
      <p className="read-the-docs">
        Brought to you by
	{' '}<a href="https://wiki.lexipedia.xyz/">lexipedia</a> and
	{' '}<a href="https://lexdao.org/">LexDAO</a>, powered by
	{' '}<a href="https://github.com/sartography/SpiffWorkflow/">SpiffWorkflow</a>.
	<br /><br />
	Visualize and contribute to the
	{' '}<a href="http://lexipedia.xyz:8001/">process(es)</a>.
      </p>
    </>
  )
}

export default App
