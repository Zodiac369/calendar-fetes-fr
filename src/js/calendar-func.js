import { getMonthList } from "./months-func.js";

function manageCalendar()
{
    const calendrier = createCalendar();
    console.log(calendrier);
    document.querySelector('#section-calendrier').innerHTML = calendrier.innerHTML;
    fetchHolidays();
}

function generateMonth(month) {
    let monthHTML = document.createElement("section");
    let header = document.createElement("h2");
    header.textContent = month.name;
    monthHTML.appendChild(header);
    let i = 0;
    while (i < month.numberOfDays) {
        let day = document.createElement("article");
        day.textContent = i + 1;
        monthHTML.appendChild(day);
        i++;
    }
    return monthHTML;
}

function createCalendar() {
    let calendar = document.createElement("main");
    const months = getMonthList();

    let i = 0;
    while (i < months.length) {
        const month = generateMonth(months[i]);
        calendar.appendChild(month);
        i++;
    }

    return calendar;
}

function fetchHolidays() {
    let url = 'https://date.nager.at/api/v3/PublicHolidays/2023/fr';
    fetch(url)
        .then((response) => { // Code appelé quand le navigateur reçoit la réponse
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then((dates) => {
            let i = 0;
            while (i < dates.length) {
                const holiday = dates[i];
                console.log(`${holiday.date} : ${holiday.localName}`);
                const dateElements = holiday.date.split('-');
                const monthNum = dateElements[1];
                const dayNum = dateElements[2];
                let selector = '#section-calendrier > section:nth-child(' + monthNum + ') > article:nth-child(' + (dayNum * 1 + 1) + ')';
                console.log(selector);
                let article = document.querySelector(selector);
                article.textContent = article.textContent + " " + holiday.localName;
                article.classList.add('holiday');
                //document.querySelector('#calendar > section:nth-child(4) > article:nth-child(10)')
                i++;
            }

            // console.table(dates)
        }) // Code appelé si la réponse est OK
        .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

export { manageCalendar };