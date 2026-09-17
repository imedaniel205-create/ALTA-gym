const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

function getStatus(form) {
  return form.querySelector('.trial-form__status');
}

function setStatus(form, type, title, message) {
  const status = getStatus(form);
  if (!status) return;
  status.dataset.state = type;
  status.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
}

function markValidation(form) {
  let firstInvalid = null;
  form.querySelectorAll('input, select, textarea').forEach((field) => {
    if (!field.name) return;
    const invalid = !field.checkValidity();
    field.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    if (invalid && !firstInvalid) firstInvalid = field;
  });
  return firstInvalid;
}

function install(form) {
  if (form.dataset.web3formsReady === 'true') return;
  form.dataset.web3formsReady = 'true';

  form.addEventListener('input', (event) => {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
      if (field.checkValidity()) field.setAttribute('aria-invalid', 'false');
      if (getStatus(form)?.dataset.state === 'error') setStatus(form, 'default', '', '');
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const firstInvalid = markValidation(form);
    if (firstInvalid) {
      setStatus(form, 'error', 'PLEASE CHECK YOUR DETAILS.', 'Complete the required fields and enter a valid email address.');
      firstInvalid.focus();
      return;
    }

    if (!ACCESS_KEY) {
      setStatus(form, 'error', 'FORM NOT CONFIGURED.', 'The trial form needs its Web3Forms access key before requests can be sent.');
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const originalText = button?.textContent || 'Request a free trial';
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending request…';
    }
    setStatus(form, 'loading', 'SENDING REQUEST.', 'Please wait while your trial request is submitted.');

    const data = new FormData(form);
    const payload = {
      access_key: ACCESS_KEY,
      subject: 'ALTA FREE TRIAL REQUEST',
      from_name: 'ALTA Website',
      botcheck: '',
      'First Name': data.get('firstName') || '',
      'Last Name': data.get('lastName') || '',
      email: data.get('email') || '',
      'Phone Number': data.get('phone') || '',
      'Preferred Training Interest': data.get('interest') || '',
      'Preferred Visit Day': data.get('visitDay') || '',
      message: data.get('message') || '',
    };

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed');
      }

      form.reset();
      form.querySelectorAll('input, select, textarea').forEach((field) => field.setAttribute('aria-invalid', 'false'));
      setStatus(form, 'success', 'TRIAL REQUEST RECEIVED.', "Thank you. Your request has been received. We'll be in touch shortly.");
    } catch (error) {
      console.error('ALTA trial form submission failed:', error);
      setStatus(form, 'error', 'SOMETHING WENT WRONG.', 'Something went wrong while sending your request. Please try again or contact ALTA directly.');
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  }, true);
}

function findAndInstall() {
  document.querySelectorAll('.trial-form').forEach(install);
}

findAndInstall();

const observer = new MutationObserver(() => {
  findAndInstall();
});
observer.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
