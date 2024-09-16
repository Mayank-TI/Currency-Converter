let base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue == "" || amountValue < 1){
        amountValue = "1";
        amount.value = "1";
    }

    const url = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate_array = data[fromCurr.value.toLowerCase()];
    let rate = rate_array[toCurr.value.toLowerCase()];
    let finalAmount = amountValue * rate;

    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

for(let select of dropdown){
    for(let currCodes in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCodes;
        newOption.value = currCodes;
        if(select.name == "from" && currCodes == "USD"){
            newOption.selected = "selected";
        }
        else if(select.name == "to" && currCodes == "INR"){
                newOption.selected = "selected";
            }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCodes = element.value;
    let countryCode = countryList[currCodes];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})