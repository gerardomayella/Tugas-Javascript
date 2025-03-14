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
  setTimeout(() => {
    document.getElementById("choices-section").classList.add("show");
  }, 10);
  updateProgressBar(33);
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
  updateProgressBar(66);
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

  let selectedValue;
  if (selectedRadio) {
    selectedValue = selectedRadio.value;
  } else if (selectedDropdown) {
    selectedValue = selectedDropdown.value;
  }

  const choicesText = Array.from(choices)
    .map((choice) => choice.value)
    .join(", ");

  const resultText = `Hallo, nama saya ${username}, saya mempunyai sejumlah ${choices.length} pilihan yaitu ${choicesText}, dan saya memilih ${selectedValue}.`;

  document.getElementById("result-text").textContent = resultText;

  document.getElementById("result-section").style.display = "block";
  setTimeout(() => {
    document.getElementById("result-section").classList.add("show");
  }, 10);
  updateProgressBar(100);
}

// Toggle untuk mengubah radio button menjadi dropdown dan sebaliknya
function toggleSelection() {
  const selectionContainer = document.getElementById("selection-container");
  const radios = selectionContainer.querySelectorAll('input[type="radio"]');
  const dropdown = selectionContainer.querySelector("select");

  if (radios[0].style.display === "none") {
    // Tampilkan radio, sembunyikan dropdown
    radios.forEach((radio) => {
      radio.style.display = "inline-block";
      radio.disabled = false; // Aktifkan radio
    });
    dropdown.style.display = "none";
    dropdown.disabled = true; // Nonaktifkan dropdown
    document.getElementById("toggle-selection").textContent =
      "Ganti ke Dropdown";
  } else {
    // Sembunyikan radio, tampilkan dropdown
    radios.forEach((radio) => {
      radio.style.display = "none";
      radio.disabled = true; // Nonaktifkan radio
      radio.checked = false; // Reset pilihan radio
    });
    dropdown.style.display = "inline-block";
    dropdown.disabled = false; // Aktifkan dropdown
    document.getElementById("toggle-selection").textContent =
      "Ganti ke Radio Button";

    if (dropdown.options.length > 0) {
      dropdown.value = dropdown.options[0].value; // Pilih opsi pertama di dropdown
    } else {
      dropdown.value = ""; // Kosongkan dropdown jika tidak ada opsi
    }
  }
}
function disableSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.add("disabled");
    section
      .querySelectorAll("input, button, select, textarea")
      .forEach((el) => {
        el.disabled = true;
      });
  }
}
function updateProgressBar(percentage) {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = percentage + "%";
}
// Event listener for the toggle button
document
  .getElementById("toggle-selection")
  .addEventListener("click", toggleSelection);

//bagian event listener
document.getElementById("user-form").addEventListener("submit", loginSection);
document
  .getElementById("user-input-section")
  .addEventListener("submit", function () {
    disableSection("user-input-section");
    //document.getElementById("user-input-section").style.display = "none";
  });

document
  .getElementById("choices-form")
  .addEventListener("submit", choicesSection);
document
  .getElementById("choices-section")
  .addEventListener("submit", function () {
    disableSection("choices-section");
    //document.getElementById("choices-section").style.display = "none";
  });

document
  .getElementById("selection-form")
  .addEventListener("submit", selectionSection);
document
  .getElementById("selection-section")
  .addEventListener("submit", function () {
    disableSection("selection-section");
    //document.getElementById("selection-section").style.display = "none";
  });

// pertama kali dijalankan
document.getElementById("user-input-section").style.display = "block";
setTimeout(() => {
  document.getElementById("user-input-section").classList.add("show");
  updateProgressBar(0);
}, 10);
