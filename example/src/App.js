import React, { useState, useRef, useEffect } from 'react'

import CpfCnpjInput from 'cpf-cnpj-input'

const App = () => {

	const [example1, setExample1] = useState("")
	const [example2, setExample2] = useState("")
	const [example3, setExample3] = useState("")

	const [isValid1, setIsValid1] = useState(false)
	const [isValid2, setIsValid2] = useState(false)
	const [isValid3, setIsValid3] = useState(false)

	const [raw1, setRaw1] = useState(null)
	const [raw2, setRaw2] = useState(null)
	const [raw3, setRaw3] = useState(null)

	const [val1, setVal1] = useState(null)
	const [val2, setVal2] = useState(null)
	const [val3, setVal3] = useState(null)

	const ref1 = useRef(null)
	const ref2 = useRef(null)
	const ref3 = useRef(null)

	useEffect(() => {
		setIsValid1(ref1.current.isValid())
		setRaw1(ref1.current.getRawValue())
		setVal1(ref1.current.getValue())

		setIsValid2(ref2.current.isValid())
		setRaw2(ref2.current.getRawValue())
		setVal2(ref2.current.getValue())

		setIsValid3(ref3.current.isValid())
		setRaw3(ref3.current.getRawValue())
		setVal3(ref3.current.getValue())
	}, [example1, example2, example3])

	return (
	<>

  		<h1>Default</h1>
  		<CpfCnpjInput
  			ref={ref1}
  			value={example1}
  			onChangeText={setExample1}
  		/>
  		<p>Value: {val1}</p>
  		<p>Raw value: {raw1 }</p>
  		<p>Is valid: {isValid1 || 'false'}</p>
  		<pre>{`
<CpfCnpjInput
	onChangeText={text => {}}
/>
  			`}
  		</pre>
  		<hr/>
  		<h1>CPF only - * as mask field</h1>
  		<CpfCnpjInput
  			ref={ref2}
  			value={example2}
  			type='cpf'
  			maskField='*'
  			onChangeText={setExample2}
  		/>
  		<p>Value: {val2}</p>
  		<p>Raw value: {raw2}</p>
  		<p>Is valid: {isValid2 || 'false'}</p>
  		<pre>{`
<CpfCnpjInput
	type='cpf'
	maskField='*'
	onChangeText={text => {}}
/>
  			`}
  		</pre>
  		<hr/>
  		<h1>CNPJ only - # as mask field</h1>
  		<CpfCnpjInput
  			ref={ref3}
  			value={example3}
  			type='cnpj'
  			maskField='#'
  			onChangeText={setExample3}
  		/>
  		<p>Value: {val3}</p>
  		<p>Raw value: {raw3}</p>
  		<p>Is valid: {isValid3 || 'false'}</p>
  		<pre>{`
<CpfCnpjInput
	type='cnpj'
	maskField='#'
	onChangeText={text => {}}
/>
  			`}
  		</pre>
  	</>
  	)
}

export default App
