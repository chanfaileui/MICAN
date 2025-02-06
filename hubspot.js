<script>
  const diagQualitative = {
    English: {
      mental: {
        normal: 'normal',
        light: 'light',
        med: 'modestly serious',
        serious: 'serious',
        severe: 'quite severe'
      },
      life: {
        extremely_dissatisfied: 'extremely dissatisfied',
        dissatisfied: 'dissatisfed',
        neutral: 'passable',
        satisfied: 'satisfed',
        highly_satisfied: 'very satisfied'
      }
    },
    Cantonese: {
      mental: {
        normal: '正常',
        light: '輕微',
        med: '輕度嚴重',
        serious: '嚴重',
        severe: '相當嚴重'
      },
      life: {
        extremely_dissatisfied: '非常不滿意',
        dissatisfied: '不滿意',
        neutral: '尚可',
        satisfied: '滿意',
        highly_satisfied: '非常滿意'
      }
    },
    Mandarin: {
      mental: {
        normal: '正常',
        light: '轻微',
        med: '轻度严重',
        serious: '严重',
        severe: '相当严重'
      },
      life: {
        extremely_dissatisfied: '非常不满意',
        dissatisfied: '不满意',
        neutral: '尚可',
        satisfied: '满意',
        highly_satisfied: '非常满意'
      }
    }
  }
  const allSections = {
    course_builtin: 'section_1727118504288_527',
    course_fundamental: 'section_1727118525481_575',
    course_parenting: 'section_1727118577627_714',
    course_bad_mood: 'section_1727293159545_381',
    course_anxiety_fear: 'section_1727306212853_384',
    course_self_value: 'section_1727306233691_407',
    diagnosis_head: 'section_1727118349304_397',
    diagnosis_questions: 'section_1727118392937_425',
    diagnosis_result: 'section_1727118482472_486'
  }
  // This array is used for course recommendation after analysis. Hide it before completing analysis
  const suggestedCourseSection = {
    course_builtin: 'section_1727118504288_527',
    course_fundamental: 'section_1727118525481_575',
    course_parenting: 'section_1727118577627_714',
    course_bad_mood: 'section_1727293159545_381',
    course_anxiety_fear: 'section_1727306212853_384',
    course_self_value: 'section_1727306233691_407',
    course_stress: 'section_1728396226419_372'
  }

  const otherSections = {
    diagnosis_questions: 'section_1727118392937_425',
    diagnosis_result: 'section_1727118482472_486'
  }

  function hideSuggestCourseSection () {
    for (let key in suggestedCourseSection) {
      var obj = document.getElementById(suggestedCourseSection[key])
      obj.style.display = 'none'
    }
  }

  function hideOtherSection () {
    for (let key in otherSections) {
      var obj = document.getElementById(otherSections[key])
      obj.style.display = 'none'
    }
  }
  hideOtherSection()
  hideSuggestCourseSection()
  try {
    document.getElementById('el_1728213036439_393').style.display = 'none'
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
  try {
    document.getElementById('el_1728293248187_485').style.display = 'none'
  } catch (error) {
    console.error('An error occurred:', error.message)
  }

  let currentQuestion = 1
  const totalQuestions = 28

  function showNextQuestion (event) {
    if (event) event.preventDefault()

    document.getElementById('next_step_button').style.display = 'none'

    const currentQDiv = document.getElementById(`question-${currentQuestion}`)
    currentQDiv.classList.add('fade-out', 'no-interaction')
    currentQDiv.addEventListener(
      'animationend',
      function () {
        currentQDiv.classList.remove(
          'fade-in',
          'fade-out',
          'hidden',
          'no-interaction'
        )
        currentQDiv.style.display = 'none' // Ensure the element is hidden
      },
      { once: true }
    )

    currentQuestion++
    if (currentQuestion <= 28) {
      const nextQDiv = document.getElementById(`question-${currentQuestion}`)
      nextQDiv.classList.add('no-interaction')
      setTimeout(() => {
        nextQDiv.classList.remove('hidden')
        nextQDiv.classList.add('fade-in')
        nextQDiv.style.display = 'block' // Ensure the element is displayed
      }, 500) // Match this to your fade-out duration
      setTimeout(() => {
        nextQDiv.classList.remove('no-interaction')
      }, 1000)
      document.getElementById('progress-bar').style.width =
        (currentQuestion / 28) * 100 + '%'

      if (currentQuestion > 1) {
        // document.getElementById('pre_qusestion_button').style.display = "block";
      }
    } else {
      document.getElementById('progress-bar').style.display = 'none'
      document.getElementById('pre_qusestion_button').style.display = 'none'
      document.getElementById('next_step_button').style.display = 'none'
      ShowTime()
    }
  }

  function showPreviousQuestion (event) {
    if (event) event.preventDefault()

    if (currentQuestion <= 1) {
      // document.getElementById('pre_qusestion_button').style.display = "none";
      const obj = document.getElementById(allSections['diagnosis_questions'])
      obj.style.display = 'none'
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      //obj.scrollIntoView();
      //hide diagnosis header
      try {
        document.getElementById('section_1564405816535_1').style.display = 'block'
      } catch (error) {
        console.error('An error occurred:', error.message)
      }
      try {
        document.getElementById('section_1564405797906_0').style.display = 'block'
      } catch (error) {
        console.error('An error occurred:', error.message)
      }
      document.getElementById('section_123412341234_0').style.display = 'block'
      document.getElementById(allSections['diagnosis_head']).style.display =
        'block'
      var section = document.querySelector(
        'section[data-section-id="topbar1_mobile"]'
      )
      // Hide the section element by setting its display style to 'none'
      if (section) {
        section.style.display = 'block'
      }
      document.getElementById('progress-bar').style.display = 'none'
    } else {
      const currentQDiv = document.getElementById(`question-${currentQuestion}`)
      // currentQDiv.style.display = 'none';
      currentQDiv.classList.add('fade-out')
      currentQDiv.addEventListener(
        'animationend',
        function () {
          currentQDiv.classList.remove('fade-in')
          currentQDiv.classList.remove('fade-out')
          currentQDiv.classList.add('hidden')
          currentQDiv.style.display = 'none' // Ensure the element is hidden
        },
        {
          once: true
        }
      )
      currentQuestion--
    }

    if (currentQuestion <= totalQuestions) {
      const nextQDiv = document.getElementById(`question-${currentQuestion}`)
      document.getElementById('progress-bar').style.width =
        ((currentQuestion / 28) * 100).toString() + '%'
      setTimeout(() => {
        nextQDiv.classList.remove('hidden')
        nextQDiv.classList.add('fade-in')
        nextQDiv.style.display = 'block' // Ensure the element is displayed
      }, 500)
    }
  }

  function selectOption (questionId, value) {
    // document.getElementById("next_step_button").style.display = 'block'
    document.getElementById(questionId).value = value
  }
  const buttons = document.querySelectorAll('.choice-btn')
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const button = event.target
      button.disabled = true

      setTimeout(() => {
        const questionId = this.getAttribute('data-question')
        const value = this.getAttribute('data-value')

        // Remove 'clicked' class from all buttons in the same question
        const questionButtons = this.parentElement.querySelectorAll('.choice-btn')
        questionButtons.forEach(btn => btn.classList.remove('clicked'))

        // Add 'clicked' class to the clicked button
        this.classList.add('clicked')

        showNextQuestion()
        button.disabled = false
      }, 300) // Adjust the delay as needed
    })
  })
  // Initially show the first question
  document.getElementById('question-1').style.display = 'block'
  document.getElementById('pre_qusestion_button').style.display = 'block'

  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function move () {
    var i = 0
    if (i == 0) {
      i = 1
      var elem = document.getElementById('myBar2')
      var width = 50
      var id = setInterval(frame, 10)

      function frame () {
        if (width >= 100) {
          clearInterval(id)
          i = 0
        } else {
          width++
          elem.style.width = width + '%'
        }
      }
    }
  }
  async function ShowTime () {
    //show progress bar
    // document.getElementById("myProgress2").style.display = "block";
    var tickLogo = document.getElementById('tickLogo')
    var textMessage = document.getElementById('textMessage')
    tickLogo.style.display = 'block' // Ensure the element is displayed
    tickLogo.classList.add('fade-in')
    tickLogo.addEventListener(
      'animationend',
      function () {
        textMessage.style.display = 'block' // Ensure the element is displayed
        textMessage.classList.add('fade-in')
      },
      {
        once: true
      }
    )
    move()
    //show result
    ShowIt()
  }

  // ------------------------- narrative generation ---------------------
  function showText (target, message, index, interval) {
    if (index < message.length) {
      $(target).append(message[index++])
      setTimeout(function () {
        showText(target, message, index, interval)
      }, interval)
    }
    return 'Success'
  }
  async function tellResult (language, rawResult) {
    var depression = rawResult[0]
    var anxiety = rawResult[1]
    var stress = rawResult[2]
    var lifesatisfaction = rawResult[3]
    var goodbrief =
      'We are happy your result are very good. Continue your wellbeing and keep a good shape!'
    const T_1 = 'Thanks for taking time to measure your mental health status.'
    const T_2 = 'Are you happy？'
    const T_2_1 = 'Your psychological evaluation shows: '
    const T_3 = ` - Depression level: ${depression}`
    const T_4 = ` - Anxiety level: ${anxiety}`
    const T_5 = ` - Stress level: ${stress}`
    const T_6 = ` - Life satisfaction: ${lifesatisfaction}`
    const T_7 = `${goodbrief}`
    const T_8 = 'We recommend you take the following courses ...'
    // starting element
    async function addPara (paraObj, text, isHead, isGraph, graphElement) {
      let newParagraph = document.createElement('h2')
      newParagraph.textContent = text
      newParagraph.classList.add('result_text')

      if (isHead) {
        newParagraph.classList.add('result_text_head')
      }

      newParagraph.classList.add('lw-widget-in')
      newParagraph.classList.add('learnworlds-subheading-small')
      newParagraph.classList.add('learnworlds-subheading')
      newParagraph.classList.add('learnworlds-element')
      //paraObj.appendChind(newParagraph);

      if (isGraph) {
        paraObj.before(graphElement)
      } else {
        paraObj.before(newParagraph)
      }

      //paraObj.append(newParagraph);
      //showText(paraObj, text, 0, 50);
    }
    var elObj = document.getElementById('el_1727118482472_481')
    //result text box
    elObj.textContent = ''
    elObj.classList.add('myTextStyle')
    //elObj.textContent = "";
    addPara(elObj, T_2, true, false, '')

    switch (true) {
      case depression == 'Very Severe' ||
        anxiety == 'Very Severe' ||
        stress == 'Very Severe':
        dass = 'Very Severe'
        break
      case depression == 'Severe' || anxiety == 'Severe' || stress == 'Severe':
        dass = 'Severe'
        break
      case depression == 'Moderate' ||
        anxiety == 'Moderate' ||
        stress == 'Moderate':
        dass = 'Moderate'
        break
      case depression == 'Mild' || anxiety == 'Mild' || stress == 'Mild':
        dass = 'Mild'
        break
      case depression == 'Normal' || anxiety == 'Normal' || stress == 'Normal':
        dass = 'Normal'
        break
    }
    switch (true) {
      case dass == 'Very Severe' ||
        dass == 'Severe' ||
        (dass == 'Moderate' &&
          (lifesatisfaction == 'Very Dissatisfied' ||
            lifesatisfaction == 'Dissatisfied')):
        result_msg =
          'You are a very unhappy person. Your mental health falls under the category of “psychological distress”.'
        bar_value = 'Extremely Unhappy'
        break
      case dass == 'Moderate' ||
        (dass == 'Mild' &&
          (lifesatisfaction == 'Very Dissatisfied' ||
            lifesatisfaction == 'Dissatisfied')):
        result_msg =
          'You are a very unhappy person. Your mental health is in a “low-to-medium subhealth state”.'
        bar_value = 'Very Unhappy'
        break
      case dass == 'Mild' ||
        (dass == 'Normal' &&
          (lifesatisfaction == 'Very Dissatisfied' ||
            lifesatisfaction == 'Dissatisfied')):
        result_msg =
          'You are a moderately unhappy person. Your mental health is in a “moderate subhealth state”.'
        bar_value = 'Moderately Unhappy'
        break
      case dass == 'Normal' && lifesatisfaction == 'Neutral':
        result_msg =
          'You are a slightly unhappy person. Your mental health is in a “middle to upper subhealth state”.'
        bar_value = 'Slightly Unhappy'
        break
      case dass == 'Normal' &&
        (lifesatisfaction == 'Satisfied' || lifesatisfaction == 'Very Satisfied'):
        result_msg =
          'You are a happy person and you are satisfied with your current life. Your mental health is a “healthy state”.'
        bar_value = 'Happy'
        break
    }

    addPara(elObj, T_2_1 + result_msg, false, false, '')

    switch (true) {
      case lifesatisfaction == 'Very Dissatisfied':
        result_msg_lifesatisfaction =
          'You feel very dissatisfied with life in general. '
        break
      case lifesatisfaction == 'Dissatisfied':
        result_msg_lifesatisfaction =
          'You feel dissatisfied with life in general. '
        break
      case lifesatisfaction == 'Neutral':
        result_msg_lifesatisfaction =
          'Your overall life satisfaction is neutral. '
        break
      case lifesatisfaction == 'Satisfied':
        result_msg_lifesatisfaction = 'You are satisfied with life overall. '
        break
      case lifesatisfaction == 'Very Satisfied':
        result_msg_lifesatisfaction = 'You are very satisfied with life overall. '
        break
    }

    switch (true) {
      case depression == 'Very Severe':
        result_msg_depression = 'You have very severe depression, '
        break
      case depression == 'Severe':
        result_msg_depression = 'You have severe depression, '
        break
      case depression == 'Moderate':
        result_msg_depression = 'You have moderate depression, '
        break
      case depression == 'Mild':
        result_msg_depression = 'You have mild depression, '
        break
      case depression == 'Normal':
        result_msg_depression = 'You are not depressed, '
        break
    }

    switch (true) {
      case anxiety == 'Very Severe':
        result_msg_anxiety = 'have very severe anxiety, '
        break
      case anxiety == 'Severe':
        result_msg_anxiety = 'have severe anxiety, '
        break
      case anxiety == 'Moderate':
        result_msg_anxiety = 'have moderate anxiety, '
        break
      case anxiety == 'Mild':
        result_msg_anxiety = 'have mild anxiety, '
        break
      case anxiety == 'Normal':
        result_msg_anxiety = 'have no anxiety, '
        break
    }

    switch (true) {
      case stress == 'Very Severe':
        result_msg_stress = 'and experience very severe stress.'
        break
      case stress == 'Severe':
        result_msg_stress = 'and experience severe stress.'
        break
      case stress == 'Moderate':
        result_msg_stress = 'and experience moderate stress.'
        break
      case stress == 'Mild':
        result_msg_stress = 'and experience mild stress.'
        break
      case stress == 'Normal':
        result_msg_stress = 'and have no issues with stress.'
        break
    }

    addPara(
      elObj,
      '',
      false,
      true,
      create_score_bar(
        [
          'Happy',
          'Slightly Unhappy',
          'Moderately Unhappy',
          'Very Unhappy',
          'Extremely Unhappy'
        ],
        bar_value,
        'happy',
        'sad'
      )
    )

    result_msg_2 =
      result_msg_lifesatisfaction +
      result_msg_depression +
      result_msg_anxiety +
      result_msg_stress

    addPara(elObj, result_msg_2, false, false, '')

    const table = document.createElement('table')
    table.id = 'score_table'

    // First row
    let table_row = document.createElement('tr')

    // First cell
    let table_cell = document.createElement('td')
    let label = document.createElement('label')
    label.textContent = 'Life Satisfaction'
    table_cell.appendChild(label)
    table_cell.appendChild(
      create_score_bar(
        [
          'Very Satisfied',
          'Satisfied',
          'Neutral',
          'Dissatisfied',
          'Very Dissatisfied'
        ],
        lifesatisfaction,
        'happy',
        'lifesatisfaction'
      )
    )
    table_row.appendChild(table_cell)

    // Second cell
    table_cell = document.createElement('td')
    label = document.createElement('label')
    label.textContent = 'Anxiety'
    table_cell.appendChild(label)
    table_cell.appendChild(
      create_score_bar(
        ['Normal', 'Mild', 'Moderate', 'Severe', 'Very Severe'],
        anxiety,
        'happy',
        'anxiety'
      )
    )
    table_row.appendChild(table_cell)

    table.appendChild(table_row)

    // Second row

    // First cell
    table_row = document.createElement('tr')

    table_cell = document.createElement('td')
    label = document.createElement('label')
    label.textContent = 'Depression'
    table_cell.appendChild(label)
    table_cell.appendChild(
      create_score_bar(
        ['Normal', 'Mild', 'Moderate', 'Severe', 'Very Severe'],
        depression,
        'happy',
        'depression'
      )
    )
    table_row.appendChild(table_cell)

    table.appendChild(table_row)

    // Second cell
    table_cell = document.createElement('td')
    label = document.createElement('label')
    label.textContent = 'Stress'
    table_cell.appendChild(label)
    table_cell.appendChild(
      create_score_bar(
        ['Normal', 'Mild', 'Moderate', 'Severe', 'Very Severe'],
        stress,
        'happy',
        'stress'
      )
    )
    table_row.appendChild(table_cell)

    table.appendChild(table_row)

    addPara(elObj, '', false, true, table)
  }
  function create_score_bar (label_item, result, leftIcon, rightIcon) {
    const container = document.createElement('div')
    container.className = 'icon_score_container'

    if (rightIcon == 'sad') {
      container.classList.add('icon_score_container_happy')
    }

    var createIcon = type => {
      var iconDiv = document.createElement('div')
      iconDiv.className = 'icon'
      var svg_happy = `<svg fill="#9900ff" height="40px" width="40px" version="1.1" id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
                  xml:space="preserve">
                  <g>
                      <g>
                          <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M304.917,176.917
                      l42.667-42.667c8.341-8.341,21.824-8.341,30.165,0s8.341,21.824,0,30.165L350.165,192l27.584,27.584
                      c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.462,0-10.923-2.091-15.083-6.251l-42.667-42.667
                      C296.576,198.741,296.576,185.259,304.917,176.917z M134.251,164.416c-8.341-8.341-8.341-21.824,0-30.165
                      c8.341-8.341,21.824-8.341,30.165,0l42.667,42.667c8.341,8.341,8.341,21.824,0,30.165l-42.667,42.667
                      c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251c-8.341-8.341-8.341-21.824,0-30.165L161.835,192
                      L134.251,164.416z M256,448c-86.528,0-149.333-53.824-149.333-128c0-11.776,9.536-21.333,21.333-21.333h256
                      c11.797,0,21.333,9.557,21.333,21.333C405.333,394.176,342.528,448,256,448z" />
                      </g>
                  </g>
                  <g>
                      <g>
                          <path
                              d="M152.081,341.333c11.691,43.798,59.264,64,103.915,64c44.672,0,92.245-20.203,103.915-64H152.081z" />
                      </g>
                  </g>
              </svg>`

      var svg_sad = `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 108.364 108.364"
                  xml:space="preserve">
                  <g>
                      <g>
                          <path d="M54.182,0C24.258,0,0,24.258,0,54.182c0,29.924,24.258,54.183,54.182,54.183c29.923,0,54.182-24.259,54.182-54.183
                      C108.364,24.258,84.105,0,54.182,0z M68.713,34.122c4.797,0,8.7,3.903,8.7,8.701c0,1.381-1.119,2.5-2.5,2.5s-2.5-1.119-2.5-2.5
                      c0-2.041-1.66-3.701-3.7-3.701c-2.043,0-3.703,1.66-3.703,3.701c0,1.381-1.119,2.5-2.5,2.5s-2.5-1.119-2.5-2.5
                      C60.01,38.025,63.914,34.122,68.713,34.122z M40.99,34.096c4.797,0,8.701,3.903,8.701,8.701c0,1.381-1.119,2.5-2.5,2.5
                      c-1.381,0-2.5-1.119-2.5-2.5c0-2.041-1.66-3.701-3.701-3.701c-2.042,0-3.703,1.66-3.703,3.701c0,1.381-1.119,2.5-2.5,2.5
                      s-2.5-1.119-2.5-2.5C32.287,37.999,36.191,34.096,40.99,34.096z M26.357,57.953c0.001-3.436,4.556-7.535,4.556-7.535
                      c0.438,2.747,1.52,4.344,1.52,4.344c1.218,1.818,1.218,3.508,1.218,3.508c0,3.711-3.692,3.679-3.692,3.679
                      C26.357,61.947,26.357,57.953,26.357,57.953z M76.605,79.098c-1.52,0.66-3.284-0.041-3.942-1.562
                      c-2.894-6.689-9.731-11.012-17.421-11.012c-7.869,0-14.747,4.32-17.523,11.005c-0.48,1.153-1.596,1.85-2.771,1.85
                      c-0.385,0-0.773-0.073-1.15-0.229c-1.53-0.637-2.256-2.393-1.619-3.922c3.71-8.932,12.764-14.703,23.064-14.703
                      c10.084,0,19.084,5.742,22.927,14.63C78.827,76.674,78.128,78.439,76.605,79.098z" />
                      </g>
                  </g>
              </svg>`

      var svg_stress = `<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      height="40px" width="40px" viewBox="0 0 250 260" xml:space="preserve">
  <path d="M151,39.5l-15.1,27.1l14.2-45l11.5,12.9L179.9,2L164,50.9L151,39.5z M204.2,162.6c0,52.7-42.7,95.4-95.4,95.4
  c-52.7,0-95.4-42.7-95.4-95.4c0-26.7,10.9-50.7,28.6-68.1L13.6,64.9l16.8-6.3L2.3,14.9l52.6,53.9l-17.6,4.3l10.4,16.3
  c16.6-13.8,37.9-22.2,61.2-22.2c18.5,0,35.8,5.3,50.4,14.4L196.3,35l7.8,20.7l43.5-31.4l-49.8,60.7l-10.1-19.1l-23.2,19.4
  C188.6,102.6,204.2,130.7,204.2,162.6z M69.6,167.9c10,0,18.2-7.4,19.6-17L48,128l-4.8,8.6l25.6,14.2H50
  C51.4,160.5,59.6,167.9,69.6,167.9z M158,210.3c0-23.6-22.1-10.6-49.3-10.6s-49.3-13.2-49.3,10.6c0,18.8,25.4,2.8,49.3,2.8
  C133,213.1,158,229.1,158,210.3z M148.8,150.9l25.6-14.2l-4.8-8.6l-41.1,22.9c1.4,9.6,9.6,17,19.6,17c10,0,18.2-7.4,19.6-17H148.8z"
  />
  </svg>`
      var svg_lifesatisfaction = `<svg fill="#000000" height="40px" width="40px" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 256 256" xml:space="preserve">
  <path d="M127.2,236.5c60.4,0.5,108.6-49.4,108.8-108.3c0.5-60.4-47.9-108.2-108.3-108.8C67.2,18.9,19.1,68.8,18.9,127.7
  C18.3,188.1,68.3,236.2,127.2,236.5z M178.9,84.9c10.8,0.5,18.6,8.2,18.1,18.9c-0.5,10.8-8.2,18.6-18.9,18.1
  c-10.8-0.5-18.6-8.2-18.1-18.9C160.5,92.2,168.2,84.3,178.9,84.9z M127.8,142c26.3,0.3,49.9,15.6,62,41.1c2.1,5.1-0.5,10.8-5.5,12.9
  s-10.8-0.5-14.4-5.9c-7.7-17-24.2-27.9-42.8-28.2c-18.5-0.4-34.6,10.6-42.4,27.7c-2.6,5.7-9.1,7.6-13.4,5.3
  c-5.7-2.6-7.9-7.7-5.3-13.4C76.9,157.3,101.6,141.6,127.8,142z M79.7,84.8c10.7,0.5,18.6,8.2,18.1,19c-0.5,10.8-8.2,18.6-18.9,18.1
  c-9.2-0.2-18.6-8.2-18.1-18.9C60.9,93.7,68.9,84.3,79.7,84.8z"/>
  </svg>`
      var svg_anxiety = `<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      height="40px" width="40px" viewBox="0 0 260 260" xml:space="preserve">
  <path d="M130,2C59.3,2,2,59.3,2,130s57.3,128,128,128s128-57.3,128-128S200.7,2,130,2z M45.6,88.3L108,68.7l4.2,13.4l-62.4,19.5
  L45.6,88.3z M59.9,127c0-12.2,9.8-22,22-22s22,9.8,22,22s-9.8,22-22,22S59.9,139.2,59.9,127z M173.8,209.6l-15.6-12.3l-18.8,14.8
  l-18.8-14.8l-18.8,14.8l-22-17.3l6.4-8.1l15.6,12.3l18.8-14.8l18.8,14.8l18.8-14.8l22,17.3L173.8,209.6z M178.1,149
  c-12.2,0-22-9.8-22-22s9.8-22,22-22s22,9.8,22,22S190.3,149,178.1,149z M210.2,101.6l-62.4-19.5l4.2-13.4l62.4,19.5L210.2,101.6z"/>
  </svg>`
      var svg_depression = `<svg fill="#000000" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 512 512" xml:space="preserve">
  <g>
  <g>
      <path d="M255.999,298.667c-48.192,0-76.651,22.101-83.563,64h167.125C332.651,320.768,304.192,298.667,255.999,298.667z"/>
  </g>
  </g>
  <g>
  <g>
      <path d="M255.999,42.667c-32.299,0-64.192,6.955-93.781,19.947C152.533,32.384,134.379,0,106.666,0
          c-44.032,0-64,81.813-64,106.667c0,16.512,6.464,31.445,16.768,42.816c-24.939,38.08-38.101,81.856-38.101,127.851
          C21.333,406.72,126.612,512,255.999,512s234.667-105.28,234.667-234.667S385.387,42.667,255.999,42.667z M149.333,213.333
          c26.709,0,42.667-15.957,42.667-42.667c0-11.776,9.536-21.333,21.333-21.333s21.333,9.557,21.333,21.333
          c0,50.24-35.093,85.333-85.333,85.333c-11.797,0.001-21.333-9.556-21.333-21.332S137.536,213.333,149.333,213.333z
              M125.845,115.669c-0.981,2.091-2.261,4.032-3.84,5.696c-0.341,0.341-0.747,0.619-1.109,0.96
          c-1.557,1.408-3.285,2.603-5.205,3.499c-0.363,0.192-0.725,0.427-1.109,0.576c-2.219,0.896-4.651,1.344-7.147,1.451
          c-0.64,0.021-1.28-0.043-1.92-0.085c-1.792-0.107-3.499-0.512-5.141-1.045c-0.875-0.277-1.728-0.427-2.603-0.832h-0.064
          c-7.253-3.413-12.373-10.688-12.373-19.221c0-17.536,12.16-51.797,21.333-62.144c7.637,8.619,17.237,33.707,20.288,52.032
          c0.021,0.171-0.021,0.363,0,0.533c0.597,3.669,1.045,6.955,1.045,9.579c0,2.603-0.64,5.013-1.472,7.317
          C126.314,114.56,126.101,115.115,125.845,115.669z M362.667,405.333H149.333c-11.797,0-21.333-9.557-21.333-21.333
          c0-80.149,47.851-128,128-128s128,47.851,128,128C384,395.776,374.464,405.333,362.667,405.333z M362.667,256
          c-50.24,0-85.333-35.093-85.333-85.333c0-11.776,9.536-21.333,21.333-21.333S320,158.891,320,170.667
          c0,26.709,15.957,42.667,42.667,42.667c11.797,0,21.333,9.557,21.333,21.333S374.464,256,362.667,256z"/>
  </g>
  </g>
  </svg>`

      if (type == 'happy') {
        iconDiv.innerHTML = svg_happy
      } else if (type == 'depression') {
        iconDiv.innerHTML = svg_depression
      } else if (type == 'anxiety') {
        iconDiv.innerHTML = svg_anxiety
      } else if (type == 'stress') {
        iconDiv.innerHTML = svg_stress
      } else if (type == 'lifesatisfaction') {
        iconDiv.innerHTML = svg_lifesatisfaction
      } else if (type == 'sad') {
        iconDiv.innerHTML = svg_sad
      }

      return iconDiv
    }

    // Create score-bar container
    const scoreBarContainer = document.createElement('div')
    scoreBarContainer.className = 'score-bar-container'

    // Create labels-icons
    const labelsIcons = document.createElement('div')
    labelsIcons.className = 'labels-icons'

    // Create labels
    const labels = document.createElement('div')
    labels.className = 'labels'

    // Label texts
    const labelTexts = label_item
    labelTexts.forEach((text, index) => {
      const labelContainer = document.createElement('div')
      labelContainer.className = 'label-container'

      const label = document.createElement('div')

      label.id = `label${index + 1}`
      label.innerText = text

      if (result == text) {
        label.className = 'bold-label'
      } else {
        label.className = 'label'
      }

      const arrow = document.createElement('div')

      if (result == text) {
        arrow.className = 'arrow'
        arrow.classList.add('bold-arrow')
      } else {
        arrow.className = 'arrow'
      }
      label.appendChild(arrow)

      labelContainer.appendChild(label)
      labels.appendChild(labelContainer)
    })

    labelsIcons.appendChild(labels)
    scoreBarContainer.appendChild(labelsIcons)

    // Create score-bar
    const scoreBar = document.createElement('div')
    scoreBar.className = 'score-bar'

    // Create gradient-bar
    const gradientBar = document.createElement('div')
    gradientBar.className = 'gradient-bar'
    scoreBar.appendChild(gradientBar)

    scoreBarContainer.appendChild(scoreBar)

    // Append all elements to the container
    container.appendChild(createIcon(leftIcon))
    container.appendChild(scoreBarContainer)
    container.appendChild(createIcon(rightIcon))

    return container
  }

  // ------------------------calculation -------------------------------------------------
  function diagnosis (lookType, lookScore) {
    const diagLevel = ['Normal', 'Mild', 'Moderate', 'Severe', 'Very Severe']
    const diagLevel2 = [
      'Very Dissatisfied',
      'Dissatisfied',
      'Neutral',
      'Satisfied',
      'Very Satisfied'
    ]
    var diagDepressionResult
    var diagAnxietyResult
    var diagStressResult
    var diagLifeSatisfactionResult
    if (lookType === 'depression') {
      switch (true) {
        case lookScore < 10:
          diagDepressionResult = diagLevel[0]
          break
        case lookScore < 14:
          diagDepressionResult = diagLevel[1]
          break
        case lookScore < 21:
          diagDepressionResult = diagLevel[2]
          break
        case lookScore < 28:
          diagDepressionResult = diagLevel[3]
          break
        case lookScore >= 28:
          diagDepressionResult = diagLevel[4]
          break
      }
      return diagDepressionResult
    } else if (lookType === 'anxiety') {
      switch (true) {
        case lookScore < 11:
          diagAnxietyResult = diagLevel[0]
          break
        case lookScore < 14:
          diagAnxietyResult = diagLevel[1]
          break
        case lookScore < 21:
          diagAnxietyResult = diagLevel[2]
          break
        case lookScore < 28:
          diagAnxietyResult = diagLevel[3]
          break
        case lookScore >= 28:
          diagAnxietyResult = diagLevel[4]
          break
      }
      return diagAnxietyResult
    } else if (lookType === 'stress') {
      switch (true) {
        case lookScore < 17:
          diagStressResult = diagLevel[0]
          break
        case lookScore < 21:
          diagStressResult = diagLevel[1]
          break
        case lookScore < 29:
          diagStressResult = diagLevel[2]
          break
        case lookScore < 38:
          diagStressResult = diagLevel[3]
          break
        case lookScore >= 38:
          diagStressResult = diagLevel[4]
          break
      }
      return diagStressResult
    } else if (lookType === 'lifesatisfaction') {
      switch (true) {
        case lookScore < 14:
          diagLifeSatisfactionResult = diagLevel2[0]
          break
        case lookScore < 20:
          diagLifeSatisfactionResult = diagLevel2[1]
          break
        case lookScore < 27:
          diagLifeSatisfactionResult = diagLevel2[2]
          break
        case lookScore < 33:
          diagLifeSatisfactionResult = diagLevel2[3]
          break
        case lookScore >= 33:
          diagLifeSatisfactionResult = diagLevel2[4]
          break
      }
      return diagLifeSatisfactionResult
    } else {
      return ''
    }
  }
  //---------------------extraction and calculation----------------------
  function doSomething () {
    var depression =
      2 *
      (parseInt(q8.value) +
        parseInt(q10.value) +
        parseInt(q15.value) +
        parseInt(q18.value) +
        parseInt(q21.value) +
        parseInt(q22.value) +
        parseInt(q26.value))
    var anxiety =
      2 *
      (parseInt(q7.value) +
        parseInt(q9.value) +
        parseInt(q12.value) +
        parseInt(q14.value) +
        parseInt(q20.value) +
        parseInt(q24.value) +
        parseInt(q25.value))
    var stress =
      2 *
      (parseInt(q6.value) +
        parseInt(q11.value) +
        parseInt(q13.value) +
        parseInt(q16.value) +
        parseInt(q17.value) +
        parseInt(q19.value) +
        parseInt(q23.value))
    var lifesatisfaction =
      parseInt(q1.value) +
      parseInt(q2.value) +
      parseInt(q3.value) +
      parseInt(q4.value) +
      parseInt(q5.value)

    var depressionResult = diagnosis('depression', depression)
    var anxietyResult = diagnosis('anxiety', anxiety)
    var stressResult = diagnosis('stress', stress)
    var lifeSatisfactionResult = diagnosis('lifesatisfaction', lifesatisfaction)
    var isParent = parseInt(q27.value)
    var hasFriendsWithMentalConncern = parseInt(q28.value)
    var allResult = [
      depressionResult,
      anxietyResult,
      stressResult,
      lifeSatisfactionResult,
      isParent,
      hasFriendsWithMentalConncern
    ]
    var intResult = [depression, anxiety, stress, lifesatisfaction]
    return [allResult, intResult]
  }
  //------------------show the result -----------------------------------------
  async function ShowIt () {
    await sleep(1500)

    try {
      document.getElementById('el_1728213036439_393').style.display = 'block'
    } catch (error) {
      console.error('An error occurred:', error.message)
    }
    try {
      document.getElementById('el_1728293248187_485').style.display = 'block'
    } catch (error) {
      console.error('An error occurred:', error.message)
    }

    try {
      document.getElementById('section_1564405816535_1').style.display = 'block'
    } catch (error) {
      console.error('An error occurred:', error.message)
    }
    try {
      document.getElementById('section_1564405797906_0').style.display = 'block'
    } catch (error) {
      console.error('An error occurred:', error.message)
    }

    document.getElementById('section_123412341234_0').style.display = 'block'
    const [allResult, intResult] = doSomething()
    var resultStatementObj = document.getElementById(
      allSections['diagnosis_result']
    )
    var elObj = document.getElementById('el_1727119625279_466')
    elObj.style.setProperty('font-size', '25px')
    elObj.style.setProperty('color', 'green')
    //
    // show result statement
    if (resultStatementObj.style.display == 'none')
      resultStatementObj.style.display = 'block'
    //
    //
    // Generate qualitative conclusion
    tellResult('Cantonese', allResult)
    //
    //
    //
    /*  change overall layout as assessment proceed */
    //hide form
    var formObj = document.getElementById(allSections['diagnosis_questions'])
    formObj.style.display = 'none'
    //hide start assessment section
    var headStatementObj = document.getElementById(allSections['diagnosis_head'])
    headStatementObj.style.display = 'none'
    //show suggest course
    //showSuggestCourseSection(["course_fundamental", "course_parenting"]);
    resultStatementObj.scrollIntoView()
    showSuggestCourse(allResult, intResult)

    // [depression, anxiety, stress, lifesatisfaction]
    let depression = intResult[0]
    let anxiety = intResult[1]
    let stress = intResult[2]
    let lifesatisfaction = intResult[3]

    // Hubspot: Submit the assessment data
    submitToHubSpot(depression, anxiety, stress, lifesatisfaction)
  }

  // --------------------- HubSpot Submission ---------------------
  function submitToHubSpot (depression, anxiety, stress, lifesatisfaction) {
    const payload = {
      submittedAt: Date.now().toString(),
      fields: [
        {
          objectTypeId: '0-1',
          name: 'email',
          value: '{{USER.EMAIL}}'
        },
        {
          objectTypeId: '0-1',
          name: 'depression_score',
          value: depression
        },
        {
          objectTypeId: '0-1',
          name: 'anxiety_score',
          value: anxiety
        },
        {
          objectTypeId: '0-1',
          name: 'stress_score',
          value: stress
        },
        {
          objectTypeId: '0-1',
          name: 'life_satisfaction_score',
          value: lifesatisfaction
        }
      ],
      // Context information helps HubSpot associate the submission with the correct page and tracking info.
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: 'I agree to allow Example Company to store and process my personal data.',
          communications: [
            {
              value: true,
              subscriptionTypeId: 999, // Replace with your actual subscription type id if needed.
              text: 'I agree to receive marketing communications from Example Company.'
            }
          ]
        }
      }
    }

    // Make the POST request to HubSpot's secure submission endpoint.
    fetch(
      'https://api.hsforms.com/submissions/v3/integration/submit/241897474/7e40ba8f-bd24-4571-89d3-ac9d8c695599',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log('HubSpot submission response:', data)
      })
      .catch(error => {
        console.error('Error submitting to HubSpot:', error)
      })
  }
  
  document.addEventListener("DOMContentLoaded", function() {
  // Use sample numeric values for depression, anxiety, stress, and life satisfaction
    submitToHubSpot(5, 6, 7, 8);
  });
 
  // --------------------------recommendation -------------------------------------------
  function showSuggestCourseSection (suggestedCourseKey) {
    suggestedCourseKey.forEach(
      key =>
        (document.getElementById(suggestedCourseSection[key]).style.display =
          'block')
    )
  }

  function showSuggestCourse (qali_result, quant_result) {
    //---- always show fundamental
    showSuggestCourseSection(['course_fundamental'])
    // --- is parent?---------------
    if (qali_result[4] === 0) {
      showSuggestCourseSection(['course_parenting'])
    }
    // --- hasFriendsWithMentalConncern---------------
    if (qali_result[5] === 0) {
      showSuggestCourseSection(['course_parenting'])
      showSuggestCourseSection(['course_bad_mood'])
      showSuggestCourseSection(['course_anxiety_fear'])
      showSuggestCourseSection(['course_stress'])
      showSuggestCourseSection(['course_self_value'])
    }
    //------depression----
    if (quant_result[0] >= 10) {
      showSuggestCourseSection(['course_bad_mood'])
    }
    //------anxiety---
    if (quant_result[1] >= 11) {
      showSuggestCourseSection(['course_anxiety_fear'])
    }
    //------stress----
    if (quant_result[2] >= 17) {
      showSuggestCourseSection(['course_stress'])
    }
    //-----lifesatisfaction ---
    if (quant_result[3] < 27) {
      showSuggestCourseSection(['course_self_value'])
    }
  }
  async function ShowQuestions () {
    await sleep(500)
    //show questions
    const obj = document.getElementById(allSections['diagnosis_questions'])
    obj.style.display = 'block'
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    //obj.scrollIntoView();
    //hide diagnosis header
    try {
      document.getElementById('section_1564405816535_1').style.display = 'none'
    } catch (error) {
      console.error('An error occurred:', error.message)
    }
    try {
      document.getElementById('section_1564405797906_0').style.display = 'none'
    } catch (error) {
      console.error('An error occurred:', error.message)
    }
    document.getElementById('section_123412341234_0').style.display = 'none'
    document.getElementById(allSections['diagnosis_head']).style.display = 'none'
    var section = document.querySelector(
      'section[data-section-id="topbar1_mobile"]'
    )
    // Hide the section element by setting its display style to 'none'
    if (section) {
      section.style.display = 'none'
    }
    document.getElementById('progress-bar').style.display = 'block'
  }

</script>