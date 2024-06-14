const programtTypeSelecor = document.getElementById('program-category');
const wavierSelecor = document.getElementById('waiver-category');
const courseSelecor = document.getElementById('course-category');
const boardSelecor = document.getElementById('board-category');

// modal dom
var modal = document.getElementById("myModal");
var modalContent = document.getElementById("modalData");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// store student waiver, when student waiver data comes from server or database
let studentWaivers = [];
let anotherWaiver = [];
let courses = [];
let myCourseInfo = {
    credit: 0,
    name: '',
    waiverType: '',
    tutionFee: 0,
    type: '',
    discount: 0,
    discountRate: 0
}

// set program type options
const programTypeList = [
    {
        name: 'Undergraduate',
        value: 'Undergraduate'
    },
    {
        name: 'Postgraduate',
        value: 'Postgraduate'
    },
]

for (let i = 0; i < programTypeList.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = programTypeList[i].name;
    option.setAttribute('value', programTypeList[i].value)
    programtTypeSelecor.appendChild(option);
}

const insertCourseListInHtml = (courseList) => {
    courseSelecor.innerHTML = '';
    for (let i = 0; i < courseList.length; i++) {
        const option = document.createElement('option');
        option.innerText = courseList[i].name;
        option.setAttribute('value', courseList[i].name)
        courseSelecor.appendChild(option);
    }
}

const insertWaiverTypesInHtml = (waiverList) => {
    wavierSelecor.innerHTML = '';
    for (let i = 0; i < waiverList.length; i++) {
        const option = document.createElement('option');
        option.innerText = waiverList[i].name;
        option.setAttribute('value', waiverList[i].name)
        wavierSelecor.appendChild(option);
    }
}

const insertEducationBoardInHtml = (boardList) => {
    boardSelecor.innerHTML = '';
    for (let i = 0; i < boardList.length; i++) {
        const option = document.createElement('option');
        option.innerText = boardList[i].boardName;
        option.setAttribute('value', boardList[i].boardName)
        boardSelecor.appendChild(option);
    }
}

fetch('http://calculator.britannia.edu.bd/api/getinfo')
    .then((res) => res.json())
    .then((result) => {
        const { boardList, courseList, waiverList, studentWaiverList } = result;
        studentWaivers = studentWaiverList;
        anotherWaiver = waiverList;
        courses = courseList;
        insertCourseListInHtml(courseList);
        insertWaiverTypesInHtml(waiverList);
        insertEducationBoardInHtml(boardList);
    })
    .catch((err) => {
        console.log(err);
    })


programtTypeSelecor.addEventListener('change', (e) => {
    //console.log(e.target.value);
    const type = e.target.value;
    fetch(`http://calculator.britannia.edu.bd/api/course/${type}`)
        .then((res) => res.json())
        .then((courseList) => {
            courses = courseList;
            insertCourseListInHtml(courseList)
        })
        .catch((err) => {
            console.log(err);
        })
})

//display modal, while all calculation is complete
const displayModal = (isError, data) => {
    if (!isError && data.discount) {
        const { credit, waiverType, tutionFee, discount, discountRate } = data;
        const successContent = `<div class="modalInfo">
        <img src="https://res.cloudinary.com/devlj6p7h/image/upload/v1717002823/samples/dhuaaktcytcr5tyagosz.png" alt="congress-image" />
        <h1 class="heading">Congratulations! You are eligible for <span>${discountRate} %</span> tuition fee waiver under ${waiverType} quota</h1>
        <ul class="modalListParent">
            <li class="modalListChild">
                <p class="">Total Credits</p>
                <p>${credit}</p>
            </li>
            <li class="modalListChild">
                <p class="">Total Tution fee</p>
                <p>${tutionFee} BDT</p>
            </li>
            <li class="modalListChild">
                <p class="">Discount</p>
                <p>${discount} BDT</p>
            </li>
            <li class="modalListChild">
                <p class="">Total Payable fee</p>
                <p>${Math.round(tutionFee - discount)} BDT</p>
            </li>
        </ul>
    </div>`

        modalContent.innerHTML = '';
        modalContent.innerHTML = successContent;
        modal.style.display = "block";

    }
    else {
        const errorMessage = `<div class="modalInfo">
        <img src="https://res.cloudinary.com/devlj6p7h/image/upload/v1717004681/test/smqo1jlz1vmjio4ggq9x.png" alt="sad-image" />
            <div class="modalError">
                <h3>Sorry!! There is no waiver scheme available for this result.</h3>
            </div>
        <div class="modalError">`;
        
        modalContent.innerHTML = '';
        modalContent.innerHTML = errorMessage;
        modal.style.display = "block";
    }
}

// submit form
const form = document.getElementsByTagName('form');
form[0].addEventListener("submit", (e) => {
    try {
        e.preventDefault();
        const event = e.target;
        const courseName = event?.courseCategory.value;
        const waiverType = event?.waiverCategory.value;

        // find my course info. like tutionFee, credit, name etc
        const courseinfo = courses.find((course) => {
            return course.name == courseName;
        });

        // ---------- get discount with result based ---------
        if (waiverType === 'Result Based Waiver(SSC & HSC)') {
            const sscPoint = parseInt(event.sscResult.value);
            const hscPoint = parseInt(event.hscResult.value);
            const totalPoint = sscPoint + hscPoint;
            let matchedResult = {};

            // find my available discount collection with result based
            for (let i = 0; i < studentWaivers.length; i++) {
                if (studentWaivers[i].mark_range_up_to <= totalPoint) {
                    matchedResult = studentWaivers[i];
                } else break;
            };

            // check if I got an available discount
            if (Object.keys(matchedResult).length !== 0) {
                // got discount
                const discount = courseinfo.tutionFee * (matchedResult?.discount / 100) || 0;

                // update my course info with discount.
                myCourseInfo = {
                    credit: courseinfo?.credit,
                    name: courseinfo?.name,
                    tutionFee: courseinfo?.tutionFee,
                    type: courseinfo?.type,
                    discountRate: matchedResult?.discount || 0,
                    discount,
                    waiverType
                }
            } else {
                myCourseInfo = {
                    credit: courseinfo?.credit,
                    name: courseinfo?.name,
                    tutionFee: courseinfo?.tutionFee,
                    type: courseinfo?.type,
                    discount: 0,
                    discountRate: 0,
                    waiverType
                }
            }
        }

        // ---------- get discount with another waiver ---------
        else {
            // find my available discount collection with result based
            const matchedResult = anotherWaiver.find((waiver) => {
                return waiver.name == waiverType;
            })

            // check if I got an available discount
            if (Object.keys(matchedResult).length !== 0) {
                // get discount
                const discount = courseinfo.tutionFee * (matchedResult?.discount / 100) || 0;

                // update my course info with discount.
                myCourseInfo = {
                    credit: courseinfo?.credit,
                    name: courseinfo?.name,
                    tutionFee: courseinfo?.tutionFee,
                    type: courseinfo?.type,
                    discountRate: matchedResult?.discount || 0,
                    discount,
                    waiverType
                }
            } else {
                myCourseInfo = {
                    credit: courseinfo?.credit,
                    name: courseinfo?.name,
                    tutionFee: courseinfo?.tutionFee,
                    type: courseinfo?.type,
                    discountRate: 0,
                    discount: 0,
                    waiverType
                }
            }
        }
        console.log(myCourseInfo);
        displayModal(false, myCourseInfo)
    }
    catch (err) {
        displayModal(true, {})
        console.log(err.message);
    }
})



// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



