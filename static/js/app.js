// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let filteredMetadata = metadata.filter(item => item.id === parseInt(sample))[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleData = d3.select("#sample-metadata");

    // Clear any existing metadata
    sampleData.html("");

    // Add each key-value pair to the metadata panel
    Object.entries(filteredMetadata).forEach(([key, value]) => {
      sampleData.append("p").text(`${key}: ${value}`);
    });
  });
}

// Build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the samples field
    let sampleData = data.samples;

    // Filter the samples for the object with the desired sample number
    let filteredSampleData = sampleData.filter(item => item.id === sample)[0];

    // Check if data exists
    if (!filteredSampleData) {
      console.error(`No data found for sample: ${sample}`);
      return;
    }

    // Get the otu_ids, otu_labels, and sample_values
    let sample_otu_ids = filteredSampleData.otu_ids;
    let sample_otu_labels = filteredSampleData.otu_labels;
    let sampleValues = filteredSampleData.sample_values;

    // Build a Bubble Chart
    let trace1 = {
      x: sample_otu_ids,
      y: sampleValues,
      text: sample_otu_labels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: sample_otu_ids,
        colorscale: 'Earth'
      }
    };

    let bubbleData = [trace1];

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      hovermode: "closest"
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Build a Bar Chart
    let top10_sampleValues = sampleValues.slice(0, 10).reverse();
    let top10_otu_ids = sample_otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    let top10_otu_labels = sample_otu_labels.slice(0, 10).reverse();

    let trace2 = {
      x: top10_sampleValues,
      y: top10_otu_ids,
      text: top10_otu_labels,
      type: "bar",
      orientation: "h"
    };

    let barData = [trace2];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Initialize the dashboard
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the names field
    let nameData = data.names;

    // Populate the dropdown menu
    let dropDownMenu = d3.select("#selDataset");
    nameData.forEach(name => {
      dropDownMenu.append("option").text(name).property("value", name);
    });

    // Get the first sample from the list
    let firstSample = nameData[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
