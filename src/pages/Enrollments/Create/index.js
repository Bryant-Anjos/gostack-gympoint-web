import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'
import Select from 'react-select'
import SelectAsync from 'react-select/async'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt'

import api from '~/services/api'

import { createRequest } from '~/store/modules/enrollments/actions'

export default function Create() {
  const dispatch = useDispatch()
  const [student, setStudent] = useState({})
  const [plan, setPlan] = useState({})
  const [plans, setPlans] = useState([])
  const [startDate, setStartDate] = useState(new Date())

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
    dispatch(createRequest(student.id, plan.id, startDate))
  }

  const customStyles = {
    input: () => ({
      height: 40,
    }),
  }

  const loadStudents = async (inputValue, callback) => {
    const response = await api.get('students')
    const options = response.data.map(item => ({
      value: item.id,
      label: item.name,
    }))

    const requestResults = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )

    callback(requestResults)
  }

  async function handleStudentChange(option) {
    const response = await api.get(`students/${option.value}`)

    setStudent(response.data)
  }

  async function handlePlanChange(option) {
    const response = await api.get(`plans/${option.value}`)

    setPlan(response.data)
  }

  const total = useMemo(() => {
    const price = Number(plan.duration) * Number(plan.price)

    return price
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price)
      : 0
  }, [plan.price, plan.duration])

  const endDate = useMemo(() => {
    const date = new Date(startDate)
    const finalDate = new Date(date.setMonth(date.getMonth() + plan.duration))

    return !Number.isNaN(Number(date))
      ? new Intl.DateTimeFormat('pt-BR').format(finalDate)
      : ''
  }, [plan.duration, startDate])

  return (
    <>
      <header>
        <h2>Cadastro de matrícula</h2>

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
                loadOptions={loadStudents}
                onChange={handleStudentChange}
                cacheOptions
                placeholder="Buscar aluno"
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
                options={plans}
                placeholder="Selecione o plano"
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
