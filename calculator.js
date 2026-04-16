const display = document.getElementById('result');
const expression = document.getElementById('expression');

let state = {
  current: '0',
  previous: null,
  operator: null,
  waitingForOperand: false,
  expression: '',
};

function updateDisplay() {
  display.textContent = state.current;
  expression.textContent = state.expression;
}

function inputDigit(digit) {
  if (state.waitingForOperand) {
    state.current = digit;
    state.waitingForOperand = false;
  } else {
    state.current = state.current === '0' ? digit : state.current + digit;
  }
}

function inputDecimal() {
  if (state.waitingForOperand) {
    state.current = '0.';
    state.waitingForOperand = false;
    return;
  }
  if (!state.current.includes('.')) {
    state.current += '.';
  }
}

function applyOperator(op) {
  const current = parseFloat(state.current);

  if (state.operator && !state.waitingForOperand) {
    const result = calculate(state.previous, current, state.operator);
    state.current = formatResult(result);
    state.previous = result;
    state.expression = `${formatResult(result)} ${opSymbol(op)}`;
  } else {
    state.previous = current;
    state.expression = `${state.current} ${opSymbol(op)}`;
  }

  state.operator = op;
  state.waitingForOperand = true;
}

function calculate(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : NaN;
  }
}

function equals() {
  if (!state.operator || state.waitingForOperand) return;
  const current = parseFloat(state.current);
  const result = calculate(state.previous, current, state.operator);
  state.expression = `${state.expression} ${state.current} =`;
  state.current = formatResult(result);
  state.previous = null;
  state.operator = null;
  state.waitingForOperand = true;
}

function clear() {
  state = { current: '0', previous: null, operator: null, waitingForOperand: false, expression: '' };
}

function toggleSign() {
  state.current = String(parseFloat(state.current) * -1);
}

function percent() {
  state.current = String(parseFloat(state.current) / 100);
}

function formatResult(n) {
  if (isNaN(n)) return 'Error';
  if (!isFinite(n)) return 'Error';
  const str = String(parseFloat(n.toPrecision(12)));
  return str;
}

function opSymbol(op) {
  return { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] || op;
}

document.querySelector('.buttons').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  const value = btn.dataset.value;
  const action = btn.dataset.action;

  if (value !== undefined) {
    if (value === '.') inputDecimal();
    else if (['+', '-', '*', '/'].includes(value)) applyOperator(value);
    else inputDigit(value);
  } else if (action) {
    if (action === 'clear') clear();
    else if (action === 'equals') equals();
    else if (action === 'toggle-sign') toggleSign();
    else if (action === 'percent') percent();
  }

  updateDisplay();
});

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
  else if (e.key === '.') inputDecimal();
  else if (e.key === '+') applyOperator('+');
  else if (e.key === '-') applyOperator('-');
  else if (e.key === '*') applyOperator('*');
  else if (e.key === '/') { e.preventDefault(); applyOperator('/'); }
  else if (e.key === 'Enter' || e.key === '=') equals();
  else if (e.key === 'Escape') clear();
  else if (e.key === 'Backspace') {
    if (!state.waitingForOperand && state.current.length > 1) {
      state.current = state.current.slice(0, -1);
    } else {
      state.current = '0';
    }
  } else return;
  updateDisplay();
});

updateDisplay();
