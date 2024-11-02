import { useState } from 'react'
import './App.css'
import { SpiffWorkflowRunner } from './components/SpiffWorkflowRunner.tsx'

const apiKey = "214741df-d29f-43e0-bc05-9c03893e58fd";

import determineCvilleReqSchema from './json/determine-cville-req-schema.json';
import determineEinSchema from './json/determine-ein-schema.json';
import determineEinUiSchema from './json/determine-ein-uischema.json';
import determineNewEinSchema from './json/determine-new-ein-schema.json';
import determineNewEinUiSchema from './json/determine-new-ein-uischema.json';
import determineVaReqSchema from './json/determine-va-req-schema.json';
import determineVaReqUiSchema from './json/determine-va-req-uischema.json';
import howToApplySchema from './json/how-to-apply-schema.json';
import howToApplyUiSchema from './json/how-to-apply-uischema.json';
import needEinUischema from './json/need-ein-uischema.json';

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
              "determine-cville-req-schema.json": determineCvilleReqSchema,
	      "determine-ein-schema.json": determineEinSchema,
	      "determine-ein-uischema.json": determineEinUiSchema,
	      "determine-new-ein-schema.json": determineNewEinSchema,
	      "determine-new-ein-uischema.json": determineNewEinUiSchema,
	      "determine-va-req-schema.json": determineVaReqSchema,
	      "determine-va-req-uischema.json": determineVaReqUiSchema,
	      "how-to-apply-schema.json": howToApplySchema,
	      "how-to-apply-uischema.json": howToApplyUiSchema,
	      "need-ein-uischema.json": needEinUischema,
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
