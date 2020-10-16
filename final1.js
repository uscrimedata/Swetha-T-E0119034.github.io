(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        },{

            id:"case_number",
            dataType:tableau.dataTypeEnum.string
        },
        {
            id:"date",
            dataType:tableau.dataTypeEnum.string
        },
        {

            id:"block",
            dataType:tableau.dataTypeEnum.string
        },
         {
            id: "iucr",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "primary_type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "description",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "location_description",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "arrest",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "domestic",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "beat",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "district",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ward",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "community_area",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "fbi_code",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "x_coordinate",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "y_coordinate",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "year",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "updated_on",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "latitude",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "longitude",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "location",
            dataType: tableau.dataTypeEnum.string
        },

        ];

        var tableSchema = {
            id: "ODC_CrimeStats30",
            alias: "OpenDC Crime Stats",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };



    myConnector.getData = function(table, doneCallback) {
        //JSON link based on site-generated query for all fields based on https://opendata.dc.gov/datasets/crime-incidents-in-the-last-30-days
        var apiCall = "https://data.cityofchicago.org/resource/ijzp-q8t2.json"
        $.getJSON(apiCall, function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].attributes.id,
                    "case_number":feat[i].attributes.case_number,
                    "date":feat[i].attributes.date,
                    "block":feat[i].attributes.block,
                    "iucr":feat[i].attributes.iucr,
                    "primary_type":feat[i].attributes.primary_type,
                    "description": feat[i].attributes.description,
                    "location_description": feat[i].attributes.location_description,
                    "arrest":feat[i].attributes.arrest,
                    "domestic":feat[i].attributes.domestic,
                    "beat":feat[i].attributes.beat,
                    "district":feat[i].attributes.district,
                    "ward":feat[i].attributes.ward,
                    "community_area":feat[i].attributes.community_area,
                    "fbi_code":feat[i].attributes.fbi_code,
                    "x_coordinate":feat[i].attributes.x_coordinate,
                    "y_coordinate":feat[i].attributes.y_coordinate,
                    "year": feat[i].attributes.year,
                    "updated_on": feat[i].attributes.updated_on,
                    "latitude": feat[i].attributes.latitude,
                    "longitude": feat[i].attributes.longitude,
                    "location": feat[i].attributes.location,
                    
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };


    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "CHICAGO DATA STATS";
        tableau.submit();
    });
});

})();