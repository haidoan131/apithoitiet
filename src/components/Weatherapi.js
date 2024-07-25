import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Container } from "reactstrap";

export default function Weatherapi() {
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
    <div>
      <Container>
        <div>
          <div class="row mt-5">
            <div class="col-md-5 mx-auto">
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
                <span class="input-group-append">
                  <button
                    class="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                    type="button"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        {err && <h1>{err}</h1>}
        {data && (
           <div>
            <h1 className="text-center">City : {data.name}</h1>

         
          <div className="d-flex justify-content-center w-80% ">
            <div   >
                
                <p>Temp :{data.main.temp} </p>
                <p>Country :{data.sys.country} </p>

                <p>sunrise :{getDate(data.sys.sunrise)} </p>
                <p>sunset : {getDate(data.sys.sunset)} </p>
                <p>temp :{data.weather[0].description} </p>
            </div>
            <img
              alt=""
              src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            />
          </div>
          </div> 
        )}






      </Container>

        









    </div>
  );
 
}
