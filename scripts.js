import { getDocument, GlobalWorkerOptions } from './pdf.mjs';

const url = 'Padres Picks rev 073124-Rev2.pdf';  // URL to your PDF file

GlobalWorkerOptions.workerSrc = './pdf.worker.mjs';

let pdfDoc = null,
    scale = 1.5,
    viewer = document.getElementById('pdf-canvas');

// Asynchronously download PDF
getDocument(url).promise.then((pdfDoc_) => {
    pdfDoc = pdfDoc_;
    
    renderPages().then(() => {
        // Doing things after pdf loads
        document.getElementById("hyperlink").classList.remove('hidden'); // Show the hyperlink after the PDF loads
        document.body.style.backgroundColor = "#75b8a7"; 
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

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        viewer.appendChild(canvas);
        page.render(renderContext);
    });
}


