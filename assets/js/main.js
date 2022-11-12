// Data
let data = [];

// timper time
const hourEle = document.querySelector(".hour");
const minuteEle = document.querySelector(".minute");
const secsEle = document.querySelector(".secs");
const titleTaskEle = document.querySelector(".titleTask");

// console.log(hourEle,minuteEle,secsEle,titleTaskEle)

const render = (d) => {
  const div = document.createElement("div");
  div.setAttribute("class", "container__right__list-item");

  const i = document.createElement("i");
  i.setAttribute("class", "fa-regular fa-circle");

  const task = document.createElement("span");
  task.textContent = d.taskName;

  div.appendChild(i);
  div.appendChild(task);

  const bigDiv = document.querySelector(".container__right__List-items");

  bigDiv.appendChild(div);
};
const renderPage = () => {
  if (localStorage.getItem("data")) {
    data = JSON.parse(localStorage.getItem("data"));

    data.forEach((d) => {
      render(d);
    });
  }
};

renderPage();

// timer function
let hour = 0;
let minute = 0;
let secs = 0;

const decoandSetTime = (hour, minute, secs) => {
  if (hour < 10) {
    newHour = `0${hour}`;
  } else {
    newHour = hour;
  }

  if (minute < 10) {
    newMinute = `0${minute}`;
  } else {
    newMinute = minute;
  }

  if (secs < 10) {
    newSecs = `0${secs}`;
  } else {
    newSecs = secs;
  }

  hourEle.textContent = newHour;
  minuteEle.textContent = newMinute;
  secsEle.textContent = newSecs;
};

const timer = () => {
  if (secs <= 60 && secs > 0) {
    secs -= 1;
  } else {
    if (minute <= 60 && minute > 0) {
      minute -= 1;
      secs = 59;
    } else {
      if (hour <= 12 && hour > 0) {
        hour -= 1;
        minute = 59;
        secs = 59;
      }
    }
  }

  decoandSetTime(hour, minute, secs);
};

// timer button
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const cancelBtn = document.querySelector(".cancel");
const completeBtn = document.querySelector(".complete");

let clearTimer;

// console.log(startBtn, stopBtn, cancelBtn, completeBtn)

startBtn.addEventListener("click", () => {
  clearTimer = setInterval(timer, 1000);
});

stopBtn.addEventListener("click", () => {
  console.log("Stop Click");
  clearInterval(clearTimer);
});

// task
const sumitEle = document.querySelector(".submit");

sumitEle.addEventListener("click", (event) => {
  event.preventDefault();
  const task = document.querySelector(".task").value;
  const radioInput = document.querySelectorAll(".imt");

  console.log(radioInput);

  let importance = "";
  radioInput.forEach((element) => {
    if (element.checked) {
      importance = element.value;
    }
  });

  const hours = Number(document.querySelector("#hour").value);
  const minutes = Number(document.querySelector("#minute").value);
  const secs = Number(document.querySelector(".second").value);

  if (task && radioInput) {
    data.push({
      taskName: task,
      importance: importance,
      time: {
        hour: hours || 1,
        minute: minutes || 1,
        second: secs || 1,
      },
    });
  }

  render({ taskName: task });

  localStorage.setItem("data", JSON.stringify(data));
  //   location.reload();


  // task = "";
  // hour = "1";
  // minute = "1";
  // secs = "1";
  document.location.reload();
});


document.querySelectorAll(".container__right__list-item").forEach(item => {
  item.addEventListener("click", ()=> {
    const taskName1 = item.children[1].textContent;

    // console.log(taskName);
    const data1 = data.filter(obj => {
      return obj.taskName === taskName1;
      
    })

    hour = Number(data1[0].time.hour);
    minute = Number(data1[0].time.minute);
    secs = Number(data1[0].time.second);


    document.querySelector(".titleTask").textContent = data1[0].taskName;

    // console.log(data1)

    hourEle.textContent = hour;
    minuteEle.textContent = minute;
    secsEle.textContent = secs;

  })
})


document.querySelector(".cancel").addEventListener("click", ()=>{
  console.log("Cancel");

  const titleDelete = document.querySelector(".titleTask").textContent;

  const dataFilter = data.filter((value)=>{
    return value.taskName != titleDelete;
  })

  console.log(dataFilter)
  localStorage.removeItem("data");
  data = dataFilter;
  localStorage.setItem("data", JSON.stringify(data));

  document.location.reload();
  renderPage();

})


completeBtn.addEventListener("click", ()=>{
  console.log("Cancel");

  const titleDelete = document.querySelector(".titleTask").textContent;

  const dataFilter = data.filter((value)=>{
    return value.taskName != titleDelete;
  })

  console.log(dataFilter)
  localStorage.removeItem("data");
  data = dataFilter;
  localStorage.setItem("data", JSON.stringify(data));

  document.location.reload();
  renderPage();
})