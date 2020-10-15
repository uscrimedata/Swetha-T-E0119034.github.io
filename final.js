(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "ID",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Location_Description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Ward",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Year",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Updated_On",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Latitude",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Longitude",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Location",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "CHICAGO_CrimeStats30",
            alias: "CHICAGO Crime Stats",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };



    myConnector.getData = function(table, doneCallback) {
        
        var apiCall = "https://data.cityofchicago.org/resource/ijzp-q8t2.json"
        $.getJSON(apiCall, function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "ID": feat[i].attributes.ID,
                    "Location_Description": feat[i].attributes.Location_Description,
                    "Ward": feat[i].attributes.Ward,
                    "Year": feat[i].attributes.Year,
                    "Updated_On": feat[i].attributes.Updated_On,
                    "Latitude": feat[i].attributes.Latitude,
                    "Longitude": feat[i].attributes.Longitude,
                    "Location": feat[i].attributes.Location,
                   
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };


    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "CHICAGO CRIME DATA STATS";
        tableau.submit();
    });
});

})();