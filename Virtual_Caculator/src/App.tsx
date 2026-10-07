import { useEffect, useState } from 'react'
import './App.css'

type ButtonColor = 'number' | 'utility' | 'operator' | 'equals'
type Operator = '+' | '−' | '×' | '÷'

type CalculatorButtonProps = {
  label: string
  color: ButtonColor
  onClick: () => void
  wide?: boolean
  ariaLabel?: string
}

type DisplayProps = {
  value: string
  expression: string
}

type HistoryEntry = {
  expression: string
  result: string
}

function Display({ value, expression }: DisplayProps) {
  return (
    <div className="display" aria-live="polite" aria-atomic="true">
      <p className="display-expression">{expression || '\u00a0'}</p>
      <output className="display-value" aria-label="Kết quả hiện tại">
        {value}
      </output>
    </div>
  )
}

function CalculatorButton({
  label,
  color,
  onClick,
  wide = false,
  ariaLabel,
}: CalculatorButtonProps) {
  return (
    <button
      className={`calculator-button button-${color}${wide ? ' button-wide' : ''}`}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
    >
      {label}
    </button>
  )
}

const numberRows = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
]

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return 'Lỗi'
  return Number(value.toPrecision(11)).toString()
}

function calculate(left: number, right: number, operator: Operator) {
  switch (operator) {
    case '+':
      return left + right
    case '−':
      return left - right
    case '×':
      return left * right
    case '÷':
      return right === 0 ? Number.NaN : left / right
  }
}

