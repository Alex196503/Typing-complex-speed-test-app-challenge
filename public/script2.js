document.addEventListener(('DOMContentLoaded'),()=>{
    let btnGo = document.querySelector('.btn-restart');
    btnGo.addEventListener(('click'),()=>{
        window.location.replace('index.html');
    }) 
    let correctParagraph = document.querySelector('.correct');
    
    let wpmParagraph = document.querySelector('.your-wpm');
    let title = document.querySelector('.section-title');
    let paragraph2 = document.querySelector('.section-heading');
    let spanText= btnGo.querySelector('span');
    let resultParagraph = document.querySelector('.span-wpm'); 
    let accuracyParagraph = document.querySelector('.your-accuracy');
    let spanWrong = document.querySelector('.wrong');
    let link = window.location.search;        
    let chars = new URLSearchParams(link).get('correctChars');
    let containerSVG = document.querySelector('.container-svg');
    let body = document.querySelector('body');
    let wpm = new URLSearchParams(link).get('result');
    let accuracy = new URLSearchParams(link).get('accuracy');
    let incorrectChars = new URLSearchParams(link).get('incorrectChars');
    wpmParagraph.textContent = wpm;    
    spanWrong.textContent = `/${incorrectChars}`;
    accuracyParagraph.textContent = accuracy;
    correctParagraph.textContent = chars;
    let wpmVALUE = Number(wpm);
    let storedWPM = localStorage.getItem('WPM');
    if(storedWPM === null)
        {
            title.textContent = 'Baseline Established!';
            paragraph2.textContent = "You've set the bar. Now the real challenge begins - time to beat it."
            resultParagraph.innerHTML = `${wpmVALUE} WPM`;
            localStorage.setItem('WPM', wpmVALUE);
        }    
    else{
        let numberWPM = Number(storedWPM);
        if(wpmVALUE > numberWPM )
            {
        title.textContent = 'High Score Smashed!';
        paragraph2.textContent = "You're getting faster. That was incredible typing.";
        localStorage.setItem('WPM', wpmVALUE);
        resultParagraph.textContent = `${wpmVALUE} WPM`;
        body.classList.add('body-second');
        btnGo.classList.add('largerWidth');
        spanText.textContent = 'Beat This Score';
        containerSVG.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" viewBox="0 0 80 80"><path stroke="#f4dc73" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M29.579 58.003c2.938 2.744 11.607-1.77 19.365-10.08 7.755-8.309 11.663-17.267 8.725-20.01s-11.611 1.77-19.366 10.08c-7.758 8.309-11.663 17.267-8.724 20.01" clip-rule="evenodd"/><path stroke="#f4dc73" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M10.696 22.917h.078m8.927 34.19h.078M58.176 28.568l11.712 36.778c.545 1.719-1.019 3.367-2.767 2.91l-36.444-9.591"/><path stroke="#f4dc73" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M51.21 64.064c2.414-1.739 4.924-3.99 7.337-6.561 2.54-2.738 4.664-5.537 6.273-8.141M21.49 46.937S15.32 46.46 10 52.207"/><path stroke="#f4dc73" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M31.908 19.9a3.952 3.952 0 1 1-7.904.004 3.952 3.952 0 0 1 7.904-.003" clip-rule="evenodd"/><path stroke="#f4dc73" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M42.438 42.269s-10.82-11.163-27.392-6.444M46.17 11.667s-6.266 8.578.674 18.892"/></svg>'
            } 
            else{
                resultParagraph.innerHTML = `${wpmVALUE} WPM`;
            }
    }
})