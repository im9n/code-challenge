import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState();
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    selectData();
  }, [selectedNumber]);

  async function getData() {
    const res = await axios.get("https://demo9419531.mockable.io/pz_data");

    setData(res.data.data);
  }

  function selectData() {
    if (selectedNumber && data.length > 1) {
      let select = data[selectedNumber - 1];
      setSelectedData(select);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <h1>{selectedData?.role}</h1>
          <form action="" className="form">
            <div className="input__wrapper">
              <p>Vacancy title</p>
              <input type="text" />
            </div>
            <div className="input__wrapper">
              <p>Send CVs to</p>
              <select
                name=""
                id=""
                defaultValue={0}
                onChange={(e) => setSelectedNumber(e.target.value)}
              >
                <option disabled value={0}></option>
                {data?.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.send_cv}
                  </option>
                ))}
              </select>
            </div>
            {selectedNumber && (
              <>
                <div className="input__wrapper">
                  <p>Role</p>
                  <input type="text" value={selectedData?.role} />
                </div>
                <div className="input__wrapper">
                  <p>Profile</p>
                  <textarea value={selectedData?.profile} />
                </div>
                <div className="input__checkbox">
                  <input type="checkbox" checked={selectedData?.tender} />
                  <p>Tender</p>
                </div>
                <button className="form__button">Advertise</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
