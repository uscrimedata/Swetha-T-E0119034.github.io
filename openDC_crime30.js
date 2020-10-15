//Built to consume data from open data dc at https://opendata.dc.gov/datasets/crime-incidents-in-the-last-30-days

(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "CCN",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "REPORT_DATE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "SHIFT",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "METHOD",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "OFFENSE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "BLOCK",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "XBLOCK",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "YBLOCK",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "WARD",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ANC",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DISTRICT",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PSA",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "NEIGHBORHOOD_CLUSTER",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "BLOCK_GROUP",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "CENSUS_TRACT",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "VOTING_PRECINCT",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "LATITUDE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "LONGITUDE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "BID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "START_DATE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "END_DATE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "OBJECTID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "OCTO_RECORD_ID",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "ODC_CrimeStats30",
            alias: "OpenDC Crime Stats",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };



    myConnector.getData = function(table, doneCallback) {
        //JSON link based on site-generated query for all fields based on https://opendata.dc.gov/datasets/crime-incidents-in-the-last-30-days
        var apiCall = "https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/8/query?where=1%3D1&outFields=*&outSR=4326&f=json"
        $.getJSON(apiCall, function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "CCN": feat[i].attributes.CCN,
                    "REPORT_DATE": feat[i].attributes.REPORT_DAT,
                    "SHIFT": feat[i].attributes.SHIFT,
                    "METHOD": feat[i].attributes.METHOD,
                    "OFFENSE": feat[i].attributes.OFFENSE,
                    "BLOCK": feat[i].attributes.BLOCK,
                    "XBLOCK": feat[i].attributes.XBLOCK,
                    "YBLOCK": feat[i].attributes.YBLOCK,
                    "WARD": feat[i].attributes.WARD,
                    "ANC": feat[i].attributes.ANC,
                    "DISTRICT": feat[i].attributes.DISTRICT,
                    "PSA": feat[i].attributes.PSA,
                    "NEIGHBORHOOD_CLUSTER": feat[i].attributes.NEIGHBORHOOD_CLUSTER,
                    "BLOCK_GROUP": feat[i].attributes.BLOCK_GROUP,
                    "CENSUS_TRACT": feat[i].attributes.CENSUS_TRACT,
                    "VOTING_PRECINCT": feat[i].attributes.VOTING_PRECINCT,
                    "LATITUDE": feat[i].attributes.LATITUDE,
                    "LONGITUDE": feat[i].attributes.LONGITUDE,
                    //LAT and LON consumed in lieu of 'geometry' object from source
                    "BID": feat[i].attributes.BID,
                    "START_DATE": feat[i].attributes.START_DATE,
                    "END_DATE": feat[i].attributes.END_DATE,
                    "OBJECTID": feat[i].attributes.OBJECTID,
                    "OCTO_RECORD_ID": feat[i].attributes.OCTO_RECORD_ID,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };


    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "DC OPEN DATA CRIME STATS";
        tableau.submit();
    });
});

})();
