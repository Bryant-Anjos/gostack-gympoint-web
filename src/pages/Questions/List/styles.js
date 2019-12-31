import styled from 'styled-components'
import ReactModal from 'react-modal'
import PerfectScrollbar from 'react-perfect-scrollbar'

export const Modal = styled(ReactModal).attrs(() => ({
  style: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
    },
    content: {
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '30px',
      borderRadius: '4px',
      width: '500px',
      height: '70%',
      margin: 'auto',
    },
  },
}))`
  div {
    display: flex;
    flex-direction: column;

    & + div {
      flex-grow: 1;
      margin-top: 15px;
    }

    h3 {
      text-transform: uppercase;
      font-size: 14px;
      color: #444;
      margin-bottom: 10px;
    }

    textarea {
      border-radius: 4px;
      padding: 10px;
      flex-grow: 1;
      min-height: 40px;
    }

    button {
      border: none;
      color: #fff;
      background-color: #ee4d64;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      height: 40px;
      padding: 0 20px;
      border-radius: 4px;
      margin-top: 20px;
    }
  }
`

export const Scroll = styled(PerfectScrollbar)`
  max-height: 120px;
`
