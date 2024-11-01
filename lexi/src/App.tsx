import { useState } from 'react'
import './App.css'

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
	  <dd>Form here</dd>
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
