import React, { useState, useEffect } from 'react';
import './Docket.css';

const Docket = () => {
  const [gstValue, setGstValue] = useState(false);
  const [weightArray, setWeightArray] = useState(Array(24).fill({
    metal: '',
    notes: '',
    gross: '',
    tare: '',
    price: '',
    total: 0,
    net: 0,
  }));
  const [totals, setTotals] = useState({
    sumTotal: 0,
    gstTotal: 0,
    totalWithGst: 0,
  });

  const toggleGST = () => {
    setGstValue(!gstValue);
  };

  const handleInputChange = (index, field, value) => {
    const updatedWeightArray = weightArray.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setWeightArray(updatedWeightArray);
    calculateTotals(updatedWeightArray);
  };

  const calculateTotals = (weights) => {
    let sumTotal = 0;
    const updatedWeights = weights.map((row) => {
      const net = parseFloat(row.gross || 0) - parseFloat(row.tare || 0);
      const total = net * parseFloat(row.price || 0);
      sumTotal += total;
      return { ...row, net, total };
    });
    setWeightArray(updatedWeights);

    const gstTotal = gstValue ? sumTotal * 0.1 : 0;
    const totalWithGst = gstValue ? sumTotal + gstTotal : sumTotal;

    setTotals({
      sumTotal,
      gstTotal,
      totalWithGst,
    });
  };

  useEffect(() => {
    calculateTotals(weightArray);
  }, [gstValue]);

  return (
    <div>
      <table id="DocketDetailsTable">
        <thead>
          <tr>
            <th>
              <select id="DocketType">
                <option value="Customer">Customer</option>
                <option value="Weight">Weight</option>
              </select>
            </th>
            <th><h1>Docket</h1></th>
            <th>
              <input
                type="checkbox"
                checked={gstValue}
                onChange={toggleGST}
              />
              <button onClick={toggleGST}>GST</button>
            </th>
          </tr>
        </thead>
      </table>

      <div id="CustomerDetailsTable">
        <table id="CustomerDetailsTable">
            <tbody>
                <tr>
                    <td>Name:</td>
                    <td>
                        <input type="text" placeholder="Name" id="Name" />
                        </td>
                    <td>License No.:</td>
                    <td><input type="text" placeholder="License No." id="LicenseNo" /></td>
                    <td>Notes:</td>
                    <td><input type="text" placeholder="Notes" id="PaperNotes"/></td>
                </tr>
                <tr>
                    <td>DOB:</td>
                    <td><input type="text" placeholder="DOB" id="DOB"/></td>
                    <td>PayID:</td>
                    <td><input type="text" placeholder="PayID" id="PayID"/></td>
                </tr>
                <tr>
                    <td>Phone No.:</td>
                    <td><input type="number" placeholder="Phone No." id="PhoneNo"/></td>
                    <td>BSB:</td>
                    <td><input type="number" placeholder="BSB" id="BSB"/></td>
                </tr>
                <tr>
                    <td>ABN:</td>
                    <td><input type="number" placeholder="ABN" id="ABN"/></td>
                    <td>Acc No.:</td>
                    <td><input type="number" placeholder="Acc No." id="AccNo"/></td>
                </tr>
                <tr>
                    <td>Address:</td>
                    <td><input type="text" placeholder="Address" id="Address"/></td>
                    <td>Rego No.:</td>
                    <td><input type="text" placeholder="Rego No." id="RegoNo"/></td>
                </tr>
            </tbody>
        </table>
      </div>

      <table id="WeightTable">
        <thead>
          <tr>
            <th>Serial #</th>
            <th>Metal</th>
            <th>Notes</th>
            <th>Gross</th>
            <th>Tare</th>
            <th>Net</th>
            <th>Price/kg</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {weightArray.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={row.metal}
                  onChange={(e) =>
                    handleInputChange(index, 'metal', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.notes}
                  onChange={(e) =>
                    handleInputChange(index, 'notes', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.gross}
                  onChange={(e) =>
                    handleInputChange(index, 'gross', parseFloat(e.target.value) || 0)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.tare}
                  onChange={(e) =>
                    handleInputChange(index, 'tare', parseFloat(e.target.value) || 0)
                  }
                />
              </td>
              <td>
                <input type="number" value={row.net.toFixed(2)} readOnly />
              </td>
              <td>
                <input
                  type="number"
                  value={row.price}
                  onChange={(e) =>
                    handleInputChange(index, 'price', parseFloat(e.target.value) || 0)
                  }
                />
              </td>
              <td>
                <input type="number" value={row.total.toFixed(2)} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table id="TotalsTable">
        <tbody>
          <tr>
            <td>Total:</td>
            <td>
              <input type="text" value={totals.sumTotal.toFixed(2)} readOnly />
            </td>
          </tr>
          {gstValue && (
            <>
              <tr>
                <td>GST:</td>
                <td>
                  <input type="text" value={totals.gstTotal.toFixed(2)} readOnly />
                </td>
              </tr>
              <tr>
                <td>Total + GST:</td>
                <td>
                  <input type="text" value={totals.totalWithGst.toFixed(2)} readOnly />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      <div>
        <table id="ButtonTable">
            <thead>
                <tr>
                    <th>
                        <button id="submitArray">Print</button>
                    </th>
                    <th>
                    <input type='number' id='PrintNumber' placeholder='Print No.'/>
                    </th>
                </tr>
            </thead>
        </table>
      </div>
    </div>
  );
};

export default Docket;