function App() {
  const [display, setDisplay] = useState('0')
  const [storedValue, setStoredValue] = useState<number | null>(null)
  const [operator, setOperator] = useState<Operator | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [expression, setExpression] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])

  function inputDigit(digit: string) {
    if (display === 'Lỗi') clearCalculator()
    setDisplay((current) => {
      if (waitingForOperand || current === 'Lỗi' || current === '0') return digit
      if (current.replace('-', '').replace('.', '').length >= 12) return current
      return current + digit
    })
    setWaitingForOperand(false)
  }

  function clearCalculator() {
    setDisplay('0')
    setStoredValue(null)
    setOperator(null)
    setWaitingForOperand(false)
    setExpression('')
  }

  function inputDecimal() {
    if (waitingForOperand || display === 'Lỗi') {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (!display.includes('.')) {
      setDisplay(`${display}.`)
    }
  }

  function chooseOperator(nextOperator: Operator) {
    const currentValue = Number(display)
    if (operator && storedValue !== null && !waitingForOperand) {
      const result = calculate(storedValue, currentValue, operator)
      setDisplay(formatNumber(result))
      setStoredValue(result)
      setExpression(`${formatNumber(result)} ${nextOperator}`)
    } else {
      setStoredValue(currentValue)
      setExpression(`${display} ${nextOperator}`)
    }
    setOperator(nextOperator)
    setWaitingForOperand(true)
  }

  function showResult() {
    if (operator === null || storedValue === null || waitingForOperand) return
    const rightValue = Number(display)
    const result = calculate(storedValue, rightValue, operator)
    const resultText = formatNumber(result)
    const completedExpression = `${formatNumber(storedValue)} ${operator} ${formatNumber(rightValue)} =`
    setHistory((items) =>
      [{ expression: completedExpression, result: resultText }, ...items].slice(0, 4),
    )
    setExpression(completedExpression)
    setDisplay(resultText)
    setStoredValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }

  function toggleSign() {
    if (display === '0' || display === 'Lỗi') return
    setDisplay(display.startsWith('-') ? display.slice(1) : `-${display}`)
  }

  function applyPercent() {
    if (display !== 'Lỗi') setDisplay(formatNumber(Number(display) / 100))
  }

  function deleteDigit() {
    if (waitingForOperand || display === 'Lỗi') return
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0')
  }

  function handleButton(label: string) {
    if (/^\d$/.test(label)) return inputDigit(label)
    if (label === '.') return inputDecimal()
    if (label === 'AC') return clearCalculator()
    if (label === '±') return toggleSign()
    if (label === '%') return applyPercent()
    if (label === '⌫') return deleteDigit()
    if (label === '=') return showResult()
    if (['+', '−', '×', '÷'].includes(label)) chooseOperator(label as Operator)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key
      if (/^\d$/.test(key)) inputDigit(key)
      else if (key === '.') inputDecimal()
      else if (key === 'Enter' || key === '=') showResult()
      else if (key === 'Escape') clearCalculator()
      else if (key === 'Backspace') deleteDigit()
      else if (key === '+') chooseOperator('+')
      else if (key === '-') chooseOperator('−')
      else if (key === '*') chooseOperator('×')
      else if (key === '/') chooseOperator('÷')
      else if (key === '%') applyPercent()
      else return
      event.preventDefault()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Mint Calc, trang chủ">
          <span className="brand-mark">m.</span>
          <span>MINT<span className="brand-light">CALC</span></span>
        </a>
        <span className="topbar-note"><span className="status-dot" /> MÁY TÍNH CƠ BẢN</span>
      </header>

      <section className="workspace" id="top">
        <div className="side-panel">
          <div className="eyebrow"><span>01</span> / TÍNH TOÁN</div>
          <h1>Tính nhanh.<br /><span>Rõ ràng.</span></h1>
          <div className="accent-rule" />
          <section className="history" aria-label="Lịch sử phép tính">
            <div className="history-heading">
              <h2>Lịch sử</h2>
              <span>{String(history.length).padStart(2, '0')}</span>
            </div>
            {history.length ? (
              <ul>
                {history.map((item, index) => (
                  <li className="history-item" key={`${item.expression}-${index}`}>
                    <span>{item.expression}</span>
                    <strong>{item.result}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="history-empty">Phép tính vừa thực hiện sẽ xuất hiện ở đây.</p>
            )}
          </section>
          <div className="keyboard-note"><span>↵</span> Enter để tính</div>
        </div>

        <section className="calculator" aria-label="Máy tính">
          <div className="calculator-topline">
            <span>CALCULATOR</span>
            <span className="calculator-version">MC / 01</span>
          </div>
          <Display value={display} expression={expression} />

          <div className="keypad">
            <CalculatorButton label="AC" color="utility" onClick={() => handleButton('AC')} ariaLabel="Xóa tất cả" />
            <CalculatorButton label="±" color="utility" onClick={() => handleButton('±')} ariaLabel="Đổi dấu" />
            <CalculatorButton label="%" color="utility" onClick={() => handleButton('%')} ariaLabel="Phần trăm" />
            <CalculatorButton label="÷" color="operator" onClick={() => handleButton('÷')} ariaLabel="Chia" />

            {numberRows.map((row) => (
              <div className="keypad-row" key={row[0]}>
                {row.map((number) => (
                  <CalculatorButton key={number} label={number} color="number" onClick={() => handleButton(number)} />
                ))}
                <CalculatorButton
                  label={row[0] === '7' ? '×' : row[0] === '4' ? '−' : '+'}
                  color="operator"
                  onClick={() => handleButton(row[0] === '7' ? '×' : row[0] === '4' ? '−' : '+')}
                  ariaLabel={row[0] === '7' ? 'Nhân' : row[0] === '4' ? 'Trừ' : 'Cộng'}
                />
              </div>
            ))}

            <div className="keypad-row keypad-last-row">
              <CalculatorButton label="0" color="number" onClick={() => handleButton('0')} wide />
              <CalculatorButton label="." color="number" onClick={() => handleButton('.')} ariaLabel="Dấu thập phân" />
              <CalculatorButton label="=" color="equals" onClick={() => handleButton('=')} ariaLabel="Bằng" />
            </div>
          </div>
          <div className="calculator-footer"><span>DESIGNED FOR EVERYDAY MATH</span><span>●</span></div>
        </section>
      </section>
    </main>
  )
}

export default App
