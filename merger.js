const PDFMerger = require('pdf-merger-js');
const fs = require('fs')



const mergepdfs = async(pdfpaths) => {
    //new instance of merger is created inside function because previously only one instance was being created and then the pdfs were just addded to the existing merged pdf that is what we don't need so a new instance is being created everytime function is being called so that we don't merge files and add it to the resultant file
    const merger = new PDFMerger();


    //to merge more than 2 pdfs we can use an array
    for (const path of pdfpaths) {
        await merger.add(path)
    }
    // await merger.add(p1);
    // //merge all pages. parameter is the path to file and filename.

    // await merger.add(p2);



    // await merger.add('pdf2.pdf', 2);
    // merge only page 2


    // await merger.add('pdf2.pdf', [1, 3]);
    // merge the pages 1 and 3


    // await merger.add('pdf2.pdf', '4, 7, 8');
    // merge the pages 4, 7 and 8


    // await merger.add('pdf3.pdf', '3 to 5'); 
    //merge pages 3 to 5 (3,4,5)


    // await merger.add('pdf3.pdf', '3-5');
    //merge pages 3 to 5 (3,4,5)

    //previously what happened was i hadn't multiplied with 10000000 so only 1 random number 0 was being generated and as a result the file was being overwritten for example if i merge 2 pdfs then that would be saved and when i merged the other files this resultant file was being overwritten with the recent merge
    //this issue was because of same file name and by generating a unique number everytime we resolve this issue

    let d = Math.floor(Math.random() * 10000000);


    await merger.save(`public/${d}.pdf`);
    const mergedpdfsBuffer = await merger.saveAsBuffer()
        // fs.unlinkSync(p1);
        // fs.unlinkSync(p2);
    return d;
    //save under given name and reset the internal document

    // // Export the merged PDF as a nodejs Buffer
    // // const mergedPdfBuffer = await merger.saveAsBuffer();
    // // fs.writeSync('merged.pdf', mergedPdfBuffer);
};
module.exports = { mergepdfs }