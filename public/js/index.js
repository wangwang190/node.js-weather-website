
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const firstPara = document.querySelector("#firstPara");
const secondPara = document.querySelector("#secondPara");

weatherForm.addEventListener("submit", (form)=> {
    
    form.preventDefault();

    const location = search.value;

    firstPara.textContent = "Loading..."
    secondPara.textContent=""

    fetch("http://localhost:3000/weather?address=" + location).then((response)=> {

        response.json().then((data)=> {
            if (data.error) {
                firstPara.textContent = data.error
            } else {
                firstPara.textContent = data.location
                secondPara.textContent = data.temperature

                
            }

        })

    })

})



