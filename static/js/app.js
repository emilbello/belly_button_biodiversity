// inspecting connection with HTML file
console.log('This is app.js connected');

// function to draw a bar graph
function drawBarChart(sampleId) {
    console.log(`DrawBargraph (${sampleId}`)
    
    // reading samples.json 
    d3.json('/samples.json').then((data) => {
        // checking succesfull reading
        // console.log(data.samples)
        // getting the object: sample_values, otu_id, and otu_lables by sampleID
        var sampleData = data.samples.filter(x => x.id == sampleId)
        console.log(sampleData[0].otu_ids.slice(0, 10).reverse())
        
        
        var trace1 = {
            type: 'bar',
            x: sampleData[0].sample_values.slice(0, 10).reverse(),
            y: `OTU ${sampleData[0].otu_ids.slice(0, 10).reverse()}`,
            text: sampleData[0].otu_labels.slice(0, 10),
            orientation: "h"
        };
        
        var data = [trace1];
        
        var layout = {
            height: 600,
            width: 300
        }

        Plotly.newPlot('bar', data, layout)
                
    });

}

function drawBubbleChart(sampleId) {
    // fetch data
    d3.json('/samples.json').then((data) => {
        
        // getting the object: sample_values, otu_id, and otu_lables by sampleID
        var sampleData = data.samples
        
        var sampleData = data.samples.filter(x => x.id == sampleId)
        console.log(sampleData[0].otu_ids)

               
        var trace1 = {
            x: sampleData[0].otu_ids,
            y: sampleData[0].sample_values,
            mode: 'markers',
            marker: {
                size: sampleData[0].sample_values
                // color: 
            }
        };

        data = [trace1];

        var layout = {
            showlegend: false,
            height: 600,
            width: 900
        };

        Plotly.newPlot('bubble', data, layout);
    });
}

// function demographics(sampleId) {
//     d3.json('/samples.json').then((data) => {
//         console.log(data.samples);
//         data.samples.forEach((key, value) => {
//             selector.append('h6')
//              .text(`${key}: ${value}`)

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

