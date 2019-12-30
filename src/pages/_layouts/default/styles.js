import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  background-color: #e1e8ef;

  header {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;

    h2 {
      color: #444;
      font-size: 26px;
    }

    div,
    label {
      display: flex;
      align-items: center;
    }

    a {
      & + button {
        margin-left: 20px;
      }
    }

    button,
    input {
      height: 40px;
      padding: 0 20px;
      border-radius: 4px;
      display: flex;
      align-items: center;
    }

    button {
      border: none;
      color: #fff;
      font-weight: bold;
      text-transform: uppercase;

      &.red {
        background-color: #ee4d64;
      }

      &.grey {
        background-color: #c0c0c0;
      }

      svg {
        margin-right: 5px;
      }
    }

    input {
      border: 1px solid #c0c0c0;
      padding-left: 35px;
    }

    label {
      position: relative;

      svg {
        position: absolute;
        left: 10px;
        color: #c0c0c0;
      }
    }
  }

  section {
    background-color: #fff;
    padding: 30px;
    border-radius: 4px;

    table {
      width: 100%;
      border-collapse: collapse;

      thead {
        td {
          font-weight: bold;
          text-transform: uppercase;
          font-size: 1.2em;
          color: #444;
          padding: 10px 0;
        }
      }

      tbody {
        tr {
          & + tr {
            border-top: 1px solid #eee;
          }
        }

        td {
          font-size: 1.2em;
          color: #666;
          padding: 10px 0;

          button {
            border: none;
            background: none;
            font-size: 1em;

            &:hover {
              text-decoration: underline;
            }

            &.update {
              color: #4d85ee;
            }

            &.delete {
              color: #ee4d64;
            }
          }
        }
      }
    }

    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-content: flex-end;

      div.input {
        display: flex;

        & + div.input {
          margin-top: 20px;
        }

        label {
          width: 100%;
          display: flex;
          flex-direction: column;

          & + label {
            margin-left: 30px;
          }

          p {
            font-size: 16px;
            color: #444;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 5px;

            span {
              text-transform: lowercase;
              color: #444;
            }

            &.required::after {
              margin-left: 2px;
              content: '*';
              color: #ee4d64;
            }
          }

          input {
            height: 45px;
            padding: 0 20px;
            border-radius: 4px;
            border: 1px solid #c0c0c0;
          }

          span {
            color: #ee4d64;
            margin-top: 5px;
          }
        }
      }
    }
  }
`
