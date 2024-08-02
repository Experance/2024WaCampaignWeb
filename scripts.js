import { getDocument, GlobalWorkerOptions } from './pdf.mjs';

const url = 'Padres Picks rev 071124b 8-1-24.pdf';  // URL to your PDF file

GlobalWorkerOptions.workerSrc = './pdf.worker.mjs';

let pdfDoc = null,
    scale = 8,
    viewer = document.getElementById('pdf-canvas');

// Asynchronously download PDF
getDocument(url).promise.then((pdfDoc_) => {
    pdfDoc = pdfDoc_;
    
    renderPages().then(() => {
        // Doing things after pdf loads
        document.getElementById("hyperlink").classList.remove('hidden'); // Show the hyperlink after the PDF loads
        // document.body.style.backgroundColor = "#75b8a7"; 
    }).catch((error) => {
        console.error(`Could not get products: ${error}`);
    });
});

async function renderPages() {
    for (let num = 1; num <= pdfDoc.numPages; num++) {
        renderPage(num);
    } 
    
    
}

function renderPage(num) {
    pdfDoc.getPage(num).then((page) => {
        const viewport = page.getViewport({ scale: scale });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.width = "100%";

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        viewer.appendChild(canvas);
        page.render(renderContext);
    });
}
 
 /* Scrolling Event Listener for arrow */
document.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 0;
    const arrow = document.getElementById('arrow');
    arrow.classList.toggle('fade', scrolled);
    scrolled ? arrow.style.animation = "none" : arrow.style.animation = "fade_move_down 4s ease-in-out infinite";
});
/* Printing */
function printPDF(){
    var iframe = document.createElement('iframe');  
    var canvas = document.getElementById('pdf-canvas');
    var pdfFileLocation = canvas.getAttribute('src');

    iframe.style.visibility = "hidden";
    iframe.style.display = "none";
    iframe.src = pdfFileLocation;

    document.body.appendChild(iframe);

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
}

document.getElementById('printerimg').addEventListener('click', ()=>{printPDF();})
