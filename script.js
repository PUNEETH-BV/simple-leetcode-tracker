function updatestats() {
    let easy = 0;
    let medium = 0;
    let hard = 0;

    problems.forEach(function(problem) {
        if (problem.difficulty === "easy") {
            easy++;
        } else if (problem.difficulty === "medium") {
            medium++;
        } else if (problem.difficulty === "hard") {
            hard++;
        }
    
    });
    document.getElementById("totalSolved").textContent = problems.length;
    document.getElementById("easyCount").textContent = easy;
    document.getElementById("mediumCount").textContent = medium;
    document.getElementById("hardCount").textContent = hard;
}
let saved = localStorage.getItem("problems");
let problems = saved ? JSON.parse(saved) : [];

function renderProblems() {
    const ul = document.getElementById("problemList");
    ul.innerHTML = "";
    problems.forEach(function(problem, index) {
        const li = document.createElement("li");
        const text = document.createElement("span");
        text.textContent = problem.name + " - " + problem.difficulty;
        li.appendChild(text);

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.style.marginLeft = "8px";
        del.addEventListener("click", function() {
            problems.splice(index, 1);
            localStorage.setItem("problems", JSON.stringify(problems));
            renderProblems();
            updatestats();
        });

        li.appendChild(del);
        ul.appendChild(li);
    });
}

document.getElementById("addProblem").addEventListener("click", function() {
    let problem_name = document.getElementById("problemName").value;
    let difficulty = document.getElementById("difficulty").value;

    if (problem_name.trim() === "") {
        alert("Please enter a problem name.");
        return;
    }
    problems.push({ name: problem_name, difficulty: difficulty });
    localStorage.setItem("problems", JSON.stringify(problems));
    document.getElementById("problemName").value = "";
    renderProblems();
    updatestats();
});

// initial render
renderProblems();
updatestats();