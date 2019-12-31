import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import SelectAsync from 'react-select/async'
import pt from 'date-fns/locale/pt'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

import api from '~/services/api'

import { updateRequest } from '~/store/modules/enrollments/actions'

export default function Update({ location }) {
  const dispatch = useDispatch()
  const [enrollment, setEnrollment] = useState({})
  const [plans, setPlans] = useState([])
  const [startDate, setStartDate] = useState(null)

  useEffect(() => {
    async function getEnrollment() {
      try {
        const { id } = location.state

        const response = await api.get(`enrollments/${id}`)

        setEnrollment(response.data)
        setStartDate(new Date(response.data.start_date))
      } catch (err) {
        toast.error('Matrícula não encontrada')
      }
    }

    getEnrollment()
  }, [location.state])

  useEffect(() => {
    async function getPlans() {
      const response = await api.get('plans')
      const options = response.data.map(item => ({
        value: item.id,
        label: item.title,
      }))

      setPlans(options)
    }

    getPlans()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(updateRequest(enrollment.id, enrollment.plan.id, startDate))
  }

  const customStyles = {
    input: () => ({
      height: 40,
    }),
  }

  const loadEnrollments = async (inputValue, callback) => {
    const response = await api.get('enrollments')
    const options = response.data.map(item => ({
      value: item.id,
      label: item.student.name,
    }))

    const requestResults = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )

    callback(requestResults)
  }

  async function handleStudentChange(option) {
    const response = await api.get(`enrollments/${option.value}`)

    setEnrollment(response.data)
  }

  async function handlePlanChange(option) {
    const response = await api.get(`plans/${option.value}`)

    setEnrollment({
      ...enrollment,
      plan: response.data,
    })
  }

  const total = useMemo(() => {
    if (Object.keys(enrollment).length !== 0) {
      const price =
        Number(enrollment.plan.duration) * Number(enrollment.plan.price)

      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price)
    }

    return 0
  }, [enrollment])

  const endDate = useMemo(() => {
    if (Object.keys(enrollment).length !== 0 && startDate) {
      const date = startDate
      const finalDate = new Date(
        date.setMonth(date.getMonth() + enrollment.plan.duration)
      )

      return !Number.isNaN(Number(date))
        ? new Intl.DateTimeFormat('pt-BR').format(finalDate)
        : ''
    }

    return ''
  }, [enrollment, startDate])

  return Object.keys(enrollment).length === 0 ? (
    <h1>Carregando...</h1>
  ) : (
    <>
      <header>
        <h2>Edição de matrícula</h2>

        <div>
          <Link to="/enrollments">
            <button className="grey" type="button">
              <MdKeyboardArrowLeft size={20} />
              <span>Voltar</span>
            </button>
          </Link>

          <>
            <button className="red" type="submit" form="form">
              <MdCheck size={20} />
              <span>Salvar</span>
            </button>
          </>
        </div>
      </header>

      <section>
        <form id="form" onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="student">
              <p>Aluno</p>
              <SelectAsync
                id="student"
                styles={customStyles}
                loadOptions={loadEnrollments}
                onChange={handleStudentChange}
                cacheOptions
                value={{
                  value: enrollment.id,
                  label: enrollment.student.name,
                }}
              />
            </label>
          </div>

          <div className="input">
            <label htmlFor="plan">
              <p>Plano</p>
              <Select
                id="plan"
                styles={customStyles}
                onChange={handlePlanChange}
                value={{
                  value: enrollment.plan.id,
                  label: enrollment.plan.title,
                }}
                options={plans}
              />
            </label>
            <label htmlFor="start_date">
              <p>Data de início</p>
              <DatePicker
                name="start_date"
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                showMonthDropdown
                showYearDropdown
                locale={pt}
              />
            </label>
            <label htmlFor="end_date">
              <p>Data de término</p>
              <input id="end_date" type="text" value={endDate} disabled />
            </label>
            <label htmlFor="total">
              <p>Valor final</p>
              <input id="total" type="text" value={total} disabled />
            </label>
          </div>
        </form>
      </section>
    </>
  )
}

Update.propTypes = {
  location: PropTypes.shape({ state: PropTypes.object }).isRequired,
}
