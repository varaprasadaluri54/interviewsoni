// Quesiton
// Level ->> Medium
// Asked in Coursera, Uber

// // How can you implement a progress bar system that supports multiple 
// // concurrent progress animations
// // with a limit on active animations at a time?


const progressBarEle = document.getElementById('progress-bar');
const btn = document.getElementById('btn');
const resetBtnbtn = document.getElementById("reset-btn");

function createProgressBarElement() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, {
        height: "20px",
        width: "300px",
        border: "2px solid black",
        marginBottom: "5px",
    });

    const progress = document.createElement("div");
    Object.assign(progress.style, {
        width: "0%",
        height: "20px",
        background: "pink",
    });

    wrapper.appendChild(progress);
    progressBarEle.appendChild(wrapper);

    return progress;
}

function ProgressBarManager(maxConcurrent) {
    let activeCount = 0;
    const queue = [];
    let currentIndex = 0;

    function animateProgressBar(element) {
        activeCount++;
        let progress = 0;

        const intervalId = setInterval(() => {
            progress++;
            element.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(intervalId);
                activeCount--;
                runNextProgressBar();
            }
        }, 10);
    }

    function runNextProgressBar() {
        if (currentIndex < queue.length && activeCount < maxConcurrent) {
            const element = queue[currentIndex++];
            animateProgressBar(element);
        }
    }

    function addProgressBar() {
        const progressBarElement = createProgressBarElement();
        queue.push(progressBarElement);
        runNextProgressBar();
    }

    function resetProgressBars() {
        queue.length = 0;
        currentIndex = 0;
        activeCount = 0;
        progressBarEle.innerHTML = ""; 
    }

    return { addProgressBar, resetProgressBars };
}

const progressBarManager = ProgressBarManager(3);

btn.addEventListener("click", () => {
    progressBarManager.addProgressBar();
});

resetBtnbtn.addEventListener("click", () => {
  progressBarManager.resetProgressBars();
});