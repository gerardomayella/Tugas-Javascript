//bagian fungsi event
function loginSection(event) {
  // fungsi logika form awal
  event.preventDefault();
  const username = document.getElementById("username").value;
  const choices = parseInt(document.getElementById("choices").value);

  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  for (let i = 0; i < choices; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.name = `choice${i}`;
    input.placeholder = `Pilihan ${i + 1}`;
    input.required = true;
    choicesContainer.appendChild(input);
  }

  document.getElementById("choices-section").style.display = "block";
  // untuk membuat transisinya kelihatan dan tidak langsung muncul karena perubahan tampilan terlalu cepat
  // perlu di delay selama 10ms atau tergantung kebutuhan
  setTimeout(() => {
    document.getElementById("choices-section").classList.add("show");
  }, 10);
}

function choicesSection(event) {
  event.preventDefault();
  const choices = document.querySelectorAll("#choices-container input"); //mengambil semua inputan yang ada di dalam choices-container
  const selectionContainer = document.getElementById("selection-container");
  selectionContainer.innerHTML = "";
  choices.forEach((choice, index) => {
    //fungsi untuk membuat radio button dan dropdown
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "selection";
    radio.value = choice.value;
    radio.id = `radio${index}`;
    radio.required = true;

    const label = document.createElement("label");
    label.htmlFor = `radio${index}`;
    label.textContent = choice.value;

    selectionContainer.appendChild(radio);
    selectionContainer.appendChild(label);
    selectionContainer.appendChild(document.createElement("br"));
  });

  const select = document.createElement("select");
  select.name = "dropdown";
  select.required = true;

  choices.forEach((choice) => {
    const option = document.createElement("option");
    option.value = choice.value;
    option.textContent = choice.value;
    select.appendChild(option);
  });

  selectionContainer.appendChild(select);

  document.getElementById("selection-section").style.display = "block";
  setTimeout(() => {
    document.getElementById("selection-section").classList.add("show");
  }, 10);

  // Default to showing radio buttons
  toggleSelection();
}

function selectionSection(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const choices = document.querySelectorAll("#choices-container input");
  const selectedRadio = document.querySelector(
    'input[name="selection"]:checked'
  );
  const selectedDropdown = document.querySelector('select[name="dropdown"]');

  const selectedValue = selectedRadio
    ? selectedRadio.value
    : selectedDropdown.value;

  const choicesText = Array.from(choices)
    .map((choice) => choice.value)
    .join(", ");

  const resultText = `Hallo, nama saya ${username}, saya mempunyai sejumlah ${choices.length} pilihan yaitu ${choicesText}, dan saya memilih ${selectedValue}.`;

  document.getElementById("result-text").textContent = resultText;

  document.getElementById("result-section").style.display = "block";
  setTimeout(() => {
    document.getElementById("result-section").classList.add("show");
  }, 10);
}

// fungsi toggle Button
function toggleSelection() {
  const selectionContainer = document.getElementById("selection-container");
  const radios = selectionContainer.querySelectorAll('input[type="radio"]');
  const dropdown = selectionContainer.querySelector("select");

  if (radios[0].style.display === "none") {
    radios.forEach((radio) => (radio.style.display = "inline-block"));
    dropdown.style.display = "none";
    document.getElementById("toggle-selection").textContent =
      "Switch to Dropdown";
  } else {
    radios.forEach((radio) => (radio.style.display = "none"));
    dropdown.style.display = "inline-block";
    document.getElementById("toggle-selection").textContent =
      "Switch to Radio Buttons";
  }
}

// Event listener toggle button
document
  .getElementById("toggle-selection")
  .addEventListener("click", toggleSelection);

//bagian event listener
document.getElementById("user-form").addEventListener("submit", loginSection);

document
  .getElementById("choices-form")
  .addEventListener("submit", choicesSection);

document
  .getElementById("selection-form")
  .addEventListener("submit", selectionSection);

// pertama kali dijalankan
document.getElementById("user-input-section").style.display = "block";
setTimeout(() => {
  document.getElementById("user-input-section").classList.add("show");
}, 10);
