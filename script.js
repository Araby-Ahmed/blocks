let container = document.querySelector(".memory-game-blocks");
let images = Array.from(container.children);
let changer = document.querySelectorAll("[data-friends]");
let orderRange = [...Array(images.length).keys()];
let randomOrder = Math.floor(Math.random() * images.length);
let randomArray = [];
let duration = 1000;
let win = 0;

//! start game
let startPage = document.querySelector(".control-buttons");
document.querySelector(".control-buttons span").onclick = function () {
  let name = prompt("Whats your name?");

  if (name == "samasemu" || name == "araby") {
    document.querySelector(".name span").textContent = name;
    document.querySelector(".win span span").textContent = name;
    document.querySelector("#all").volume = 0.2;

    document.querySelector("#all").play();
    startPage.style.display = "none";
    images.forEach((img) => img.classList.add("is-flipped"));
    setTimeout(() => {
      images.forEach((img) => img.classList.remove("is-flipped"));
    }, 1500);
  }
};

images.forEach((image, index) => {
  randomOrder = Math.floor(Math.random() * images.length);
  randomArray.push(randomOrder);
  image.style.order = randomArray[index];

  // flip
  image.onclick = function () {
    flip(image);
  };
});

//! start random from array of links
let randomLink = [
  "https://i.ibb.co/2PT2NGD/7oda-1.jpg",
  "https://i.ibb.co/LtmHG9P/7oda-2.jpg",
  "https://i.ibb.co/ysWw8kW/7oda-3.jpg",
  "https://i.ibb.co/VwkHDBx/7oda-4.jpg",
  "https://i.ibb.co/mB5xNd9/7oda-5.jpg",
  "https://i.ibb.co/0nG8pLh/7oda-6.jpg",
  "https://i.ibb.co/D1JcLfr/all-1.jpg",
  "https://i.ibb.co/4Vh994Y/amr-1.jpg",
  "https://i.ibb.co/dgCWxn6/amr-2.jpg",
  "https://i.ibb.co/0yQTjtL/amr-3.jpg",
  "https://i.ibb.co/7WPwK3n/amr-4.jpg",
  "https://i.ibb.co/w6yWbMC/amr-5.jpg",
  "https://i.ibb.co/ZVJ5hbv/araby-1.jpg",
  "https://i.ibb.co/M6FJScr/araby-2.jpg",
  "https://i.ibb.co/0q8HD26/araby-3.jpg",
  "https://i.ibb.co/d5M2LsX/araby-4.jpg",
  "https://i.ibb.co/KDcNqty/araby-5.jpg",
  "https://i.ibb.co/bN0sDnB/araby-6.jpg",
  "https://i.ibb.co/5FQmLqW/break-1.jpg",
  "https://i.ibb.co/gw3bLxD/break-2.jpg",
  "https://i.ibb.co/b3dQcH7/break-3.jpg",
  "https://i.ibb.co/sPQhWLM/fayad-1.jpg",
  "https://i.ibb.co/T2dPd4X/fayad-2.jpg",
  "https://i.ibb.co/XDJWH3g/fayad-3.jpg",
  "https://i.ibb.co/c3B6YQx/fayad-4.jpg",
  "https://i.ibb.co/sm2mDM5/mazin-1.jpg",
  "https://i.ibb.co/09v8z9k/rezk-1.jpg",
  "https://i.ibb.co/pJM8VDG/zoz-1.jpg",
  "https://i.ibb.co/7JsjQwk/zoz-2.jpg",
  "https://i.ibb.co/rmr4nm5/zoz-3.jpg",
  "https://i.ibb.co/99pBrSt/zoz-4.jpg",
  "https://i.ibb.co/fvhzsWC/zoz-5.jpg",
  "https://i.ibb.co/jMRzrs5/zoz-6.jpg",
];
function Randomize() {
  // get from link array
  function getFromlinks() {
    let random = randomLink[Math.floor(Math.random() * randomLink.length)];
    let index = randomLink.indexOf(random);
    randomLink.splice(index, 1);
    return random;
  }
  // put image 10 times
  let imageTaken = {}; // object form mapping
  for (let i = 1; i <= images.length / 2; i++) {
    imageTaken[i] = getFromlinks(); // i here is property key
  }
  // put depend on dataset
  changer.forEach((e) => {
    let value = e.dataset.friends;
    if (imageTaken[value]) {
      //? check if there is image
      let taken = imageTaken[value];
      let image = e.children[1].children;
      let convert = image.item(0); // two images with same dataset
      convert.src = taken;
    }
  });
}
Randomize();
//! end

function flip(image) {
  image.classList.add("is-flipped");
  //  check images which have flip class
  let allFlips = images.filter((e) => e.classList.contains("is-flipped"));
  // check if 2
  if (allFlips.length == 2) {
    // no click until check
    noclicking();
    // check if match
    check(allFlips);
  }
}

function noclicking() {
  container.classList.add("no-clicking");
  setTimeout(() => {
    container.classList.remove("no-clicking");
  }, duration);
}

function check(allFlips) {
  if (allFlips[0].dataset.friends == allFlips[1].dataset.friends) {
    // if match
    setTimeout(() => {
      // remove flip
      document.querySelector("#success").play();
      allFlips[0].classList.remove("is-flipped");
      allFlips[1].classList.remove("is-flipped");
      // static photos with has-match
      allFlips[0].classList.add("has-match");
      allFlips[1].classList.add("has-match");
      win++;
      // win
      if (win == 10) {
        document.querySelector("#all").pause();
        document.querySelector(".win").style.display = "flex";
        document.querySelector("#done").play();
      }
    }, duration);
  } else {
    // if don't
    setTimeout(() => {
      document.querySelector("#fail").play();
      allFlips[0].classList.remove("is-flipped");
      allFlips[1].classList.remove("is-flipped");
      document.querySelector(".tries span").textContent++;
      if (
        document.querySelector(".tries span").textContent ==
        images.length / 2 + 1
      ) {
        document.querySelector("#all").pause();
        document.querySelector(".kulo").style.display = "none";
        document.querySelector(".lose").style.display = "flex";
        document.querySelector("#tramb").play();
      }
    }, duration);
  }
}
document.querySelector("p").onclick = function () {
  window.location.reload();
};
//   document.querySelector("#all").pause();
