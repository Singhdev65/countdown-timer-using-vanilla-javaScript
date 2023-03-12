(function () {
  var hour = document.querySelector(".hour")
  var min = document.querySelector(".minute")
  var sec = document.querySelector(".sec")
  var startBtn = document.querySelector(".start")
  var stopBtn = document.querySelector(".stop")
  var resetBtn = document.querySelector(".reset")

  var countdownTimer = null

  function timer() {
    if (sec.value > 60) {
      min.value++
      sec.value = parseInt(sec.value) - 59
    }
    if (min.value > 60) {
      hour.value++
      min.value = parseInt(min.value) - 60
    }
    min.value = min.value > 60 ? 60 : min.value

    if (hour.value == 0 && min.value == 0 && sec.value == 0) {
      hour.value = ""
      min.value = ""
      sec.value = ""
      stopInterval()
    } else if (sec.value != 0) {
      sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value - 1}`
    } else if (min.value != 0 && sec.value == 0) {
      sec.value = 59
      min.value = `${min.value <= 10 ? "0" : ""}${min.value - 1}`
    } else if (hour.value != 0 && min.value == 0) {
      min.value = 60
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`
    }
    return
  }

  function handleStart() {
    if (hour.value == 0 && min.value == 0 && sec.value == 0) return

    function startInterval() {
      startBtn.style.display = "none"
      stopBtn.style.display = "initial"

      countdownTimer = setInterval(function () {
        timer()
      }, 1000)
    }
    startInterval()
  }

  function stopInterval(state) {
    startBtn.innerHTML = state === "pause" ? "Continue" : "Start"

    stopBtn.style.display = "none"
    startBtn.style.display = "initial"
    clearInterval(countdownTimer)
  }

  function handleReset() {
    hour.value = ""
    min.value = ""
    sec.value = ""

    stopInterval()
  }

  startBtn.addEventListener("click", handleStart)

  stopBtn.addEventListener("click", () => {
    stopInterval("pause")
  })
  resetBtn.addEventListener("click", handleReset)
})()
