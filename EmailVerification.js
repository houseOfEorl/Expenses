console.log("bar")

function goBack() {
  history.back();
}

// Copy and insert email address into verification text
const emailInput = document.getElementById('readOnlyEmail');
const emailElement = `<b class="emailAddress">${emailInput.value}</b>`;
const verificationIntro = document.getElementById('readOnlyEmail_intro');
const verificationInfo = document.getElementById('readOnlyEmail_info');
verificationIntro.innerHTML += emailElement;
verificationInfo.innerHTML += emailElement;

// Remove placeholders
const codeInput = document.getElementById('readOnlyEmail_ver_input');
codeInput.setAttribute('placeholder', " ");

// Insert custom input label
const inputLabel = document.createElement('span');
inputLabel.setAttribute('id', 'inputLabel');
inputLabel.innerHTML = 'Code de sécurité';
codeInput.insertAdjacentElement('afterend', inputLabel);

// Show input label whenever input is displayed
const inputObserver = new MutationObserver(function(e) {
  if (e[0].target.style.display === 'none') {
	inputLabel.style.display = 'none';
  } else {
	inputLabel.style.display = '';
  }
});
inputObserver.observe(codeInput, { attributes: true, childList: true })

// Handle verification error state
const verificationErrors = document.getElementsByClassName('verificationErrorText error');
const errorIcon = '<span class="material-icons">error</span>';

for (let i = 0; i < verificationErrors.length; i++) {
  const errorMessage = verificationErrors[i].innerHTML;
  verificationErrors[i].innerHTML = `${errorIcon}${errorMessage}`;

  const verificationErrorsObserver = new MutationObserver(function(e) {
	const isErrorHidden = e[0].target.getAttribute('aria-hidden');
	if (isErrorHidden === "false") {
	  codeInput.style.border = '2px solid #FA4F00';
	  codeInput.style.margin = '0 2px 0 0';
	  inputLabel.style.color = '#FA4F00';
	  e[0].target.style.display = 'flex';
	} else {
	  codeInput.style.border = '';
	  codeInput.style.margin = '';
	  inputLabel.style.color = '';
	  e[0].target.style.display = 'none';
	}
  });
  verificationErrorsObserver.observe(verificationErrors[i], { attributes: true, childList: true, subtree: true });
}    

// Handle loading state
const mainContainer = document.getElementsByClassName('container')[0];
const loadingSpinner = document.getElementById('loadingSpinner');
const sendButton = document.getElementById('readOnlyEmail_ver_but_send');
const verifyButton = document.getElementById('readOnlyEmail_ver_but_verify');

const loadingObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
	if (mutation.target.style.display !== 'none') {
	  mainContainer.style.display = 'block';
	  loadingSpinner.style.display = 'none';
	} else if (mutation.target.style.display === 'none') {
	  mainContainer.style.display = 'none';
	  loadingSpinner.style.display = 'inline-block';
	}
  });
});
loadingObserver.observe(sendButton, { attributes: true });
loadingObserver.observe(verifyButton, { attributes: true });

// Detect validation success, then automate continue button click with JS
const successText = document.getElementById('readOnlyEmail_success');
const continueButton = document.getElementById('continue');

const successObserver = new MutationObserver(function(e) {
  if (e[0].target.style.display !== 'none') {
	continueButton.click();
  }
});
successObserver.observe(successText, { attributes: true });