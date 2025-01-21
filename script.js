// Handle number of applicants input and create necessary fields
document.getElementById("numApplications").addEventListener("input", function () {
    const numApplications = parseInt(document.getElementById("numApplications").value);
    const applicationsInputDiv = document.getElementById("applicationsInput");
    applicationsInputDiv.innerHTML = ''; // Clear previous inputs

    for (let i = 0; i < numApplications; i++) {
        const applicantDiv = document.createElement("div");
        applicantDiv.classList.add("applicant");

        // Applicant name input
        const nameInput = document.createElement("input");
        nameInput.placeholder = `Enter the name of applicant ${i + 1}`;
        nameInput.classList.add("applicant-name");

        // Skills input
        const skillsInput = document.createElement("input");
        skillsInput.placeholder = `Enter skills for applicant ${i + 1} (comma separated)`;
        skillsInput.classList.add("applicant-skills");

        // Experience input
        const experienceInput = document.createElement("input");
        experienceInput.placeholder = `Enter experience (in years) for applicant ${i + 1}`;
        experienceInput.classList.add("applicant-experience");

        applicantDiv.appendChild(nameInput);
        applicantDiv.appendChild(skillsInput);
        applicantDiv.appendChild(experienceInput);

        applicationsInputDiv.appendChild(applicantDiv);
    }
});

// Handle form submission to filter applicants
document.getElementById("applicationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const numApplications = parseInt(document.getElementById("numApplications").value);
    const requiredSkills = document.getElementById("requiredSkills").value.split(',').map(skill => skill.trim());
    const minimumExperience = parseInt(document.getElementById("minimumExperience").value);

    const applications = [];

    for (let i = 0; i < numApplications; i++) {
        const name = document.querySelectorAll(".applicant-name")[i].value;
        const skills = document.querySelectorAll(".applicant-skills")[i].value.split(',').map(skill => skill.trim());
        const experience = parseInt(document.querySelectorAll(".applicant-experience")[i].value);

        applications.push({ name, skills, experience });
    }

    const shortlistedCandidates = filterApplications(applications, requiredSkills, minimumExperience);

    displayShortlistedCandidates(shortlistedCandidates);
});

// Function to filter applications based on required skills and minimum experience
function filterApplications(applications, requiredSkills, minimumExperience) {
    return applications.filter(application => 
        requiredSkills.every(skill => application.skills.includes(skill)) && 
        application.experience >= minimumExperience
    );
}

// Function to display shortlisted candidates
function displayShortlistedCandidates(candidates) {
    const candidatesList = document.getElementById("shortlistedCandidates");
    candidatesList.innerHTML = ''; // Clear any previous results

    if (candidates.length === 0) {
        candidatesList.innerHTML = "<li>No candidates shortlisted based on the criteria.</li>";
    } else {
        candidates.forEach(candidate => {
            const li = document.createElement("li");
            li.textContent = `${candidate.name} - Experience: ${candidate.experience} years`;
            candidatesList.appendChild(li);
        });
    }
}
