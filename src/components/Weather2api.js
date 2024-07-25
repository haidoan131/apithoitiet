import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Container } from "reactstrap";

export default function Weather2api() {
     // const apiKey="a155c3741cd26acf163910514d08898e"
  const apiKey = "457987037fc4f2113adac3866456b52a";
  const [a, seta] = useState(0);
  const [text, setText] = useState("Ho Chi Minh");
  const [city, setCity] = useState("Ho Chi Minh");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const [err, setErr] = useState(null);
  const [data, setData] = useState(null);
  const fechData = () => {
    axios
      .get(url)
      .then(function (res) {
        setData(res.data);
        console.log(res);
      })
      .catch(function (e) {
        console.log(e);
        if (e.response.status === "404") {
          setErr("invalid ctiy name");
        }
      });
  };

  useEffect(() => {
    fechData();
    //dùng [city] thì nó sẽ dc load lại hiển thị ra màn hình sau khi thay đổi
  }, [city]);

  // let date = new Date(data.sys.sunrise);
  function getDate(a) {
    let time = new Date(a * 1000);
    return time.toLocaleString();
  }
  return (
    <div className="bg">
              <Container>
        <div>
          <div class="row ">
            <div class="col-md-5 mx-auto mt-5">
              <div class="input-group">
                <input
                  class="form-control border-end-0 border rounded-pill"
                  type="search"
                  value={text}
                  id="example-search-input"
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setCity(text);
                      setText("");
                      console.log(text);
                    }
                  }}
                />
               
              </div>
            </div>
          </div>
        </div>

    


      </Container>

      {data && (

     <div class="row d-flex justify-content-center py-5">
  <div class="col-md-8 col-lg-6 col-xl-5">

    <div class="card text-body" style= {{borderRadius: "35px"}}>
      <div class="card-body p-4">

        <div class="d-flex">
          <h6 class="flex-grow-1">City : {data.name}</h6>
          <h6>sunrise :{getDate(data.sys.sunrise)} </h6>
          <p>       --------------</p>
          <h6>sunset : {getDate(data.sys.sunset)}</h6>
        </div>

        <div class="d-flex flex-column text-center mt-5 mb-4">
          <h6 class="display-4 mb-0 font-weight-bold"> Temp :{data.main.temp}  </h6>
          <span class="small" style={{color: "#868B94"}}>{data.weather[0].description} </span>
        </div>

        <div class="d-flex align-items-center">
          <div class="flex-grow-1" style=  {{fontSize:"1rem"}}    >
            <div><i class="fas fa-wind fa-fw" style={{color: "#868B94"}}></i> <span class="ms-1"> 40 km/h
              </span>
            </div>
            <div><i class="fas fa-tint fa-fw" style={{color: "#868B94"}}></i> <span class="ms-1"> 84%
              </span></div>
            <div><i class="fas fa-sun fa-fw" style={{color: "#868B94"}}></i> <span class="ms-1"> 0.2h
              </span></div>
          </div>
          <div>
            <img  src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}  
              width="100px"/>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
      )}
    </div>
  )
}
