const todays_count_for = 'India,canada,china,Japan,France,Singapore,USA';
async function getGlobalCount() {
    let globalData = await fetch(`https://disease.sh/v3/covid-19/all`);
    let globalDetail = await globalData.json()
    createGloabalData(globalDetail);
}

async function getMapSpecificInfo() {
    let countriesInfo = await fetch(`https://disease.sh/v3/covid-19/countries`);
    let countryDetail = await countriesInfo.json()
    createSpotsOnMap(countryDetail);    
}


async function getTodaysCount() {
    let todaysCount = await fetch(`https://disease.sh/v3/covid-19/countries/${todays_count_for}`);
    let countryDetailJson = await todaysCount.json()
    createTodaysCount(countryDetailJson);    
}

const report=document.getElementById('main__brief__report');
function createGloabalData(globalDetail) {
    const reportHtml = `
    <div class="main__confirmed__case">
    <div class="main__case__heading">Infected</div>
      <div class="main__case__lastupdate">
      ${timeConverter(globalDetail.updated)}
      </br><span>Last Updated</span>
      </div>
      <div class="main__case__number">
      ${globalDetail.active}
      </div>
      <p class="main__case__detail">
      Number of active cases of COVID-19
      </p>

    </div>
    <div class="main__death__case">
    <div class="main__case__heading">Death</div>
       <div class="main__case__lastupdate">
       ${timeConverter(globalDetail.updated)}
       </br><span>Last Updated</span>
       </div>
       <div class="main__case__number">
       ${globalDetail.deaths}
       </div>
       <p class="main__case__detail">
       Number of death cases of COVID-19
       </p>
    </div>
    <div class="main__recovered__case">
    <div class="main__case__heading">Recovered</div>
      <div class="main__case__lastupdate">
      ${timeConverter(globalDetail.updated)}
      </br><span>Last Updated</span>
      </div>
      <div class="main__case__number">
      ${globalDetail.recovered}
      </div>
      <p class="main__case__detail">
      Number of recovered cases of COVID-19
      </p> 
    </div>`;
report.innerHTML=reportHtml;
}


const specificCountryDiv=document.getElementById('main__data_of_countries');
function createTodaysCount(countries){
    let tableHtml=`<table>
    <tr>
        <th colspan="2">
            <h3>Today's cases</h3>
        </th>
    </tr>
    <tr>
        <th>Countries</th>
        <th>Count</th>
    </tr>`;
    for(var i=0;i<countries.length;i++){
        tableHtml+=`<tr>
        <td>${countries[i].country}</td>
        <td>${countries[i].todayCases}</td>
    </tr>`;
    }
    specificCountryDiv.innerHTML=tableHtml;
}

getGlobalCount();
getMapSpecificInfo();
getTodaysCount();

function createSpotsOnMap(covidDetail){
    console.log(covidDetail);
    let map = L.map('map').setView([0, 0], 2);
    let marker=null;
    let length=covidDetail.length;
    let color=null;
  
    for (i = 0; i < length; i++) {
        if(covidDetail[i].active<=500){
           color='green';
        }
        else if(covidDetail[i].active>500 && covidDetail[i].active <=5000){
             color='orange';
        }else{
            color='red';
        }
        let circle=L.circleMarker([covidDetail[i].countryInfo.lat, covidDetail[i].countryInfo.long],{
        
            color:color,
            fillColor:'#f03',
            fillIOpacity:0.5,
            radius:3
        }).addTo(map);
        circle.bindPopup(`<span  style="color:${color};text-align:center;">${covidDetail[i].country}</br>Active:${covidDetail[i].active}</span`);
         
    }

    L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=ULdzZ00CnbXTM0L9bzt5', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);
}

function timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }