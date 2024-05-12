document.getElementsByTagName('h1').innerHTML = 'The text in first paragraph'

const tutionCategorySelecor = document.getElementById('tution-category');
const programtTypeSelecor = document.getElementById('program-category');
const wavierSelecor = document.getElementById('waiver-category');
const courseSelecor = document.getElementById('course-category');
const boardSelecor = document.getElementById('board-category');

// set tution category options
const tutionCategoryList = [
    {
        name: 'Local Tution fee',
        value: 'local'
    },
    {
        name: 'International Tution fee',
        value: 'international'
    },
]

for(let i=0; i<tutionCategoryList.length; i++){
    const option = document.createElement('option');
    option.innerHTML = tutionCategoryList[i].name;
    option.setAttribute('value', tutionCategoryList[i].value)
    tutionCategorySelecor.appendChild(option);
}

// set program type options
const programTypeList = [
    {
        name: 'Undergraduate',
        value: 'undergraduate'
    },
    {
        name: 'Postgraduate',
        value: 'postgraduate'
    },
]

for(let i=0; i<programTypeList.length; i++){
    const option = document.createElement('option');
    option.innerHTML = programTypeList[i].name;
    option.setAttribute('value', programTypeList[i].value)
    programtTypeSelecor.appendChild(option);
}

// set wavier type options
const wavierTypeList = [
    {
        name: 'Result Based (S.S.C / H.S.C)',
        value: 'result-base'
    },
    {
        name: 'Sibling / Spouse',
        value: 'sibling-spouse'
    },
    {
        name: 'Female',
        value: 'female'
    },
    {
        name: 'Diploma Holder',
        value: 'diploma'
    },
]

for(let i=0; i<wavierTypeList.length; i++){
    const option = document.createElement('option');
    option.innerHTML = wavierTypeList[i].name;
    option.setAttribute('value', wavierTypeList[i].value)
    wavierSelecor.appendChild(option);
}

// set course type options
const courseTypeList = [
    {
        name: 'B.S.C in C.S.E',
        value: 'cse'
    },
    {
        name: 'B.S.C in E.E.E',
        value: 'cse'
    },
    {
        name: 'B.S.C in T.E',
        value: 'cse'
    },
    {
        name: 'B.S.C in S.W.E',
        value: 'cse'
    },
    {
        name: 'B.B.A',
        value: 'bba'
    },
]

for(let i=0; i<courseTypeList.length; i++){
    const option = document.createElement('option');
    option.innerHTML = courseTypeList[i].name;
    option.setAttribute('value', courseTypeList[i].value)
    courseSelecor.appendChild(option);
}

// set board type options
const boardTypeList = [
    {
        name: 'General Education Board',
        value: 'general'
    },
    {
        name: 'Technical Board',
        value: 'technical'
    },
    {
        name: 'Madrasha Board',
        value: 'madrasha'
    }
]

for(let i=0; i<boardTypeList.length; i++){
    const option = document.createElement('option');
    option.innerHTML = boardTypeList[i].name;
    option.setAttribute('value', boardTypeList[i].value)
    boardSelecor.appendChild(option);
}

// submit form
const form = document.getElementsByTagName('form');
form[0].addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log(e);
})


