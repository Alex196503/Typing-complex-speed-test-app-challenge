document.addEventListener(('DOMContentLoaded'),()=>{
    let dropdownFirstContainer = document.querySelector('#first-dropdown');
    let dropdownContainer = document.querySelector('.container-dropdown');
    let allContainers = dropdownContainer.querySelectorAll('.container-content');
    let butonOne = dropdownFirstContainer.parentElement.querySelector('.btn-dropdown');
    let dropdownSecondContainer = document.querySelector('#second-dropdown');
    let butonTwo = dropdownSecondContainer.parentElement.querySelector('.btn-dropdown.second');
    let allBtnsDificle = document.querySelectorAll('.difficulty-container>button');
    let allBtnsTimer = document.querySelectorAll('.time-container>button');
    let startTestBtn = document.querySelector('.btn-start');
    let restartBtn = document.querySelector('.btn-restart');
    let body = document.querySelector('body');
    let timerId = null;
    let timeParagraph =  document.querySelector('.your-time');
    let wpmParagraph = document.querySelector('.your-wpm');
    let accuracyParagraph = document.querySelector('.your-accuracy');
    let paragraph = document.querySelector('.typing-text');
    let currentIndex = 0;
    let wordIndex = 0;
    let totalTypedChars = 0;
    let correctChars = 0;
    let wrongChars = 0;
    let resultParagraph = document.querySelector('.span-wpm');
    let wpmStored = localStorage.getItem('WPM');
    if(wpmStored != null)
    {    
    resultParagraph.innerHTML = `${wpmStored} WPM`;
    }
    else{
        resultParagraph.innerHTML = '92 WPM';
    }
    let accuracy = 0;
    let result = 0;
    let isStarted = false;
    let allSpans = [];
    allBtnsTimer.forEach((btn)=>{
        btn.addEventListener(('click'),()=>{
            allBtnsTimer.forEach((btns)=>{
                btns.classList.remove('active');
            })
            btn.classList.add('active');
        })
    })
    
    allBtnsDificle.forEach((btn)=>{
        btn.addEventListener(('click'),()=>{
            allBtnsDificle.forEach((btns)=>{
                btns.classList.remove('active');
            })
            btn.classList.add('active');
        })
    })
    butonOne.addEventListener(('click'),()=>{
        dropdownFirstContainer.classList.toggle('show');
    })
    butonTwo.addEventListener(('click'),()=>{
        dropdownSecondContainer.classList.toggle('show');
    })
    allContainers.forEach((container)=>{
        let allInputs = container.querySelectorAll('input');
        let btn = null;
        if(container.id === 'first-dropdown')
        {
             btn = document.querySelector('#first-btn');
        }
        else{
             btn = document.querySelector('#second-btn');
        }
       allInputs.forEach((input)=>{
        let label = input.nextElementSibling.innerHTML;
        input.addEventListener(('change'),()=>{
            if(input.checked)
            {
                btn.innerHTML = label;                
            }
        })
       })
    })
    startTestBtn.addEventListener(('click'),()=>{
        startTest();
    });
    restartBtn.addEventListener(('click'),()=>{
        startTest();
    })
    async function startTest()
    {
        isStarted = true;
        let section = document.querySelector('.container-main');
        let text = document.querySelector('.typing-text');
        let footer = document.querySelector('.footer');
        section.classList.add('hidden');
        footer.classList.remove('hidden');
        text.classList.add('vibre');
        timeParagraph.classList.add('yellow');
        await pickAParagraph();
        toggleTime(); 
        wpmParagraph.innerHTML = 0;
        accuracyParagraph.innerHTML = 0;
        wordIndex = 0;
        correctChars = 0;
        wrongChars = 0;
        totalTypedChars = 0;
        allSpans.forEach((span)=>{
            span.classList.remove('correct', 'wrong');
        })
        currentIndex = 0;
        allSpans = paragraph.querySelectorAll('span');
        
        return isStarted;
    }
    body.addEventListener(('keydown'),(e)=>{
        if(!isStarted) return;
        if(e.key === 'Backspace')
        {
            if(currentIndex === 0 ) return;
            currentIndex --;
            let span = allSpans[currentIndex];
            span.classList.remove('correct', 'wrong');
            totalTypedChars --;
            return;
        }
        if(e.key.length!==1) return;
        totalTypedChars++;
        let currentSpan = allSpans[currentIndex];
        if(e.key === currentSpan.textContent)
        {
            currentSpan.classList.add('correct');
            currentIndex++;
        }
        else{
            currentSpan.classList.add('wrong');
            currentIndex++;
        }
     
        if(e.key === ' ')
        {
            e.preventDefault();
           let wordPart = Array.from(allSpans).slice(wordIndex, currentIndex - 1);
           let correctWords = wordPart.filter((word)=>word.classList.contains('correct')).length;
           let incorrectWords = wordPart.filter((word)=>word.classList.contains('wrong')).length;
           wrongChars += incorrectWords;
           correctChars +=correctWords;
           wordIndex = currentIndex;
           calculateWPM(correctChars, totalTypedChars);           
            
        }
        if(currentIndex >= allSpans.length)
        {   calculateWPM(correctChars, totalTypedChars);
            redirectTOUri();
        }
        
    })
    function calculateWPM(CorrectChars, charactersTyped)
    {
       let words = CorrectChars / 5 ;
       let seconds = parseFloat(timeParagraph.textContent);
       console.log(seconds);
       
       if(seconds ===0) return;
       let minutes = seconds / 60;
       result = Math.round (words / minutes);
       
       accuracy =Math.round( (CorrectChars / charactersTyped) * 100);
       wpmParagraph.textContent = result;
       accuracyParagraph.textContent = `${accuracy}%`;
    }

    function toggleTime()
    {
        let activeBtn = document.querySelector('.time-container .active');
        if(activeBtn.dataset.timer === 'Yes')
        {
           calculateTime();
        }
        else{
            updateTime();
        }
    }
    function redirectTOUri()
    {
        window.location.replace(`results.html?correctChars=${encodeURIComponent(correctChars)}&accuracy=${encodeURIComponent(accuracy)}&result=${encodeURIComponent(result)}&incorrectChars=${encodeURIComponent(wrongChars)}`);
    }
    function calculateTime()
    {
        clearInterval (timerId);
        let time = 0.60;
        timeParagraph.textContent = time.toFixed(2);
        timerId = setInterval(()=>{
            time = time - 0.01;
            if(time <=0)
            {
                time = 0;
                clearInterval(timerId);
                redirectTOUri();
            }
            timeParagraph.textContent = time.toFixed(2);
        },1000)
    }
    function updateTime()
    {
        clearInterval (timerId);
        let time = 0;
        timeParagraph.textContent = time.toFixed(2);
        timerId = setInterval(()=>{
            time = time + 0.01;
            timeParagraph.textContent = time.toFixed(2);
        },1000)
    }
    async function pickAParagraph()
    {
        let activeButton = document.querySelector('.difficulty-container .active');    
        let req = await fetch ('data.json');
        let answers = await req.json();
        let EasyAnswers = answers.easy;    
        let MediumAnswers = answers.medium;
        let HardAnswers = answers.hard;      
        let random = Math.floor(Math.random() * EasyAnswers.length);
        let RandomEasyAnswer = null;
        let RandomMediumAnswer = null;
        let RandomHardAnswer = null;
        EasyAnswers.forEach((answer, index )=>{
            if(index === random)
            {
                RandomEasyAnswer = answer;
            }
        }) 
        MediumAnswers.forEach((answer, index)=>{
            if(index === random)
            {
                RandomMediumAnswer = answer;
            }
        })   
        HardAnswers.forEach((answer, index) =>{
            if(index === random)
            {
                RandomHardAnswer = answer;
            }
        })        
        if(activeButton.dataset.difficulty === 'easy')
        {
            paragraph.innerHTML = RandomEasyAnswer.text;
        }
        else if(activeButton.dataset.difficulty === 'medium')
        {
            paragraph.innerHTML = RandomMediumAnswer.text;
        }
        else {
            paragraph.innerHTML = RandomHardAnswer.text;
        }

        let paragraphContent = paragraph.textContent;
        paragraph.textContent = '';
        let Chars = paragraphContent.split('');
        Chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        paragraph.appendChild(span);
    });
}
})