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
        var sampleData = data.samples.filter(x => x.id == sampleId) // filter pulls out what matches the criteria
        console.log(sampleData[0].otu_ids.slice(0, 10).reverse())
        

        var trace1 = {
            type: 'bar',
            x: sampleData[0].sample_values.slice(0, 10).reverse(),
            y: sampleData[0].otu_ids.slice(0, 10).map(otu =>  `OTU ${otu}`).reverse(), // adding OTU to the label.
            text: sampleData[0].otu_labels.slice(0, 10),
            orientation: "h"
        };
        
        var data = [trace1];
        
        var layout = {
            title: `Subject ID ${sampleId} Top 10 Bacteria Found`,
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot('bar', data, layout)
                
    });

}

function drawBubbleChart(sampleId) {
    // fetch data
    d3.json('/samples.json').then((data) => {
        
        // getting the object: sample_values, otu_id, and otu_lables by sampleID
        var sampleData = data.samples;
        
        var sampleData = data.samples.filter(x => x.id == sampleId);
        //console.log(sampleData[0].otu_ids);
               
        var trace1 = {
            x: sampleData[0].otu_ids,
            y: sampleData[0].sample_values,
            mode: 'markers',
            marker: {
                size: sampleData[0].sample_values,
                color: sampleData[0].otu_ids,
                colorscale: 'Earth'
            },
            text: sampleData[0].otu_labels
        };

        data = [trace1];

        var layout = {
            title: "Bacteria",
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot('bubble', data, layout);
    });
}
function demographics(sampleId) {
    console.log(`Show metadata ${sampleId}`);
    d3.json('/samples.json').then((data) => {
        console.log(data.metadata);
        var metaData = data.metadata.filter(x => x.id == sampleId);
        console.log(metaData[0]);
        // getting the div element
        var selector = d3.select("#sample-metadata")
        // clear previous content
        selector.html('');

        Object.entries(metaData[0]).forEach(([key, value]) => {
            selector.append('h6')
             .text(`${key}: ${value}`);
        });
    });
}

function gaugeChart(sampleId) {
    console.log(`works ${sampleId}`);
    
    
    // var data = [
    //     {
    //       domain: { 
    //           x: [0, 1], 
    //           y: [0, 1]
    //         },
    //       value: 450,
    //       title: { text: "Speed" },
    //       type: "indicator",
    //       mode: "gauge+number+delta",
    //       delta: { reference: 380 },
    //       gauge: {
    //         axis: { range: [0, 9] },
    //         steps: [
    //           { range: [0, 250], color: "lightgray" },
    //           { range: [250, 400], color: "gray" }
    //         ],
    //         threshold: {
    //           line: { color: "red", width: 4 },
    //           thickness: 0.75,
    //           value: 490
    //         }
    //       }
    //     }
    //   ];
      
    //   var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    //   Plotly.newPlot('myDiv', data, layout);
}

function optionChanged(newSampleId) {
    console.log(`User select ${newSampleId}`)
    // running functions when selecting a new sampleID
    drawBarChart(newSampleId)
    drawBubbleChart(newSampleId)
    demographics(newSampleId)
    gaugeChart(newSampleId);
}

// init function discussed in office hours
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
        demographics(sampleId);
        gaugeChart(sampleId);
    });
}

initDashboard();

