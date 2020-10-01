// inspecting connection with HTML file
console.log('This is app.js connected');

// function to draw a bar graph
function drawBarChart(sampleId) {
    console.log(`DrawBargraph (${sampleId}`)
    
    // reading samples.json 
    d3.json('/samples.json').then((data) => {
        // checking succesfull reading
        console.log(data.samples)
        // getting the sample_values, otu_id, and otu_lables
        var sampleData = data.samples
        console.log(sampleData[`${sampleID}`])
        //variable holding the subjects ID
        // var trace1 = {
        //     x: 
        // };
        
        // var barLayout = {
        //     height: 400,
        //     width: 500
        // }

        // Plotly,newPLot('bar', barData, barLayout)
                
    });

}

function drawBubbleChart(sampleId) {
    console.log(`DrawBubbleChart (${sampleId}`)

}

// function demographics(sampleId) {
//     d3.json('/samples.json').then((data) => {
//         console.log(data.samples);
//         data.samples.forEach((id) => {
//             Object.entries((value) => {

//             }
//         });
//     });
// }  

function optionChanged(newSampleId) {
    console.log(`User select ${newSampleId}`)

    drawBarChart(newSampleId)
    drawBubbleChart(newSampleId)
}

// init function
function initDashboard() {
    // checking function connection
    console.log('calling initDashboard()');

    // getting the dropdownbox element by its id
    var selector = d3.select('#selDataset');

    // reading samples.json 
    d3.json('/samples.json').then((data) => {
        // checking succesfull reading
        console.log(data)
        //variable holding the subjects ID
        var sampleNames = data.names;
        // appending each subject ID to the dropdown, se its not hard-coded
        // and populating the selector with all of the samples ID
        sampleNames.forEach((sampleId) => {
            selector.append('option') // creates a new <option> element on the HTML
                .text(sampleId)
                .property('value', sampleId);
        });
        // getting the displayed sample ID (first sample ID)
        var sampleId = sampleNames[0];
        // validating on the console
        console.log('Starting sample: ', sampleId);

        // draw the graphs
        drawBarChart(sampleId);
        drawBubbleChart(sampleId);
        
    });
}

initDashboard();

