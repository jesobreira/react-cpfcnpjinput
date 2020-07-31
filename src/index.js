import React, { Component } from 'react'
import { validateBr, maskBr } from 'js-brasil'

class CpfCnpjInput extends Component {

	state = {
		val: ""
	}

	static getDerivedStateFromProps(props, state) {
		let method

		if (['cpf', 'cnpj'].includes(String(props.type).toLowerCase())) {
			method = props.type.toLowerCase()
		} else {
			method = (props.value || "").replace(/[^0-9]/g, '').length>=12 ? 'cnpj' : 'cpf';
		}

		// now let's mask it
		let maskField = props.maskField || '_'
		let val = maskBr[method](props.value || "").replace(/_/g, maskField)

		return { val }
	}
	
	handleChange = (e) => {
		// let's detect whether the user is typing a CPF or CNPJ
		let method
		let { target } = e

		if (['cpf', 'cnpj'].includes(String(this.props.type).toLowerCase())) {
			method = this.props.type.toLowerCase()
		} else {
			method = target.value.replace(/[^0-9]/g, '').length>=12 ? 'cnpj' : 'cpf';
		}

		// now let's mask it
		let maskField = this.props.maskField || '_'
		let val = maskBr[method](target.value).replace(/_/g, maskField)
		this.setState({ val },
			// and the user may continue typing from the first maskField in the value
			() => target.setSelectionRange(val.indexOf(maskField), val.indexOf(maskField))
		)

		// callback, if any
		typeof this.props.onChangeText === 'function' && this.props.onChangeText(val)
		typeof this.props.onChange === 'function' && this.props.onChange(e)
	}

	// we need to handle keydown manually
	// to detect backspace (keycode 8) after a mask character (. / -)
	handleKeyDown = e => {
		if (e.keyCode === 8 && [".", "/", "-"].includes(this.state.val.substr(e.target.selectionStart-1, 1))) {
			let { target } = e
			let method

			if (['cpf', 'cnpj'].includes(String(this.props.type).toLowerCase())) {
				method = this.props.type.toLowerCase()
			} else {
				method = target.value.replace(/[^0-9]/g, '').length>=12 ? 'cnpj' : 'cpf';
			}

			// now let's mask it
			let offset = e.target.selectionStart
			let maskField = this.props.maskField || '_'
			let val = maskBr[method](target.value.substr(0, offset-2)).replace(/_/g, maskField)
			this.setState({ val })

			// and the user may continue typing from the first maskField in the value
			setTimeout(() => target.setSelectionRange(offset-2, offset-2), 1)
			

			// callback, if any
			typeof this.props.onChangeText === 'function' && this.props.onChangeText(val)
		}

		// call any user-provided callback
		typeof this.props.onKeyDown === 'function' && this.props.onKeyDown(e)
	}

	handleFocus = e => {
		// move cursor to the first position on focus
		// if the value is empty
		if (this.getRawValue() === "") {
			let { target } = e
			setTimeout(() => target.setSelectionRange(0, 0), 1)
		}

		// call any user-provided callback
		typeof this.props.onFocus === 'function' && this.props.onFocus(e)
	}

	getValue = () => {
		let regexp = new RegExp("([^0-9][\\-\\/\\.\\" + (this.props.maskField || "_") + "])", "g")
		let { val } = this.state

		while (val.match(regexp)) {
			val = val.replace(regexp, "")
		}

		if (val.endsWith(this.props.maskField || "_"))
			val = val.substr(0, val.length-1)

		return val.trim()
	}

	getRawValue = () => this.state.val.replace(/[^0-9]/g, '').trim()

	isValid = (type) => {
		if (validateBr.cpf(this.state.val))
			return type ? type === 'cpf' : 'cpf'
		else if (validateBr.cnpj(this.state.val))
			return type ? type === 'cnpj' : 'cnpj'
		else
			return false
	}

	render() {
		return (
			<input 
				type="text"
				{...this.props}
				value={this.state.val}
				onChange={this.handleChange}
				onKeyDown={this.handleKeyDown}
				onFocus={this.handleFocus}
			/>
		)
	}
}

export default CpfCnpjInput