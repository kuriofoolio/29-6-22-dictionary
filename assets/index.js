const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
let audio;

const data = (res, word) => {
  if (res.title) return `the definition of "${word}" can't be found`;
  wrapper.classList.add("active");

  let definitions = res[0]?.meanings[0]?.definitions[0];
  phonetics = `Commonly pronounced as: ${res[0]?.phonetics[0]?.text}`;

  console.log({ definitions, phonetics });

  document.querySelector(".word p").innerText = res[0]?.word;
  document.querySelector(".word span").innerText = phonetics;
  document.querySelector(".meaning span").innerText = definitions.definition;
  document.querySelector(".example span").innerText = definitions.example;
  document.querySelector().innerText = res[0]?.word;

  if (definitions.synonyms[0] === undefined) {
    synonyms.parentElement.style.display = "none";
  } else {
    synonyms.parentElement.style.display = "block";
    synonyms.innerHTML = "";
    for (let syn in synonyms) {
      let tag = `<span onclick="search('${definitions.synonyms[syn]}')">${definitions.synonyms[syn]}</span>`;

      synonyms.insertAdjacentHTML("beforeend", tag);
    }
  }
};

const search = (word) => {
  searchInput.value = word;
  queryAPI(word);
  wrapper.classList.remove("active");
};

const queryAPI = async (word) => {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `<span>Loading the meaning of "${word}"</span>`;
  await axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => data(res.data, word))
    .catch((err) => console.log(err));
};

searchInput.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  if (e.key === "enter" && e.target.value) {
    queryAPI(e.target.value);
  }
});

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.innerHTML =
    "Type any existing word and press enter to get meaning, example,synonyms, etc.";
});

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}
