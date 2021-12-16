//COUNTER
// Set the date we're counting down to
var countDownDate = new Date('Jan 01, 2022 00:00:01').getTime()

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime()

  // Find the distance between now and the count down date
  var distance = countDownDate - now

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24))
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((distance % (1000 * 60)) / 1000)

  // Display the result in the element with id="counter"
  document.getElementById('counter').innerHTML =
    days + ' : ' + hours + ' : ' + minutes + ' : ' + seconds

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x)
    document.getElementById('demo').innerHTML = 'EXPIRED'
  }
}, 1000)

//ABRIR E FECHAR MODAL
let modal = document.getElementById('myModal')
let btn = document.getElementById('myBtn')
let spanClose = document.getElementsByClassName('close')[0]

btn.onclick = function () {
  modal.style.display = 'block'
}

spanClose.onclick = function () {
  modal.style.display = 'none'
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

window.onload = function () {
  modal.style.display = 'none'
}

//EFEITO DOS INPUTS
const inputs = document.querySelectorAll('.input-field')

inputs.forEach(inp => {
  inp.addEventListener('focus', () => {
    inp.classList.add('active')
  })
  inp.addEventListener('blur', () => {
    if (inp.value != '') return
    inp.classList.remove('active')
  })
})

//MENSAGENS DE ERRO E SUBMIT FORM
const fields = document.querySelectorAll('[required]')

function ValidateField(field) {
  function verifyErrors() {
    let foundError = false

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error
      }
    }
    return foundError
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: `Campo Nome não pode ficar vazio`
      },
      email: {
        valueMissing: 'Campo E-mail não pode ficar vazio',
        typeMismatch: 'Parece que não é um e-mail válido'
      }
    }
    return messages[field.type][typeError]
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector('span.error')

    if (message) {
      spanError.classList.add('on')

      spanError.innerHTML = message
    } else {
      spanError.classList.remove('on')

      spanError.innerHTML = ''
    }
  }

  return function () {
    const error = verifyErrors()

    if (error) {
      const message = customMessage(error)

      setCustomMessage(message)
    } else {
      setCustomMessage()
    }
  }
}

function customValidation(event) {
  const field = event.target
  const validation = ValidateField(field)

  validation()
}

for (field of fields) {
  field.addEventListener('invalid', event => {
    event.preventDefault()

    customValidation(event)
  })

  field.addEventListener('blur', customValidation)
}
