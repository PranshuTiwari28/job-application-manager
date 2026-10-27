const nameRegex = /^[A-Za-z ]{3,40}$/;
const phoneRegex = /^[6-9]\d{9}$/;
const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

const form =
    document.querySelector("#applicationForm");

const nameInput =
    document.querySelector("#name");

const emailInput =
    document.querySelector("#email");

const phoneInput =
    document.querySelector("#phone");

const passwordInput =
    document.querySelector("#password");

const dobInput =
    document.querySelector("#dob");

const timeInput =
    document.querySelector("#interviewTime");

const roleInput =
    document.querySelector("#role");

const experienceInput =
    document.querySelector("#experience");

const coverLetterInput =
    document.querySelector("#coverLetter");

const photoInput =
    document.querySelector("#profilePhoto");

const photoButton =
    document.querySelector("#photoButton");

const photoName =
    document.querySelector("#photoName");

const resumeInput =
    document.querySelector("#resume");

const resumeButton =
    document.querySelector("#resumeButton");

const resumeName =
    document.querySelector("#resumeName");

const termsInput =
    document.querySelector("#terms");

const applicationContainer =
    document.querySelector("#applicationContainer");

function setError(id, message) {
    document.querySelector(`#${id}`).textContent =
        message;
}

function setSuccess(input) {
    input.style.border =
        "2px solid green";
}

function clearErrors() {
    document.querySelectorAll("small").forEach(error => {
        error.textContent = "";
    });

    document
        .querySelectorAll(
            "input, textarea, select"
        )
        .forEach(el => {
            el.style.border = "";
        });
}

photoButton.addEventListener("click", () => {
    photoInput.click();
});

resumeButton.addEventListener("click", () => {
    resumeInput.click();
});

photoInput.addEventListener("change", () => {
    if (photoInput.files.length > 0) {
        photoName.textContent =
            photoInput.files[0].name;
    } else {
        photoName.textContent =
            "No photo selected";
    }
});

resumeInput.addEventListener("change", () => {
    if (resumeInput.files.length > 0) {
        resumeName.textContent =
            resumeInput.files[0].name;
    } else {
        resumeName.textContent =
            "No resume selected";
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearErrors();

    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const phone =
        phoneInput.value.trim();

    const password =
        passwordInput.value.trim();

    const dob =
        dobInput.value;

    const time =
        timeInput.value;

    const role =
        roleInput.value;

    const experience =
        experienceInput.value;

    const coverLetter =
        coverLetterInput.value.trim();

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    const skills =
        document.querySelectorAll(
            'input[name="skills"]:checked'
        );

    const skillArray = [];

    skills.forEach(skill => {
        skillArray.push(skill.value);
    });

    let isValid = true;

    if (!nameRegex.test(name)) {
        setError(
            "nameError",
            "Enter valid name"
        );
        isValid = false;
    } else {
        setSuccess(nameInput);
    }

    if (!emailRegex.test(email)) {
        setError(
            "emailError",
            "Enter valid email"
        );
        isValid = false;
    } else {
        setSuccess(emailInput);
    }

    if (!phoneRegex.test(phone)) {
        setError(
            "phoneError",
            "Enter valid phone number"
        );
        isValid = false;
    } else {
        setSuccess(phoneInput);
    }

    if (!passwordRegex.test(password)) {
        setError(
            "passwordError",
            "Password must contain uppercase, lowercase, digit and 8+ chars"
        );
        isValid = false;
    } else {
        setSuccess(passwordInput);
    }

    if (!dob) {
        setError(
            "dobError",
            "Select date of birth"
        );
        isValid = false;
    }

    if (!time) {
        setError(
            "timeError",
            "Select interview time"
        );
        isValid = false;
    }

    if (!gender) {
        setError(
            "genderError",
            "Select gender"
        );
        isValid = false;
    }

    if (!role) {
        setError(
            "roleError",
            "Select role"
        );
        isValid = false;
    }

    if (!experience) {
        setError(
            "experienceError",
            "Enter experience"
        );
        isValid = false;
    }

    if (skillArray.length === 0) {
        setError(
            "skillsError",
            "Select at least one skill"
        );
        isValid = false;
    }

    if (coverLetter.length < 20) {
        setError(
            "coverLetterError",
            "Cover letter must contain at least 20 characters"
        );
        isValid = false;
    }

    if (photoInput.files.length === 0) {
        setError(
            "photoError",
            "Upload profile photo"
        );
        isValid = false;
    }

    if (resumeInput.files.length === 0) {
        setError(
            "resumeError",
            "Upload resume"
        );
        isValid = false;
    }

    if (!termsInput.checked) {
        setError(
            "termsError",
            "Accept terms and conditions"
        );
        isValid = false;
    }

    if (!isValid) return;

    let photoUrl = "";
    if (photoInput.files.length > 0) {
        photoUrl =
            URL.createObjectURL(
                photoInput.files[0]
            );
    }

    let resumeUrl = "";
    if (resumeInput.files.length > 0) {
        resumeUrl =
            URL.createObjectURL(
                resumeInput.files[0]
            );
    }

    const card =
        document.createElement("div");

    card.classList.add(
        "application-card"
    );

    if (photoUrl !== "") {
        const img =
            document.createElement("img");

        img.src = photoUrl;

        img.classList.add(
            "profile-photo"
        );

        card.appendChild(img);
    }

    card.innerHTML += `
        <h3>${name}</h3>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Gender:</strong> ${gender.value}</p>

        <p><strong>Role:</strong> ${role}</p>

        <p><strong>Experience:</strong> ${experience} Years</p>

        <p><strong>DOB:</strong> ${dob}</p>

        <p><strong>Interview Time:</strong> ${time}</p>

        <p><strong>Cover Letter:</strong> ${coverLetter}</p>
    `;

    const skillsDiv =
        document.createElement("div");

    skillsDiv.classList.add("skills");

    skillArray.forEach(skill => {
        const span =
            document.createElement("span");

        span.classList.add("skill");

        span.textContent = skill;

        skillsDiv.appendChild(span);
    });

    card.appendChild(skillsDiv);

    if (resumeUrl !== "") {
        const resumeP =
            document.createElement("p");

        const strong =
            document.createElement("strong");

        strong.textContent =
            "Resume: ";

        const link =
            document.createElement("a");

        link.href = resumeUrl;
        link.target = "_blank";
        link.textContent =
            "View Resume";

        resumeP.appendChild(strong);
        resumeP.appendChild(link);

        card.appendChild(resumeP);
    }

    const deleteBtn =
        document.createElement("button");

    deleteBtn.classList.add(
        "delete-button"
    );

    deleteBtn.textContent =
        "Delete";

    deleteBtn.addEventListener("click", () => {
        card.remove();
    });

    card.appendChild(deleteBtn);

    applicationContainer.appendChild(card);

    form.reset();

    clearErrors();

    photoName.textContent =
        "No photo selected";

    resumeName.textContent =
        "No resume selected";
});