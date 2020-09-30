// inspecting connection with HTML file
console.log('This is app.js connected');

// function to draw a bar graph
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph (${sampleId}`)
}

function DrawBubbleChart(sampleId) {
    console.log(`DrawBubbleChart (${sampleId}`)
}



function optionChanged(newSampleId) {
    console.log(`User select ${newSampleId}`)

    DrawBargraph(newSampleId)
}

// init function
function initDashboard() {
    // checking function connection
    console.log('calling initDashboard()');

    // getting the dropdownbox element
    var selector = d3.select('#selDataset');

    // reading samples.json 
    d3.json("/samples.json").then((data) => {
        // checking succesfull reading
        console.log(data)
        //variable holding the subjects ID
        var sampleNames = data.names;
        // appending each subject ID to the dropdown, se its not hard-coded
        // and populating the selector with all of the samples ID
        sampleNames.forEach((sampleId) => {
            selector.append('option')
                .text(sampleId)
                .property('value', sampleId);
        });
        // getting the displayed sample ID
        var sampleId = sampleNames[0];
        // validating on the console
        console.log('Starting sample: ', sampleId);

        // draw the graphs
        DrawBargraph(sampleId);
        DrawBubbleChart(sampleId);

    });
}

initDashboard();

