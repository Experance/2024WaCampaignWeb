document.getElementById("note-container").classList.remove("hidden");



 /*
  Scrolling Event Listener for arrow 
document.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 0;
    const arrow = document.getElementById('arrow');
    arrow.classList.toggle('fade', scrolled);
    scrolled ? arrow.style.animation = "none" : arrow.style.animation = "fade_move_down 4s ease-in-out infinite";
});
*/

// const browser = getBrowser();



// function getBrowser() {
//     const ua = navigator.userAgent;

//     if (ua.indexOf('Firefox') > -1) {
//         return 'Firefox';
//     } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
//         return 'Safari';
//     } else if (ua.indexOf('Chrome') > -1) {
//         return 'Chrome';
//     } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) {
//         return 'Internet Explorer';
//     } else if (ua.indexOf('Edge') > -1) {
//         return 'Edge';
//     } else {
//         return 'Other';
//     }
// }

/* Printing */
function printPDF(){
    var iframe = document.createElement('iframe');  
    var pdfFileLocation = "PastorsPicksWA.pdf";

    iframe.style.visibility = "hidden";
    iframe.style.display = "none";
    iframe.src = pdfFileLocation;
    iframe.name = 'iframe';

    //document.body
    document.getElementById('pdf-canvas').prepend(iframe);
    
   // iframe.contentWindow.focus();
    setTimeout(function () {
        window.frames["iframe"].focus();
        window.frames["iframe"].print();
      }, 500);
   // iframe.contentWindow.print();
   setTimeout(function () {
    document.body.removeChild(frame1);
 }, 1500);
/*
    console.log(browser)
    if (browser === 'Safari') {
        // Code specific to Safari


    } else if (browser === 'Chrome') {
        // Code specific to Chrome
    } else if (browser === 'Firefox') {
        // Code specific to Firefox
    } else if (browser === 'Internet Explorer') {
        // Code specific to Internet Explorer
    } else if (browser === 'Edge') {
        // Code specific to Edge
    }

window.open('PastorsPicksWA.pdf', '_blank');
    */
    
    
}

    

document.getElementById('printerimg').addEventListener('click', ()=>{printPDF();})
