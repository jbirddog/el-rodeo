import './App.css'
import { SpiffWorkflowRunner } from './components/SpiffWorkflowRunner.tsx'

//const apiKey = "67cf662f-a83f-4712-be82-a4318294c2c4";
const apiKey = "dccd9be2-1678-44a0-a0e0-06ee9fe3dcb6";

import determineCvilleReqSchema from './json/determine-cville-req-schema.json';
import determineCvilleReqUiSchema from './json/determine-cville-req-uischema.json';
import determineEinSchema from './json/determine-ein-schema.json';
import determineEinUiSchema from './json/determine-ein-uischema.json';
import determineNewEinSchema from './json/determine-new-ein-schema.json';
import determineNewEinUiSchema from './json/determine-new-ein-uischema.json';
import determineVaReqSchema from './json/determine-va-req-schema.json';
import determineVaReqUiSchema from './json/determine-va-req-uischema.json';
import howToApplySchema from './json/how-to-apply-schema.json';
import howToApplyUiSchema from './json/how-to-apply-uischema.json';
import needEinSchema from './json/need-ein-schema.json';
import needEinUiSchema from './json/need-ein-uischema.json';
import vaTaxRegisterMethodSchema from './json/va-tax-register-method-schema.json';
import vaTaxRegisterMethodUiSchema from './json/va-tax-register-method-uischema.json';

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
              "determine-cville-req-uischema.json": determineCvilleReqUiSchema,
	      "determine-ein-schema.json": determineEinSchema,
	      "determine-ein-uischema.json": determineEinUiSchema,
	      "determine-new-ein-schema.json": determineNewEinSchema,
	      "determine-new-ein-uischema.json": determineNewEinUiSchema,
	      "determine-va-req-schema.json": determineVaReqSchema,
	      "determine-va-req-uischema.json": determineVaReqUiSchema,
	      "how-to-apply-schema.json": howToApplySchema,
	      "how-to-apply-uischema.json": howToApplyUiSchema,
	      "need-ein-schema.json": needEinSchema,
	      "need-ein-uischema.json": needEinUiSchema,
	      "va-tax-register-method-schema.json": vaTaxRegisterMethodSchema,
	      "va-tax-register-method-uischema.json": vaTaxRegisterMethodUiSchema,
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
