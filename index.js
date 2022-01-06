document.addEventListener("DOMContentLoaded", () => {
    let dota = new Dota();
    dota.init();
});

function Dota() {
    this.currentLink = null;
    this.API_LINK = "https://api.opendota.com";
    this.GET_PLAYERS_BY_RANK = "playersByRank";
    this.GET_PLAYER_BY_ID = "players";
    this.GET_MATCH_BY_ID = "matches";
}

Dota.prototype.init = async function() {
    //let result = await this.API(this.GET_PLAYERS_BY_RANK);
    //result = await this.API(this.GET_PLAYER_BY_ID, result[0].account_id);
    // let result = await this.API(this.GET_MATCH_BY_ID, 6362760250);
    // console.log(result);
    
    let response = await fetch("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key=C0969B5252B4EFA4D1E814E00BD52C47&match_id=6362662278",{
        mode: "no-cors"
    });
    let result = await response;
    console.log(result);
    //this.generateResult(result);
};

Dota.prototype.API = function(command, params=null) {
    this.setAPI(command, params);
    return this.callAPI();
};

Dota.prototype.setAPI = function(command, params=null) {
    this.currentLink = params !== null ? `${this.API_LINK}/api/${command}/${params}` : `${this.API_LINK}/api/${command}`;
};

Dota.prototype.callAPI = async function() {
    let response = await fetch(this.currentLink);
    return await response.json();
};

Dota.prototype.controlsHandler = function() {

};

Dota.prototype.transformData = function() {

};

Dota.prototype.generateResult = function(data=[]) {
    var wb = XLSX.utils.book_new();
    wb.Props = {
            Title: "SheetJS Tutorial",
            Subject: "Test",
            Author: "Red Stapler",
            CreatedDate: new Date(2017,12,19)
    };
    
    wb.SheetNames.push("Dota 2 api");
    var ws = XLSX.utils.aoa_to_sheet([data]);
    wb.Sheets["Sheet"] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), 'dota2_api_result.xlsx');
};

Dota.prototype.s2ab = function (s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}