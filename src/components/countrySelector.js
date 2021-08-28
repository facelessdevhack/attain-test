import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector(props) {
  const options = useMemo(() => countryList().getData(), [])

  return <Select options={options} value={props.val} onChange={props.func} />
}

export default CountrySelector