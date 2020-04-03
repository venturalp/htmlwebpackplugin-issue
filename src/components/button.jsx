// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  background-color: ${props => props.theme.buttonColor};
`

type ButtonProps = {
  type: string,
  label?: string,
  link?: string,
  match: Object,
}

export default class ButtonVT extends Component<ButtonProps> {
  static defaultProps = {
    label: '',
    link: '',
  }

  render() {
    const { type, label, link, match } = this.props
    const { params: { id = '' } = {} } = match || {}

    return (
      <Link to={link || ''}>
        <ButtonStyled type={type} tabIndex={0}>
          {label} {id ? ` + ${id}` : ''}
        </ButtonStyled>
      </Link>
    )
  }
}
