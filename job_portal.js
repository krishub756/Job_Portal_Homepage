let jobs = [
  { title: "Software Engineer", company: "ABC Technologies", location: "Bangalore", exp: "0-2 Years" },
  { title: "Data Analyst", company: "DataCorp", location: "Hyderabad", exp: "1-3 Years" },
  { title: "Web Developer", company: "WebWorks", location: "Remote", exp: "Fresher" }
];

const jobList = document.getElementById("jobList");
const jobCount = document.getElementById("jobCount");

function renderJobs() {
  jobList.innerHTML = "";
  jobCount.textContent = `Total Jobs Available: ${jobs.length}`;

  jobs.forEach((job, index) => {
    const article = document.createElement("article");

    article.innerHTML = `
      <h3>${job.title}</h3>
      <p>Company: ${job.company}</p>
      <p>Location: ${job.location}</p>
      <p>Experience: ${job.exp}</p>
      <button class="apply-btn">Apply</button>
      <button class="delete-btn">Delete</button>
    `;

    article.querySelector(".apply-btn").onclick = function () {
        alert("Applied successfully ✅");
      this.textContent = "Applied";
      this.disabled = true;
    };

    article.querySelector(".delete-btn").onclick = function () {
      jobs.splice(index, 1);
      renderJobs();
    };

    jobList.appendChild(article);
  });
}

document.getElementById("addJobForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const company = document.getElementById("company").value.trim();
  const location = document.getElementById("location").value.trim();
  const exp = document.getElementById("exp").value.trim();

  if (!title || !company || !location || !exp) {
    alert("Fill all fields. This isn’t optional.");
    return;
  }

  jobs.push({ title, company, location, exp });
  this.reset();
  renderJobs();
});

renderJobs();
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ email, password }));
  alert("Registered successfully ✅");
  this.reset();
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found. Please register first.");
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    alert("Login successful 🎉");
  } else {
    alert("Invalid email or password ❌");
  }
});
