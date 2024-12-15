# belly-button-challenge

1. Building the metadata panel:

The function buildMetadata is created to access the link https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json where the data is in json style
    
The data field is accessed and used to get the information for the desired sample number using the filter function.

d3 is used to select the panel with id of `#sample-metadata`. The text in the metadata panel is cleared using sampleData.html("") and the information for desired sample number is added to the panel.



2. Building bar chart and bubble chart

The function buildCharts is used to create bar and bubble chart using information from the json file. Using the filter sample, the information from the data field is retrieved for the desired sample number. For the desired sample, the otu_ids, otu_labels, and sample_values are saved specific variables to create the charts.
    
-Building a Bubble Chart
      x values are sample_otu_ids and y values are sampleValues with sample_otu_labels as labels. The size are the sampleValues and color sample_otu_ids. The layout was also defined with title, x axis label and adding hovermode to the chart. Plotly was used to plot the bubble chart.

-Building a Bar Chart

For the x values, the sampleValues were sliced to get the top 10 sample values and reversed to get it in descending order. 
For the x values, the sample_otu_ids were sliced to get the top 10 sample values and using map function, each id was converted into string. Then it was reversed to get the result in descending order.
For the labels, the sample_otu_labels were also sliced and reversed to get the top 10 labels in descending order.

The layout was defined, parsing the title and margin as argument and the bar chart was plotted using plotly.


3. Initialize the dashboard
The function init is created to populate the dropdown menu with the sample id and the functions buildCharts and buildMetadata were called inside it for the first sample. This way the dashboard will always show the metadata panel and graphs for the first sample.


4. Creating Function for event listener
The function optionChanged is created the functions buildCharts and buildMetadata were called inside it. This function will change the dashboard to reflect the data and graphs for the sample chosen in the dashboard.
