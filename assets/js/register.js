// google sheet code url
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxS2PEFLuLBD2GGpqF1SAJTemfoH86i2fiUIzh09jcLHny-PK_puI0Lscq40IITaD4S/exec"

// section controllers
let currentSection = 1;
const totalSections = 4;


document.addEventListener('DOMContentLoaded', function() {
  
  // next and previous buttons visibility connection
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  // update the current section
  function updateIndicators() {
    for (let i = 1; i <= totalSections; i++) {
      const circle = document.getElementById('circle-' + i);
      const conn = document.getElementById('conn-' + i);
      if (circle) {
        circle.classList.remove('active', 'completed');
        if (i < currentSection) {
          circle.classList.add('completed');
        } else if (i === currentSection) {
          circle.classList.add('active');
        }
      }
      if (conn) {
        conn.classList.remove('completed');
        if (i < currentSection) {
          conn.classList.add('completed');
        }
      }
    }
  }

  // section visibility
  function showSection(n) {
    const sections = document.querySelectorAll('.form-section');
    let targetSection = '';
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('active');
    }
    // to display the employed or student section
    if(currentSection == 2 && document.getElementById('occupation').value === "Student"){
      targetSection = document.getElementById('section-2a');
    }
    else if(currentSection == 2 && document.getElementById('occupation').value === "Employed") {
      targetSection = document.getElementById('section-2b');
    }
    else {
      targetSection = document.getElementById('section-' + n);
    }
    
    if (targetSection) {
      targetSection.classList.add('active');
    }
    if (prevBtn) {
      prevBtn.style.display = n === 1 ? 'none' : 'inline-block';
    }
    if (nextBtn) {
      nextBtn.textContent = n === totalSections ? 'Submit' : 'Next';
    }
    updateIndicators();
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
  const re = /^[\d\s\+\-\(\)]{7,20}$/;
  return re.test(phone);
  }

  function validateCheckboxGroup(section, groupName) {
  const checkboxes = section.querySelectorAll('input[name="' + groupName + '"]');
  let isChecked = false;
  
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      isChecked = true;
      break;
    }
  }
  
  return isChecked;
}



function validateSection(sectionId) {
  const section = document.getElementById('section-' + sectionId);
  if (!section) return true;
  
  const inputs = section.querySelectorAll('input[required], select[required], textarea[required]');
  let valid = true;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    
    // Remove previous error
    input.classList.remove('is-invalid');

    let hasError = false;

    if (input.type === 'checkbox' && !input.checked) {
      hasError = true;
    } else if (input.type === 'radio') {
      const radioGroup = section.querySelectorAll('input[name="' + input.name + '"]');
      let radioChecked = false;
      for (let j = 0; j < radioGroup.length; j++) {
        if (radioGroup[j].checked) radioChecked = true;
      }
      if (!radioChecked) hasError = true;
    } else if (input.type !== 'checkbox' && input.value.trim() === '') {
      hasError = true;
    }

    // Email validation
    if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value)) {
      hasError = true;
    }

    // Phone validation
    if (input.type === 'tel' && input.value.trim() !== '' && !validatePhone(input.value)) {
      hasError = true;
    }

    if (hasError) {
      input.classList.add('is-invalid');
      valid = false;
    }
  }

  // Checkbox group validation
  const eventsGroup = section.querySelector('#events-group');
  if (eventsGroup) {
    eventsGroup.classList.remove('is-invalid');
    if (!validateCheckboxGroup(section, 'events')) {
      eventsGroup.classList.add('is-invalid');
      valid = false;
    }
  }

  return valid;
}

  // From data to be dispatched to google sheet
  function getFormData() {
    return {
      name: document.getElementById('name') ? document.getElementById('name').value : '',
      email: document.getElementById('email') ? document.getElementById('email').value : '',
      gender: document.getElementById('gender') ? document.getElementById('gender').value : '',
      phone: document.getElementById('phone') ? document.getElementById('phone').value : '',
      age: document.getElementById('age') ? document.getElementById('age').value : '',
      cv: document.getElementById('cv') ? document.getElementById('cv').value : '',
      country: document.getElementById('country') ? document.getElementById('country').value : '',
      occupation: document.getElementById('occupation') ? document.getElementById('occupation').value : '',
      university: document.getElementById('university') ? document.getElementById('university').value : '',
      year: document.getElementById('year') ? document.getElementById('year').value : '',
      fieldOfStudy: document.getElementById('field-of-study') ? document.getElementById('field-of-study').value : '',
      employmentInfo: document.getElementById('employment-info') ? document.getElementById('employment-info').value : '',
      importanceIndaba: document.getElementById('importance-indaba') ? document.getElementById('importance-indaba').value : '',
      // event checkbox
      events: (function() {
      const checked = document.querySelectorAll('input[name="events"]:checked');
      const values = [];
      for (let i = 0; i < checked.length; i++) {
        values.push(checked[i].value);
      }
      return values.join(', ');
      })(),
      shareInformation: document.getElementById('share-information') ? document.getElementById('share-information').value : '',
      stableInternet: document.getElementById('stable-internet') ? document.getElementById('stable-internet').value : '',
      haveLaptop: document.getElementById('have-laptop') ? document.getElementById('have-laptop').value : '',
      vpn: document.getElementById('vpn') ? document.getElementById('vpn').value : '',
      gatherly: document.getElementById('gatherly') ? document.getElementById('gatherly').value : '',
      hearAboutUs: document.getElementById('hear-about-us') ? document.getElementById('hear-about-us').value : '',
      comments: document.getElementById('comments') ? document.getElementById('comments').value : '',
      dataStructures: document.getElementById('data-structures') ? document.getElementById('data-structures').value : '',
      pythonPrograming: document.getElementById('python-programing') ? document.getElementById('python-programing').value : '',
      linearAlgebra: document.getElementById('linear-algebra') ? document.getElementById('linear-algebra').value : '',
      statistics: document.getElementById('statistics') ? document.getElementById('statistics').value : '',
      calculus: document.getElementById('calculus') ? document.getElementById('calculus').value : '',
      mlKnowledge: document.getElementById('ml-knowledge') ? document.getElementById('ml-knowledge').value : '',
      tutorExprience: document.getElementById('tutor-exprience') ? document.getElementById('tutor-exprience').value : ''
    };
  }

  function submitToGoogleSheets(data) {
    nextBtn.disabled = true;
    nextBtn.textContent = 'Submitting...';

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(function() {
      document.getElementById('multiStepForm').style.display = 'none';
      document.getElementById('successMessage').style.display = 'block';
      document.querySelector('.step-indicator').style.display = 'none';
    })
    .catch(function(error) {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again.');
      nextBtn.disabled = false;
      nextBtn.textContent = 'Submit';
    });
  }

  // Next button click handler
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      
      if (validateSection(currentSection)) {
        if (currentSection < totalSections) {
          currentSection++;
          showSection(currentSection);
        } else {
          var formData = getFormData();
          submitToGoogleSheets(formData);
        }
      } else {
      }
    });
  }

  // Previous button click handler
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentSection > 1) {
        currentSection--;
        showSection(currentSection);
      }
    });
  }

  const allInputs = document.querySelectorAll('input, select, textarea');
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('input', function() {
      this.classList.remove('is-invalid');
    });
    allInputs[i].addEventListener('change', function() {
      this.classList.remove('is-invalid');
    });
  }

  const checkboxGroups = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
  for (let i = 0; i < checkboxGroups.length; i++) {
    checkboxGroups[i].addEventListener('change', function() {
      const group = this.closest('.checkbox-group');
      if (group) group.classList.remove('is-invalid');
    });
  }
  
});
