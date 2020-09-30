// inspecting connection: for all connection printing ont he console
console.log('This is app.js connected');

function DrawBargraph(sampleId) {
    console.log(`DrawBargraph (${sampleId}`)
}

function optionChanged(newSampleId) {
    console.log(`User select ${newSampleId}`)
}

function initDashboard() {
    // checking function connection
    console.log('calling initDashboard()');

    var selector = d3.select('#selDataset');

    d3.json("/samples.json").then((data) => {
        console.log(data)
        var sampleNames = data.names;
        // since we don't have option we need to append it in our code
        // populate the selector with all of the sample IDs
        sampleNames.forEach((sampleId) => {
            selector.append('option')
                .text(sampleId)
                .property('value', sampleId);
            
        });
        
        var sampleId = sampleNames[0];
        console.log('Starting sample: ', sampleNames);

        // draw the graphs
        DrawBargraph(sampleId);
        // DrawBubbleChart(sampleId);

    });
}

initDashboard();


// // using D3 fetch to read data the from JSON file, referred as data
// d3.json("/samples.json").then((data) => {
    
//     // variable with the individuals ID
//     var subjectID = data.names;
    
//     console.log(subjectID);
    
//     function optionChanged(subjectID) {

//         // selecting the dropdown menu 'd3.select("#selDataset")' and assigning 
//         // the value to the dropdown '.node().value
//         var dataset = subjectID.value
//         document.getElementById("selDataset").innerHTML = subjectID;

//         //var dataset = d3.select("#selDataset").node().value;
//         // Assign the value of the dropdown menu option to a variable
//         // var dataset = dropdownMenu.node().value;
//         console.log(dataset)
        
//     };

//     function updatePlot()
// });


