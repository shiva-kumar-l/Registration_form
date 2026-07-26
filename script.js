const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const tableBody = document.querySelector("#userTable tbody");


//Create Error Using prepend

function showError(input, message){
    removeError(input);
    const error = document.createElement("small");
    error.className = "error";
    error.textContent = message;
    input.parentElement.prepend(error);

}

function removeError(input){
    const error = input.parentElement.querySelector(".error");
    if(error){
        error.remove();
    }
}


//Validation
function validateName(){
    if(nameInput.value.trim()===""){
        showError(nameInput,"Name is required");
        return false;
    }
    removeError(nameInput);
    return true;

}


function validateEmail(){
    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(emailInput.value.trim())){
        showError(emailInput,"Enter a valid email");
        return false;
    }
    removeError(emailInput);
    return true;

}


function validatePassword(){

    if(passwordInput.value.length<6){
        showError(passwordInput,"Minimum 6 characters");
        return false;
    }

    removeError(passwordInput);
    return true;

}


//Enable Submit

function checkForm(){
    const valid =
        validateName() &&
        validateEmail() &&
        validatePassword();
        submitBtn.disabled = !valid;

}


//Real Time Validation

nameInput.addEventListener("input",checkForm);
emailInput.addEventListener("input",checkForm);
passwordInput.addEventListener("input",checkForm);


//Submit

form.addEventListener("submit",function(e){
    e.preventDefault();
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${nameInput.value}</td>
        <td>${emailInput.value}</td>
        <td>${passwordInput.value}</td>
        <td>
            <button class="remove-btn">
                Remove
            </button>
        </td>
    `;

    tableBody.appendChild(row);
    form.reset();
    submitBtn.disabled = true;

});


//Remove Row

tableBody.addEventListener("click",function(e){
    if(e.target.classList.contains("remove-btn")){
        e.target.closest("tr").remove();
    }

});