import { getDocument, GlobalWorkerOptions } from 'pdf.mjs';

const url = 'Padres Picks rev 073124-Rev2.pdf';  // URL to your PDF file

GlobalWorkerOptions.workerSrc = 'pdf.worker.mjs';

let pdfDoc = null,
    scale = 1.5,
    viewer = document.getElementById('pdf-viewer');

// Asynchronously download PDF
getDocument(url).promise.then((pdfDoc_) => {
    pdfDoc = pdfDoc_;
    renderPages();
});

function renderPages() {
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
