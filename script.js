// The Make.com webhook URL — replace this with your actual URL later
const WEBHOOK_URL = "https://hook.us2.make.com/6hkiomh30wlpdj5r0e2yutmh9ho6v1ma";

// Grab the form and button
const form = document.getElementById("scheduleForm");
const submitBtn = document.getElementById("submitBtn");

// Grab the feedback message boxes
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");
const errorDetail = document.getElementById("errorDetail");

// Puts the button into a loading state (shows spinner, disables it)
function setLoading(isLoading) {
    submitBtn.disabled = isLoading;

    if (isLoading) {
        submitBtn.classList.add("loading");
    } else {
        submitBtn.classList.remove("loading");
    }
}

// Checks all fields. Writes error messages into the span elements.
// Returns true if everything is valid, false if anything fails.
function validateForm() {
    let isValid = true;

    // Helper inside validation — finds the error span and sets its text
    function setError(id, message) {
        document.getElementById(id).textContent = message;
    }

    // Clear all previous errors first
    setError("captionError", "");
    setError("platformError", "");
    setError("scheduledAtError", "");
    setError("nameError", "");
    setError("emailError", "");

    // Check: caption not empty
    if (!form.caption.value.trim()) {
        setError("captionError", "Post caption cannot be empty.");
        isValid = false;
    }

    // Check: platform selected
    if (!form.platform.value) {
        setError("platformError", "Please select a platform.");
        isValid = false;
    }

    // Check: date not empty AND must be in the future
    const scheduledAt = form.scheduledAt.value;
    if (!scheduledAt) {
        setError("scheduledAtError", "Please pick a date and time.");
        isValid = false;
    } else if (new Date(scheduledAt) <= new Date()) {
        setError("scheduledAtError", "Scheduled time must be in the future.");
        isValid = false;
    }

    // Check: name not empty
    if (!form.name.value.trim()) {
        setError("nameError", "Your name cannot be empty.");
        isValid = false;
    }

    // Check: valid email format using a regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.value.trim()) {
        setError("emailError", "Email cannot be empty.");
        isValid = false;
    } else if (!emailRegex.test(form.email.value.trim())) {
        setError("emailError", "Please enter a valid email address.");
        isValid = false;
    }

    return isValid;
}

// Listen for the form's submit event
form.addEventListener("submit", async function (e) {

  // Prevent the page from reloading (default form behavior)
  e.preventDefault();

  // Hide any previous feedback messages
  successMsg.hidden = true;
  errorMsg.hidden = true;

  // Run validation — stop here if anything fails
  if (!validateForm()) return;

  // Build the data object to send
  const payload = {
    caption:     form.caption.value.trim(),
    platform:    form.platform.value,
    scheduledAt: form.scheduledAt.value,
    name:        form.name.value.trim(),
    email:       form.email.value.trim()
  };

  // Start loading state
  setLoading(true);

  try {
    // Send the data as JSON to the webhook
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    // Success — show the success message and reset the form
    successMsg.hidden = false;
    form.reset();

  } catch (err) {
    // Something went wrong — show the error message
    errorDetail.textContent = err.message || "Please try again or check your connection.";
    errorMsg.hidden = false;

  } finally {
    // Always restore the button regardless of outcome
    setLoading(false);
  }

});